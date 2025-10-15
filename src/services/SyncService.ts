/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable jsdoc/valid-types */

import mitt from 'mitt'

import type { ShallowRef } from 'vue'
import { close, type OpenData } from '../apis/connect'
import { push } from '../apis/sync'
import type { Connection } from '../composables/useConnection'
import { logger } from '../helpers/logger.js'
import { awarenessSteps } from '../helpers/steps'
import { documentStateToStep } from '../helpers/yjs'
import Outbox from './Outbox'
import PollingBackend from './PollingBackend'

/**
 * Timeout after which the editor will consider a document without changes being synced as idle
 * The session will be terminated and the document will stay open in read-only mode with a button to reconnect if needed
 *
 * @type {number}
 */
const IDLE_TIMEOUT = 1440

const COLLABORATOR_IDLE_TIME = 60

const COLLABORATOR_DISCONNECT_TIME = 90

const ERROR_TYPE = {
	/**
	 * Failed to save collaborative document due to external change
	 * collission needs to be resolved manually
	 */
	SAVE_COLLISSION: 0,
	/**
	 * Failed to push changes for MAX_REBASE_RETRY times
	 */
	PUSH_FAILURE: 1,

	LOAD_ERROR: 2,

	CONNECTION_FAILED: 3,

	SOURCE_NOT_FOUND: 4,

	PUSH_FORBIDDEN: 5,
} as const

type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE]

/*
 * Step as what we expect to be returned from the server right now.
 */
export interface Step {
	data: string[]
	version: number
	sessionId: number
}

export interface UserSession {
	id: number
	userId: string
	color: string
	lastAwarenessMessage: string
	lastContact: number
	documentId: number
	displayName: string
}

export interface GuestSession {
	id: number
	color: string
	lastAwarenessMessage: string
	lastContact: number
	guestName: string
	documentId: number
}

export type Session = UserSession | GuestSession

/**
 * Test if a session is a guest session
 * @param session to test.
 */
export function isGuest(session: Session): session is GuestSession {
	return 'guestName' in session && typeof session.guestName === 'string'
}

/**
 * Test if a session is a logged in user session
 * @param session to test.
 */
export function isUser(session: Session): session is UserSession {
	return 'userId' in session && typeof session.userId === 'string'
}

export interface Document {
	id: number
	lastSavedVersion: number
	lastSavedVersionTime: number
	baseVersionEtag: string
	initialVersion: number
}

export declare type EventTypes = {
	/* Document state */
	opened: OpenData

	/* received new steps */
	sync: { document?: object; steps: Step[] }

	/* state changed (dirty) */
	stateChange: { initialLoading?: boolean; dirty?: boolean }

	/* error */
	error: { type: ErrorType; data?: object }

	/* Events for session and document meta data */
	change: { sessions: Session[]; document: Document }

	/* Emitted after successful save */
	save: object

	/* Emitted once a document becomes idle */
	idle: void

	/* Emitted if the connection has been closed */
	close: void
}

class SyncService {
	connection: ShallowRef<Connection | undefined>
	version = -1
	pushError = 0
	backend?: PollingBackend
	#sendIntervalId?: NodeJS.Timeout
	#outbox = new Outbox()
	bus = mitt<EventTypes>()
	#openConnection: () => Promise<OpenData>
	#lastStepPush = Date.now()
	#sending = false

	constructor({
		connection,
		openConnection,
	}: {
		connection: ShallowRef<Connection | undefined>
		openConnection: () => Promise<OpenData>
	}) {
		this.connection = connection
		this.#openConnection = openConnection
	}

	hasActiveConnection(): this is {
		connection: ShallowRef<Connection>
	} {
		return Boolean(this.connection.value)
	}

	async open() {
		if (this.hasActiveConnection()) {
			return
		}
		const data = await this.#openConnection().catch((e) => this._emitError(e))
		if (!data) {
			// Error was already emitted above
			return
		}
		if (!this.connection.value) {
			console.error('Opened the connection but now it is undefined')
			return
		}
		this.backend = new PollingBackend(this, this.connection.value, data)
		// Make sure to only emit this once the backend is in place.
		this.bus.emit('opened', data)
		// Emit sync after opened, so websocket onmessage comes after onopen.
		if (data.documentState) {
			this._emitDocumentStateStep(
				data.documentState,
				data.document.lastSavedVersion,
			)
		}
	}

	startSync() {
		this.backend?.connect()
	}

	syncUp() {
		this.backend?.resetRefetchTimer()
	}

	_emitError(error: { response?: object; code?: string }) {
		if (!error.response || error.code === 'ECONNABORTED') {
			this.bus.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
		} else {
			this.bus.emit('error', {
				type: ERROR_TYPE.LOAD_ERROR,
				data: error.response,
			})
		}
	}

	_emitDocumentStateStep(documentState: string, version: number) {
		const documentStateStep = documentStateToStep(documentState, version)
		this.bus.emit('sync', {
			steps: [documentStateStep],
		})
	}

	sendStep(step: Uint8Array<ArrayBufferLike>) {
		this.#outbox.storeStep(step)
		this.sendSteps()
	}

	sendRecoveryStep(step: Uint8Array<ArrayBufferLike>) {
		this.#outbox.setRecoveringSync()
		this.#outbox.storeStep(step)
		this.sendSteps()
	}

	sendSteps() {
		// If already waiting to send, do nothing.
		if (this.#sendIntervalId) {
			return
		}
		this.#sendIntervalId = setInterval(() => {
			if (this.connection.value && !this.#sending) {
				this.sendStepsNow().catch((err) => logger.error(err))
			}
		}, 200)
	}

	async sendStepsNow() {
		this.#sending = true
		clearInterval(this.#sendIntervalId)
		this.#sendIntervalId = undefined
		if (this.#outbox.hasUpdate) {
			this.bus.emit('stateChange', { dirty: true })
		}
		if (!this.hasActiveConnection()) {
			return
		}
		const sendable = this.#outbox.getDataToSend()
		return push(this.connection, {
			version: this.version,
			...sendable,
		})
			.then((response) => {
				this.#outbox.clearSentData(sendable)
				const { steps, documentState, version } = response.data as {
					steps: Step[]
					documentState: string
					version: number
				}
				if (documentState) {
					this._emitDocumentStateStep(documentState, version)
				}
				this.pushError = 0
				this.#sending = false
				if (steps?.length > 0) {
					this.receiveSteps({ steps })
				}
			})
			.catch((err) => {
				const { response, code } = err
				this.#sending = false
				this.pushError++
				logger.error('Failed to push the steps to the server', err)
				if (!response || code === 'ECONNABORTED') {
					this.bus.emit('error', {
						type: ERROR_TYPE.CONNECTION_FAILED,
						data: {},
					})
				}
				if (response?.status === 412) {
					this.bus.emit('error', {
						type: ERROR_TYPE.LOAD_ERROR,
						data: response,
					})
				} else if (response?.status === 403) {
					// either the session is invalid or the document is read only.
					logger.error('failed to write to document - not allowed')
					this.bus.emit('error', {
						type: ERROR_TYPE.PUSH_FORBIDDEN,
						data: {},
					})
				} else {
					this.bus.emit('error', {
						type: ERROR_TYPE.PUSH_FAILURE,
						data: {},
					})
				}
				throw new Error('Failed to apply steps. Retry!', { cause: err })
			})
	}

	receiveSteps({
		steps,
		document,
		sessions = [],
	}: {
		steps: Step[]
		document?: object
		sessions?: Session[]
	}) {
		const versionAfter = Math.max(this.version, ...steps.map((s) => s.version))
		this.bus.emit('sync', {
			steps: [...awarenessSteps(sessions), ...steps],
			document,
		})
		if (this.version < versionAfter) {
			// Steps up to version where emitted but it looks like they were not processed.
			// Otherwise the WebsocketPolyfill would have increased the version counter.
			console.warn(
				`Failed to process steps leading up to version ${versionAfter}.`,
			)
		}
		this.#lastStepPush = Date.now()
	}

	checkIdle() {
		const lastPushMinutesAgo = (Date.now() - this.#lastStepPush) / 1000 / 60
		if (lastPushMinutesAgo > IDLE_TIMEOUT) {
			logger.debug(
				`[SyncService] Document is idle for ${IDLE_TIMEOUT} minutes, suspending connection`,
			)
			this.bus.emit('idle')
			return true
		}
		return false
	}

	async sendRemainingSteps() {
		if (!this.#outbox.hasUpdate) {
			return
		}
		logger.debug('sending final steps')
		return this.sendStepsNow().catch((err) => logger.error(err))
	}

	async close() {
		this.backend?.disconnect()
		if (this.hasActiveConnection()) {
			close(this.connection.value)
				// Log and ignore possible network issues.
				.catch((e) => {
					logger.info('Failed to close connection.', { e })
				})
		}
		// Clear connection so hasActiveConnection turns false and we can reconnect.
		this.connection.value = undefined
		this.bus.emit('close')
	}
}

export default SyncService
export {
	COLLABORATOR_DISCONNECT_TIME,
	COLLABORATOR_IDLE_TIME,
	ERROR_TYPE,
	IDLE_TIMEOUT,
	SyncService,
}

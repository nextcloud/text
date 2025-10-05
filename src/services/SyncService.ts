/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable jsdoc/valid-types */

import mitt, { type Handler } from 'mitt'

import type { ShallowRef } from 'vue'
import { close, type OpenData } from '../apis/connect'
import { push } from '../apis/sync'
import type { Connection } from '../composables/useConnection.js'
import { logger } from '../helpers/logger.js'
import { documentStateToStep } from '../helpers/yjs.js'
import Outbox from './Outbox.js'
import PollingBackend from './PollingBackend.js'

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
}

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

	/* All initial steps fetched */
	fetched: unknown

	/* received new steps */
	sync: unknown

	/* state changed (dirty) */
	stateChange: unknown

	/* error */
	error: unknown

	/* Events for session and document meta data */
	change: { sessions: Session[]; document: Document }

	/* Emitted after successful save */
	save: unknown

	/* Emitted once a document becomes idle */
	idle: unknown

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
		this.version = data.document.lastSavedVersion
		this.backend = new PollingBackend(this, this.connection.value, data)
		// Make sure to only emit this once the backend is in place.
		this.emit('opened', data)
	}

	startSync() {
		this.backend?.connect()
	}

	syncUp() {
		this.backend?.resetRefetchTimer()
	}

	_emitError(error: { response?: object; code?: string }) {
		if (!error.response || error.code === 'ECONNABORTED') {
			this.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
		} else {
			this.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: error.response })
		}
	}

	sendStep(step: Uint8Array<ArrayBufferLike>) {
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
		const sendable = this.#outbox.getDataToSend()
		if (sendable.steps.length > 0) {
			this.emit('stateChange', { dirty: true })
		}
		if (!this.hasActiveConnection()) {
			return
		}
		return push(this.connection, {
			version: this.version,
			...sendable,
		})
			.then((response) => {
				this.#outbox.clearSentData(sendable)
				const { steps, documentState } = response.data as {
					steps: Step[]
					documentState: string
				}
				if (documentState) {
					const documentStateStep = documentStateToStep(documentState)
					this.emit('sync', {
						version: this.version,
						steps: [documentStateStep],
					})
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
					this.emit('error', {
						type: ERROR_TYPE.CONNECTION_FAILED,
						data: {},
					})
				}
				if (response?.status === 412) {
					this.emit('error', {
						type: ERROR_TYPE.LOAD_ERROR,
						data: response,
					})
				} else if (response?.status === 403) {
					// either the session is invalid or the document is read only.
					logger.error('failed to write to document - not allowed')
					this.emit('error', {
						type: ERROR_TYPE.PUSH_FORBIDDEN,
						data: {},
					})
				} else {
					this.emit('error', { type: ERROR_TYPE.PUSH_FAILURE, data: {} })
				}
				throw new Error('Failed to apply steps. Retry!', { cause: err })
			})
	}

	receiveSteps({
		steps,
		document,
		sessions = [],
	}: {
		steps: { data: string[]; version: number; sessionId: number }[]
		document?: object
		sessions?: {
			lastContact: number
			lastAwarenessMessage: string
		}[]
	}) {
		const awareness = sessions
			.filter(
				(s) =>
					s.lastContact
					> Math.floor(Date.now() / 1000) - COLLABORATOR_DISCONNECT_TIME,
			)
			.filter((s) => s.lastAwarenessMessage)
			.map((s) => {
				return { step: s.lastAwarenessMessage }
			})
		const newSteps = [...awareness]
		for (let i = 0; i < steps.length; i++) {
			const singleSteps = steps[i].data
			if (this.version < steps[i].version) {
				this.version = steps[i].version
			}
			if (!Array.isArray(singleSteps)) {
				logger.error('Invalid step data, skipping step', { step: steps[i] })
				// TODO: recover
				continue
			}
			singleSteps.forEach((step) => {
				newSteps.push({
					step,
				})
			})
		}
		this.#lastStepPush = Date.now()
		this.emit('sync', {
			steps: newSteps,
			document,
			version: this.version,
		})
	}

	checkIdle() {
		const lastPushMinutesAgo = (Date.now() - this.#lastStepPush) / 1000 / 60
		if (lastPushMinutesAgo > IDLE_TIMEOUT) {
			logger.debug(
				`[SyncService] Document is idle for ${IDLE_TIMEOUT} minutes, suspending connection`,
			)
			this.emit('idle')
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
		this.emit('close')
	}

	// For better typing use the bus directly: `syncService.bus.on()`.
	on(event: keyof EventTypes, callback: Handler<unknown>) {
		this.bus.on(event, callback)
		return this
	}

	off(event: keyof EventTypes, callback: Handler<unknown>) {
		this.bus.off(event, callback)
		return this
	}

	emit(event: keyof EventTypes, data?: unknown) {
		this.bus.emit(event, data)
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

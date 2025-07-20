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
import { SessionConnection } from './SessionConnection.js'

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

export interface Session {
	id: number
	userId: string
	token: string
	color: string
	lastAwarenessMessage: string
	lastContact: number
	guestName?: string
	documentId: number
	displayName: string
	clientId: number
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
	opened: {
		document: Document
		session: Session
		documentSource: string
		documentState: string
	}

	/* All initial steps fetched */
	fetched: unknown

	/* received new steps */
	sync: unknown

	/* state changed (dirty) */
	stateChange: unknown

	/* error */
	error: unknown

	/* Events for session and document meta data */
	change: unknown

	/* Emitted after successful save */
	save: unknown

	/* Emitted once a document becomes idle */
	idle: unknown

	/* Emitted if the connection has been closed */
	close: void
}

class SyncService {
	connection: ShallowRef<Connection | undefined>
	sessionConnection?: SessionConnection
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

	get isReadOnly() {
		return this.sessionConnection?.state.document.readOnly
	}

	get hasOwner() {
		return this.sessionConnection?.hasOwner
	}

	get guestName() {
		return this.sessionConnection?.session.guestName
	}

	hasActiveConnection(): this is {
		sessionConnection: SessionConnection
		connection: ShallowRef<Connection>
	} {
		return !!this.sessionConnection && !this.sessionConnection.isClosed
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
		this.sessionConnection = new SessionConnection(data, this.connection.value)
		this.version = this.sessionConnection.docStateVersion
		if (!this.connection.value) {
			console.error('Opened the connection but now it is undefined')
			return
		}
		this.backend = new PollingBackend(this, this.connection.value)
		// Make sure to only emit this once the backend is in place.
		this.emit('opened', this.sessionConnection.state)
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

	sendStep(step: ArrayBuffer) {
		this.#outbox.storeStep(step)
		this.sendSteps()
	}

	sendSteps() {
		// If already waiting to send, do nothing.
		if (this.#sendIntervalId) {
			return
		}
		this.#sendIntervalId = setInterval(() => {
			if (this.sessionConnection && !this.#sending) {
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
						document: this.sessionConnection.document,
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
			clientId: number
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
				return { step: s.lastAwarenessMessage, clientId: s.clientId }
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
					clientId: steps[i].sessionId,
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
		if (this.connection.value) {
			close(this.connection.value)
				// Log and ignore possible network issues.
				.catch((e) => {
					logger.info('Failed to close connection.', { e })
				})
		}
		// Mark sessionConnection closed so hasActiveConnection turns false and we can reconnect.
		this.sessionConnection?.close()
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

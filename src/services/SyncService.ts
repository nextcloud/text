/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/* eslint-disable jsdoc/valid-types */

import mitt from 'mitt'
import debounce from 'debounce'

import PollingBackend from './PollingBackend.js'
import Outbox from './Outbox'
import SessionApi, { Connection } from './SessionApi.js'
import { documentStateToStep } from '../helpers/yjs.js'
import { logger } from '../helpers/logger.js'
import { awarenessSteps, flatSteps } from '../helpers/steps'
/**
 * Timeout after which the editor will consider a document without changes being synced as idle
 * The session will be terminated and the document will stay open in read-only mode with a button to reconnect if needed
 *
 * @type {number}
 */
const IDLE_TIMEOUT = 1440

/**
 * Interval to save the serialized document and the document state
 *
 * @type {number} time in ms
 */
const AUTOSAVE_INTERVAL = 30000

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

/*
 * Step as what we process it in the WebsocketPolyfill
 */
export interface FlatStep {
	step: string
	version: number
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

export interface Document {
	id: number
	lastSavedVersion: number
	lastSavedVersionTime: number
	baseVersionEtag: string
	initialVersion: number
}

export declare type EventTypes = {
  /* Document state */
  opened: { document: Document, session: Session, documentSource: string, documentState: string };
  loaded: { document: Document, session: Session, documentSource: string, documentState: string };

  /* All initial steps fetched */
  fetched: unknown;

  /* received new steps */
  sync: { document?: object; steps: { step: string; version: number }[] };

  /* state changed (dirty) */
  stateChange: { initialLoading?: boolean; dirty?: boolean };

  /* error */
  error: { type: ErrorType; data?: object };

  /* Events for session and document meta data */
  change: { sessions: object[]; document: object }

  /* Emitted after successful save */
  save: object;

  /* Emitted once a document becomes idle */
  idle: void;
}

class SyncService {

	bus = mitt<EventTypes>()
	#sendIntervalId?: NodeJS.Timeout
	connection?: Connection
	#outbox = new Outbox()
	baseVersionEtag: string
	serialize: () => string
	getDocumentState: () => string
	_api: SessionApi
	stepClientIDs = []
	lastStepPush = Date.now()
	version = 0
	sending = false
	pushError = 0
	autosave = debounce(this._autosave.bind(this), AUTOSAVE_INTERVAL)
	backend?: PollingBackend

	constructor({
		baseVersionEtag,
		serialize,
		getDocumentState,
		api,
	}: {
		baseVersionEtag: string,
		serialize: () => string,
		getDocumentState: () => string,
		api: SessionApi,

	}) {
		this.serialize = serialize
		this.getDocumentState = getDocumentState
		this._api = api
		this.baseVersionEtag = baseVersionEtag
	}

	get isReadOnly() {
		return this.connection?.state.document.readOnly
	}

	get hasOwner() {
		return this.connection?.hasOwner
	}

	get guestName() {
		return this.connection?.session.guestName
	}

	hasActiveConnection(): this is { connection: Connection } {
		return !!(this.connection)
			&& !this.connection.isClosed
	}

	async open({ fileId, initialSession }: { fileId: number, initialSession?: Session}) {
		if (this.hasActiveConnection()) {
			return {
				...this.connection.state,
				version: this.version,
			}
		}
		const connect = initialSession
			? Promise.resolve(new Connection({ data: initialSession }, {}))
			: this._api.open({ fileId, baseVersionEtag: this.baseVersionEtag })
				.catch(error => {
					this._emitError(error)
					return undefined
				})
		this.connection = await connect
		if (!this.connection) {
			// Error was already emitted in connect
			return null
		}
		this.backend = new PollingBackend(this, this.connection)
		this.version = this.connection.docStateVersion
		this.baseVersionEtag = this.connection.document.baseVersionEtag
		const connectionState = {
			...this.connection.state,
			version: this.version,
		}
		this.bus.emit('opened', connectionState)
		this.bus.emit('loaded', connectionState)
		return connectionState
	}

	startSync() {
		this.backend?.connect()
	}

	syncUp() {
		this.backend?.resetRefetchTimer()
	}

	_emitError(error: { response?: object, code: string }) {
		if (!error.response || error.code === 'ECONNABORTED') {
			this.bus.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
		} else {
			this.bus.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: error.response })
		}
	}

	updateSession(guestName: string) {
		if (!this.connection?.isPublic) {
			return Promise.reject(new Error())
		}
		return this.connection.update(guestName)
			.catch((error) => {
				logger.error('Failed to update the session', { error })
				return Promise.reject(error)
			})
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
			if (this.connection && !this.sending) {
				this.sendStepsNow().catch(err => logger.error(err))
			}
		}, 200)
	}

	async sendStepsNow() {
		this.sending = true
		clearInterval(this.#sendIntervalId)
		this.#sendIntervalId = undefined
		const sendable = this.#outbox.getDataToSend()
		if (sendable.steps.length > 0) {
			this.bus.emit('stateChange', { dirty: true })
		}
		if (!this.hasActiveConnection) {
			return
		}
		return this.connection?.push({ ...sendable, version: this.version })
			.then((response) => {
				this.#outbox.clearSentData(sendable)
				const { steps, documentState } = response.data
				if (documentState) {
					const documentStateStep = documentStateToStep(documentState)
					this.bus.emit('sync', {
						steps: [documentStateStep],
					})
				}
				this.pushError = 0
				this.sending = false
				if (steps?.length > 0) {
					this.receiveSteps({ steps })
				}
			}).catch(err => {
				const { response, code } = err
				this.sending = false
				this.pushError++
				logger.error('Failed to push the steps to the server', err)
				if (!response || code === 'ECONNABORTED') {
					this.bus.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
				}
				if (response?.status === 412) {
					this.bus.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: response })
				} else if (response?.status === 403) {
					// either the session is invalid or the document is read only.
					logger.error('failed to write to document - not allowed')
					this.bus.emit('error', { type: ERROR_TYPE.PUSH_FORBIDDEN, data: {} })
				} else {
					this.bus.emit('error', { type: ERROR_TYPE.PUSH_FAILURE, data: {} })
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
			steps: [...awarenessSteps(sessions), ...flatSteps(steps)],
			document,
		})
		if (this.version < versionAfter) {
			// Steps up to version where emitted but it looks like they were not processed.
			// Otherwise the WebsocketPolyfill would have increased the version counter.
			console.warn(
				`Failed to process steps leading up to version ${versionAfter}.`,
			)
		}
		this.lastStepPush = Date.now()
	}

	checkIdle() {
		const lastPushMinutesAgo = (Date.now() - this.lastStepPush) / 1000 / 60
		if (lastPushMinutesAgo > IDLE_TIMEOUT) {
			logger.debug(`[SyncService] Document is idle for ${IDLE_TIMEOUT} minutes, suspending connection`)
			this.bus.emit('idle')
			return true
		}
		return false
	}

	_getContent() {
		return this.serialize()
	}

	async save({ force = false, manualSave = true } = {}) {
		if (!this.connection) {
			logger.error('Failed to save without connection.')
			return
		}
		logger.debug('[SyncService] saving', { force, manualSave })
		try {
			const response = await this.connection?.save({
				version: this.version,
				autosaveContent: this._getContent(),
				documentState: this.getDocumentState(),
				force,
				manualSave,
			})
			this.bus.emit('stateChange', { dirty: false })
			this.connection.document.lastSavedVersionTime = Date.now() / 1000
			logger.debug('[SyncService] saved', { response })
			const { document, sessions } = response.data
			this.bus.emit('save', { document, sessions })
			this.autosave.clear()
		} catch (e) {
			logger.error('Failed to save document.', { error: e })
			throw e
		}
	}

	saveViaSendBeacon() {
		if (!this.connection) {
			logger.error('Failed to save via beacon without connection.')
			return
		}
		this.connection?.saveViaSendBeacon({
			version: this.version,
			autosaveContent: this._getContent(),
			documentState: this.getDocumentState(),
			force: false,
			manualSave: true,
		})
		logger.debug('[SyncService] saved using sendBeacon')
	}

	forceSave() {
		return this.save({ force: true })
	}

	_autosave() {
		return this.save({ manualSave: false }).catch((error) => {
			logger.error('Failed to autosave document.', { error })
		})
	}

	async sendRemainingSteps() {
		if (!this.#outbox.hasUpdate) {
			return
		}
		logger.debug('sending final steps')
		return this.sendStepsNow().catch(err => logger.error(err))
	}

	async close() {
		// Make sure to leave no pending requests behind.
		this.autosave.clear()
		this.backend?.disconnect()
		if (!this.hasActiveConnection) {
			return
		}
		return this.connection?.close()
			// Log and ignore possible network issues.
			.catch(e => {
				logger.info('Failed to close connection.', { e })
			})
	}

	uploadAttachment(file: string) {
		if (!this.connection) {
			logger.error('Failed to upload without connection.')
		}
		return this.connection?.uploadAttachment(file)
	}

	insertAttachmentFile(filePath: string) {
		if (!this.connection) {
			logger.error('Failed to insert Attachment without connection.')
		}
		return this.connection?.insertAttachmentFile(filePath)
	}

}

export default SyncService
export { SyncService, ERROR_TYPE, IDLE_TIMEOUT, COLLABORATOR_IDLE_TIME, COLLABORATOR_DISCONNECT_TIME }

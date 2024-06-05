/* eslint-disable jsdoc/valid-types */
/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
import mitt from 'mitt'
import debounce from 'debounce'

import PollingBackend from './PollingBackend.js'
import SessionApi, { Connection } from './SessionApi.js'
import { logger } from '../helpers/logger.js'

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
}

class SyncService {

	#sendIntervalId
	#getContent

	constructor({ baseVersionEtag, serialize, getDocumentState, ...options }) {
		/** @type {import('mitt').Emitter<import('./SyncService').EventTypes>} _bus */
		this._bus = mitt()

		this.#getContent = serialize
		this.getDocumentState = getDocumentState
		this._api = new SessionApi(options)
		this.connection = null

		this.stepClientIDs = []

		this.lastStepPush = Date.now()

		this.version = null
		this.baseVersionEtag = baseVersionEtag
		this.sending = false
		this.#sendIntervalId = null

		this.autosave = debounce(this._autosave.bind(this), AUTOSAVE_INTERVAL)

		return this
	}

	async open({ fileId, initialSession }) {

		const connect = initialSession
			? Promise.resolve(new Connection({ data: initialSession }, {}))
			: this._api.open({ fileId, baseVersionEtag: this.baseVersionEtag })
				.catch(error => this._emitError(error))

		this.connection = await connect
		if (!this.connection) {
			// Error was already emitted in connect
			return
		}
		this.backend = new PollingBackend(this, this.connection)
		this.version = this.connection.docStateVersion
		this.baseVersionEtag = this.connection.document.baseVersionEtag
		this.emit('opened', {
			...this.connection.state,
			version: this.version,
		})
		this.emit('loaded', {
			...this.connection.state,
			version: this.version,
		})
	}

	startSync() {
		this.backend.connect()
	}

	syncUp() {
		this.backend.resetRefetchTimer()
	}

	_emitError(error) {
		if (!error.response || error.code === 'ECONNABORTED') {
			this.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
		} else {
			this.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: error.response })
		}
	}

	updateSession(guestName) {
		if (!this.connection.isPublic) {
			return Promise.reject(new Error())
		}
		return this.connection.update(guestName)
			.catch((error) => {
				logger.error('Failed to update the session', { error })
				return Promise.reject(error)
			})
	}

	sendSteps(getSendable) {
		// If already waiting to send, do nothing.
		if (this.#sendIntervalId) {
			return
		}
		return new Promise((resolve, reject) => {
			this.#sendIntervalId = setInterval(() => {
				if (this.connection && !this.sending) {
					this.sendStepsNow(getSendable).then(resolve).catch(reject)
				}
			}, 200)
		})
	}

	sendStepsNow(getSendable) {
		this.sending = true
		clearInterval(this.#sendIntervalId)
		this.#sendIntervalId = null
		const data = getSendable()
		if (data.steps.length > 0) {
			this.emit('stateChange', { dirty: true })
		}
		return this.connection.push(data)
			.then((response) => {
				this.sending = false
				this.emit('sync', {
					steps: [],
					document: this.connection.document,
					version: this.version,
				})
			}).catch(err => {
				const { response, code } = err
				this.sending = false
				if (!response || code === 'ECONNABORTED') {
					this.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
				}
				if (response?.status === 412) {
					this.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: response })
				} else if (response?.status === 403) {
					if (!data.document) {
						// either the session is invalid or the document is read only.
						logger.error('failed to write to document - not allowed')
					}
					// Only emit conflict event if we have synced until the latest version
					if (response.data.document?.currentVersion === this.version) {
						this.emit('error', { type: ERROR_TYPE.PUSH_FAILURE, data: {} })
						OC.Notification.showTemporary('Changes could not be sent yet')
					}
				}
				throw new Error('Failed to apply steps. Retry!', { cause: err })
			})
	}

	_receiveSteps({ steps, document, sessions }) {
		const awareness = sessions
			.filter(s => s.lastContact > (Math.floor(Date.now() / 1000) - COLLABORATOR_DISCONNECT_TIME))
			.filter(s => s.lastAwarenessMessage)
			.map(s => {
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
			singleSteps.forEach(step => {
				newSteps.push({
					step,
					clientID: steps[i].sessionId,
				})
			})
		}
		this.lastStepPush = Date.now()
		this.emit('sync', {
			steps: newSteps,
			// TODO: do we actually need to dig into the connection here?
			document: this.connection.document,
			version: this.version,
		})
	}

	checkIdle() {
		const lastPushMinutesAgo = (Date.now() - this.lastStepPush) / 1000 / 60
		if (lastPushMinutesAgo > IDLE_TIMEOUT) {
			logger.debug(`[SyncService] Document is idle for ${this.IDLE_TIMEOUT} minutes, suspending connection`)
			this.emit('idle')
			return true
		}
		return false
	}

	async save({ force = false, manualSave = true } = {}) {
		logger.debug('[SyncService] saving', arguments[0])
		try {
			const response = await this.connection.save({
				version: this.version,
				autosaveContent: this.#getContent(),
				documentState: this.getDocumentState(),
				force,
				manualSave,
			})
			this.emit('stateChange', { dirty: false })
			this.connection.document.lastSavedVersionTime = Date.now() / 1000
			logger.debug('[SyncService] saved', response)
			const { document, sessions } = response.data
			this.emit('save', { document, sessions })
			this.autosave.clear()
		} catch (e) {
			logger.error('Failed to save document.', { error: e })
			throw e
		}
	}

	forceSave() {
		return this.save({ force: true })
	}

	_autosave() {
		return this.save({ manualSave: false }).catch((error) => {
			logger.error('Failed to autosave document.', { error })
		})
	}

	async close() {
		// Make sure to leave no pending requests behind.
		this.autosave.clear()
		this.backend?.disconnect()
		return this._close()
	}

	_close() {
		if (this.connection === null) {
			return Promise.resolve()
		}
		this.backend.disconnect()
		return this.connection.close()
	}

	uploadAttachment(file) {
		return this.connection.uploadAttachment(file)
	}

	insertAttachmentFile(filePath) {
		return this.connection.insertAttachmentFile(filePath)
	}

	on(event, callback) {
		this._bus.on(event, callback)
		return this
	}

	off(event, callback) {
		this._bus.off(event, callback)
		return this
	}

	emit(event, data) {
		this._bus.emit(event, data)
	}

}

export default SyncService
export { SyncService, ERROR_TYPE, IDLE_TIMEOUT, COLLABORATOR_IDLE_TIME, COLLABORATOR_DISCONNECT_TIME }

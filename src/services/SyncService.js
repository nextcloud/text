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

	constructor({ serialize, getDocumentState, ...options }) {
		/** @type {import('mitt').Emitter<import('./SyncService').EventTypes>} _bus */
		this._bus = mitt()

		this.serialize = serialize
		this.getDocumentState = getDocumentState
		this._api = new SessionApi(options)
		this.connection = null

		this.stepClientIDs = []

		this.lastStepPush = Date.now()

		this.sending = false

		this.autosave = debounce(this._autosave.bind(this), AUTOSAVE_INTERVAL)

		return this
	}

	async open({ fileId, initialSession }) {

		// TODO: Only continue if a connection was made
		this.connection = initialSession
			? new Connection({ data: initialSession }, {})
			: await this._api.open({ fileId })
				.catch(error => this._emitError(error))

		this.emit('opened', {
			...this.connection.state,
		})
		this.emit('loaded', {
			...this.connection.state,
		})
		this.backend = new PollingBackend(this, this.connection)

	}

	startSync() {
		this.backend.connect()
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
			return
		}
		return this.connection.update(guestName)
			.catch((error) => {
				logger.error('Failed to update the session', { error })
				return Promise.reject(error)
			})
	}

	sendSteps(getSendable) {
		if (!this.connection || this.sending) {
			setTimeout(() => {
				this.sendSteps(getSendable)
			}, 200)
			return
		}
		this.sending = true
		const data = getSendable()
		if (data.steps.length > 0) {
			this.emit('stateChange', { dirty: true })
		}
		return this.connection.push(data)
			.then((response) => {
				this.sending = false
			}).catch(({ response, code }) => {
				logger.error('Failed to apply steps due to error communicating with server.')
				this.sending = false
				if (!response || code === 'ECONNABORTED') {
					this.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
					return
				}
				const { status, data } = response
				if (status === 403) {
					if (!data.document) {
						// either the session is invalid or the document is read only.
						logger.error('Failed to write to document - not allowed')
					}
				}
				// TODO: Retry and warn
			})
	}

	_receiveSteps({ steps, document, sessions }) {
		const awareness = sessions
			.filter(s => s.lastAwarenessMessage)
			.map(s => {
				return { step: s.lastAwarenessMessage, clientId: s.clientId }
			})
		const newSteps = awareness
		for (let i = 0; i < steps.length; i++) {
			const singleSteps = steps[i].data
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

	_getContent() {
		return this.serialize()
	}

	async save(version, { force = false, manualSave = true } = {}) {
		logger.debug('[SyncService] saving', arguments[0])
		try {
			const response = await this.connection.save({
				version: this.backend.version,
				autosaveContent: this._getContent(),
				documentState: this.getDocumentState(),
				force,
				manualSave,
			})
			this.emit('stateChange', { dirty: false })
			logger.debug('[SyncService] saved', response)
			this.emit('save')
			this.emit('change', { document: response.data.document })
			this.autosave.clear()
		} catch (e) {
			if (e.response.status === 409) {

				// Still apply the steps to update our version of the document
				// TODO: this is not possible anymore - do we need it? this._handleResponse(e.response)
				// we also used to disconnect the polling backend.
				logger.error('Conflict during file save, please resolve')
				this.emit('error', {
					type: ERROR_TYPE.SAVE_COLLISSION,
					data: {
						outsideChange: e.response.data.outsideChange,
					},
				})
				logger.error('Failed to save document.', { error: e })
			}
		}
	}

	forceSave(version) {
		return this.save(version, { force: true })
	}

	_autosave(version) {
		return this.save(version, { manualSave: false })
	}

	close() {
		this.backend.disconnect()
		let closed = false
		return new Promise((resolve, reject) => {
			this.on('save', () => {
				this._close().then(() => {
					closed = true
					resolve()
				}).catch(() => resolve())
			})
			setTimeout(() => {
				if (!closed) {
					this._close().then(() => {
						resolve()
					}).catch(() => resolve())
				}
			}, 2000)
			this.save()
		})
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
export { SyncService, ERROR_TYPE, IDLE_TIMEOUT }

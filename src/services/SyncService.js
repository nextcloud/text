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
import axios from '@nextcloud/axios'
import mitt from 'mitt'
import { getVersion, sendableSteps } from 'prosemirror-collab'

import PollingBackend from './PollingBackend.js'
import { logger } from '../helpers/logger.js'
import { endpointUrl } from '../helpers/index.js'

const defaultOptions = {
	shareToken: null,
	forceRecreate: false,
	serialize: (document) => document,
}

/**
 * Timeout after which the editor will consider a document without changes being synced as idle
 * The session will be terminated and the document will stay open in read-only mode with a button to reconnect if needed
 *
 * @type {number}
 */
const IDLE_TIMEOUT = 1440

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

	constructor(options) {
		/** @type {import('mitt').Emitter<import('./SyncService').EventTypes>} _bus */
		this._bus = mitt()

		this.backend = new PollingBackend(this)

		this.options = Object.assign({}, defaultOptions, options)

		this.document = null
		this.session = null
		this.sessions = []

		this.steps = []
		this.stepClientIDs = []

		this.lastStepPush = Date.now()

		this.lock = null

		return this
	}

	async open({ fileId, filePath, initialSession }) {
		const connectionData = initialSession
			|| await this._openDocument({ fileId, filePath })
		this.document = connectionData.document
		this.document.readOnly = connectionData.readOnly
		this.session = connectionData.session
		this.lock = connectionData.lock
		this.emit('opened', {
			document: this.document,
			session: this.session,
		})
		this.emit('loaded', {
			document: this.document,
			session: this.session,
			documentSource: '' + connectionData.content,
		})
	}

	startSync() {
		this.backend.connect()
	}

	_openDocument({ fileId, filePath }) {
		return axios.put(endpointUrl('session/create', !!this.options.shareToken), {
			fileId,
			filePath,
			token: this.options.shareToken,
			guestName: this.options.guestName,
			forceRecreate: this.options.forceRecreate,
		})
			.then(response => response.data, error => {
				if (!error.response || error.code === 'ECONNABORTED') {
					this.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
				} else {
					this.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: error.response })
				}
				throw error
			})
	}

	_fetchDocument() {
		return axios.post(
			endpointUrl('session/fetch', !!this.options.shareToken), {
				documentId: this.document.id,
				sessionId: this.session.id,
				sessionToken: this.session.token,
				token: this.options.shareToken,
			}, {
				// Axios normally tries to parse string responses as json.
				// Just return the plain content here.
				transformResponse: [(data) => data],
			}
		).then(response => response.data)
	}

	updateSession(guestName) {
		if (!this.isPublic()) {
			return
		}
		return axios.post(
			endpointUrl('session', !!this.options.shareToken), {
				documentId: this.document.id,
				sessionId: this.session.id,
				sessionToken: this.session.token,
				token: this.options.shareToken,
				guestName,
			}
		).then(({ data }) => {
			this.session = data
			return data
		}).catch((error) => {
			logger.error('Failed to update the session', { error })
			return Promise.reject(error)
		})
	}

	sendSteps(_sendable) {
		const sendable = _sendable || sendableSteps(this.state)
		if (!sendable) {
			return
		}
		return this.backend.sendSteps(sendable)
	}

	stepsSince(version) {
		return {
			steps: this.steps.slice(version),
			clientIDs: this.stepClientIDs.slice(version),
		}
	}

	_receiveSteps({ steps, document }) {
		const newSteps = []
		for (let i = 0; i < steps.length; i++) {
			const singleSteps = steps[i].data
			if (!Array.isArray(singleSteps)) {
				logger.error('Invalid step data, skipping step', { step: steps[i] })
				// TODO: recover
				continue
			}
			singleSteps.forEach(step => {
				this.steps.push(step)
				newSteps.push({
					step,
					clientID: steps[i].sessionId,
				})
			})
		}
		this.lastStepPush = Date.now()
		this.emit('sync', { steps: newSteps, document })
		logger.debug('receivedSteps', { newVersion: this._getVersion() })
	}

	checkIdle() {
		const lastPushMinutesAgo = (Date.now() - this.lastStepPush) / 1000 / 60
		if (lastPushMinutesAgo > IDLE_TIMEOUT) {
			logger.debug(`[SyncService] Document is idle for ${this.IDLE_TIMEOUT} minutes, suspending connection`)
			this.emit('idle')
		}
	}

	_getVersion() {
		if (this.state) {
			return getVersion(this.state)
		}
		return 0
	}

	_getDocument() {
		if (this.state) {
			return this.state.doc
		}
	}

	_getContent() {
		return this.options.serialize(this._getDocument())
	}

	save() {
		if (this.backend.save) {
			this.backend.save()
		}
	}

	forceSave() {
		if (this.backend.forceSave) {
			this.backend.forceSave()
		}
	}

	saveIfNeeded() {
		return this.backend.fetchSteps()
	}

	close() {
		const timeout = new Promise((resolve) => setTimeout(resolve, 2000))
		return Promise.any([timeout, this.saveIfNeeded()])
			.then(() => this._close()).catch(console.info)
	}

	_close() {
		if (this.document === null || this.session === null) {
			return Promise.resolve()
		}
		this.backend.disconnect()
		return axios.post(
			endpointUrl('session/close', !!this.options.shareToken), {
				documentId: this.document.id,
				sessionId: this.session.id,
				sessionToken: this.session.token,
				token: this.options.shareToken,
			})
	}

	uploadAttachment(file) {
		const formData = new FormData()
		formData.append('file', file)
		const url = endpointUrl('attachment/upload')
			+ '?documentId=' + encodeURIComponent(this.document.id)
			+ '&sessionId=' + encodeURIComponent(this.session.id)
			+ '&sessionToken=' + encodeURIComponent(this.session.token)
			+ '&shareToken=' + encodeURIComponent(this.options.shareToken || '')
		return axios.post(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}

	insertAttachmentFile(filePath) {
		const params = {
			documentId: this.document.id,
			sessionId: this.session.id,
			sessionToken: this.session.token,
			filePath,
		}
		const url = endpointUrl('attachment/filepath')
		return axios.post(url, params)
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

	isPublic() {
		return !!this.options.shareToken
	}

}

export default SyncService
export { SyncService, ERROR_TYPE, IDLE_TIMEOUT }

/* eslint-disable jsdoc/valid-types */
/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
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

import PollingBackend from './PollingBackend.js'
import { endpointUrl } from './../helpers/index.js'
import { getVersion, sendableSteps } from 'prosemirror-collab'
import mitt from 'mitt'

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
const IDLE_TIMEOUT = 30

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
		const content = connectionData.content
			|| await this._fetchDocument()
		this.emit('loaded', {
			document: this.document,
			session: this.session,
			documentSource: '' + content,
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
					this.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: error.response.status })
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
			console.error('Failed to update the session', error)
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
				console.error('Invalid step data, skipping step', steps[i])
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
		console.debug('receivedSteps', 'newVersion', this._getVersion())
	}

	checkIdle() {
		const lastPushMinutesAgo = (Date.now() - this.lastStepPush) / 1000 / 60
		if (lastPushMinutesAgo > IDLE_TIMEOUT) {
			console.debug(`[SyncService] Document is idle for ${this.IDLE_TIMEOUT} minutes, suspending connection`)
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

	close() {
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

	uploadImage(image) {
		const formData = new FormData()
		formData.append('image', image)
		formData.append('documentId', this.document.id)
		formData.append('sessionId', this.session.id)
		formData.append('sessionToken', this.session.token)
		formData.append('shareToken', this.options.shareToken || '')
		const url = endpointUrl('image/upload')
		return axios.post(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}

	insertImageLink(imageLink) {
		const params = {
			documentId: this.document.id,
			sessionId: this.session.id,
			sessionToken: this.session.token,
			shareToken: this.options.shareToken || '',
			link: imageLink,
		}
		const url = endpointUrl('image/link')
		return axios.post(url, params)
	}

	insertImageFile(imagePath) {
		const params = {
			documentId: this.document.id,
			sessionId: this.session.id,
			sessionToken: this.session.token,
			imagePath,
		}
		const url = endpointUrl('image/filepath')
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

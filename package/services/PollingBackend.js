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
import { endpointUrl } from '../helpers'
import { SyncService, ERROR_TYPE } from './SyncService'
import { sendableSteps } from 'prosemirror-collab'

/**
 * Minimum inverval to refetch the document changes
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL = 300

/**
 * Maximum interval between refetches of document state if multiple users have joined
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL_MAX = 5000

/**
 * Interval to check for changes when there is only one user joined
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL_SINGLE_EDITOR = 5000

/**
 * Interval to fetch for changes when a browser window is considered invisible by the
 * page visibility API https://developer.mozilla.org/de/docs/Web/API/Page_Visibility_API
 *
 * @type {number} time in ms
 */
const FETCH_INTERVAL_INVISIBLE = 60000

const MIN_PUSH_RETRY = 500
const MAX_PUSH_RETRY = 10000

/* Timeout after that a PUSH_FAILURE error is emitted */
const WARNING_PUSH_RETRY = 5000

/* Maximum number of retries for fetching before emitting a connection error */
const MAX_RETRY_FETCH_COUNT = 5

/**
 * Timeout for sessions to be marked as disconnected
 * Make sure that this is higher than any FETCH_INTERVAL_ values
 */
const COLLABORATOR_DISCONNECT_TIME = FETCH_INTERVAL_INVISIBLE * 1.5

class PollingBackend {

	constructor(authority) {
		/** @type {SyncService} */
		this._authority = authority
		this.fetchInterval = FETCH_INTERVAL
		this.retryTime = MIN_PUSH_RETRY
		this.lock = false
		this.fetchRetryCounter = 0
	}

	connect() {
		this.initialLoadingFinished = false
		this.fetcher = setInterval(this._fetchSteps.bind(this), 50)
		document.addEventListener('visibilitychange', this.visibilitychange.bind(this))
	}

	_isPublic() {
		return !!this._authority.options.shareToken
	}

	forceSave() {
		this._forcedSave = true
		this.fetchSteps()
	}

	save() {
		this._manualSave = true
		this.fetchSteps()
	}

	fetchSteps() {
		this._fetchSteps()
	}

	/**
	 * This method is only called though the timer
	 */
	_fetchSteps() {
		if (this.lock || !this.fetcher) {
			return
		}
		this.lock = true
		let autosaveContent
		if (this._forcedSave || this._manualSave
			|| (!sendableSteps(this._authority.state)
			&& (this._authority._getVersion() !== this._authority.document.lastSavedVersion))
		) {
			autosaveContent = this._authority._getContent()
		}
		axios.post(endpointUrl('session/sync', this._isPublic()), {
			documentId: this._authority.document.id,
			sessionId: this._authority.session.id,
			sessionToken: this._authority.session.token,
			version: this._authority._getVersion(),
			autosaveContent,
			force: !!this._forcedSave,
			manualSave: !!this._manualSave,
			token: this._authority.options.shareToken,
			filePath: this._authority.options.filePath,
		}).then(this._handleResponse.bind(this), this._handleError.bind(this))
		this._manualSave = false
		this._forcedSave = false
	}

	_handleResponse(response) {
		this.fetchRetryCounter = 0

		if (this._authority.document.lastSavedVersion < response.data.document.lastSavedVersion) {
			console.debug('Saved document', response.data.document)
			this._authority.emit('save', { document: response.data.document, sessions: response.data.sessions })
		}

		this._authority.emit('change', { document: response.data.document, sessions: response.data.sessions })
		this._authority.document = response.data.document
		this._authority.sessions = response.data.sessions

		if (response.data.steps.length === 0) {
			if (!this.initialLoadingFinished) {
				this.initialLoadingFinished = true
			}
			if (this._authority.checkIdle()) {
				return
			}
			this.lock = false
			if (response.data.sessions.filter((session) => session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME).length < 2) {
				this.maximumRefetchTimer()
			} else {
				this.increaseRefetchTimer()
			}
			this._authority.emit('stateChange', { dirty: false })
			this._authority.emit('stateChange', { initialLoading: true })
			return
		}

		this._authority._receiveSteps(response.data)
		this.lock = false
		this._forcedSave = false
		if (this.initialLoadingFinished) {
			this.resetRefetchTimer()
		}
	}

	_handleError(e) {
		this.lock = false
		if (!e.response || e.code === 'ECONNABORTED') {
			if (this.fetchRetryCounter++ >= MAX_RETRY_FETCH_COUNT) {
				console.error('[PollingBackend:fetchSteps] Network error when fetching steps, emitting CONNECTION_FAILED')
				this._authority.emit('error', ERROR_TYPE.CONNECTION_FAILED, { retry: false })

			} else {
				console.error(`[PollingBackend:fetchSteps] Network error when fetching steps, retry ${this.fetchRetryCounter}`)
			}
		} else if (e.response.status === 409 && e.response.data.document.currentVersion === this._authority.document.currentVersion) {
			// Only emit conflict event if we have synced until the latest version
			console.error('Conflict during file save, please resolve')
			this._authority.emit('error', ERROR_TYPE.SAVE_COLLISSION, {
				outsideChange: e.response.data.outsideChange,
			})
		} else if (e.response.status === 403) {
			this._authority.emit('error', ERROR_TYPE.SOURCE_NOT_FOUND, {})
			this.disconnect()
		} else if (e.response.status === 404) {
			this._authority.emit('error', ERROR_TYPE.SOURCE_NOT_FOUND, {})
			this.disconnect()
		} else if (e.response.status === 503) {
			this.increaseRefetchTimer()
			this._authority.emit('error', ERROR_TYPE.CONNECTION_FAILED, { retry: false })
			console.error('Failed to fetch steps due to unavailable service', e)
		} else {
			this.disconnect()
			this._authority.emit('error', ERROR_TYPE.CONNECTION_FAILED, { retry: false })
			console.error('Failed to fetch steps due to other reason', e)
		}

	}

	sendSteps(_sendable) {
		this._authority.emit('stateChange', { dirty: true })
		if (this.lock) {
			setTimeout(() => {
				this._authority.sendSteps()
			}, 100)
			return
		}
		this.lock = true
		const sendable = (typeof _sendable === 'function') ? _sendable() : _sendable
		const steps = sendable.steps
		axios.post(endpointUrl('session/push', !!this._authority.options.shareToken), {
			documentId: this._authority.document.id,
			sessionId: this._authority.session.id,
			sessionToken: this._authority.session.token,
			steps: steps.map(s => s.toJSON ? s.toJSON() : s) || [],
			version: sendable.version,
			token: this._authority.options.shareToken,
			filePath: this._authority.options.filePath,
		}).then((response) => {
			this.carefulRetryReset()
			this.lock = false
			this.fetchSteps()
		}).catch(({ response, code }) => {
			console.error('failed to apply steps due to collission, retrying')
			this.lock = false
			if (!response || code === 'ECONNABORTED') {
				this._authority.emit('error', ERROR_TYPE.CONNECTION_FAILED, {})
				return
			}
			const { status, data } = response
			if (status === 403) {
				if (!data.document) {
					// either the session is invalid or the document is read only.
					console.error('failed to write to document - not allowed')
				}
				// Only emit conflict event if we have synced until the latest version
				if (data.document?.currentVersion === this._authority.document.currentVersion) {
					this._authority.emit('error', ERROR_TYPE.PUSH_FAILURE, {})
					OC.Notification.showTemporary('Changes could not be sent yet')
				}
			}

			this.fetchSteps()
			this.carefulRetry()
		})
	}

	disconnect() {
		clearInterval(this.fetcher)
		this.fetcher = 0
		document.removeEventListener('visibilitychange', this.visibilitychange.bind(this))
	}

	resetRefetchTimer() {
		if (this.fetcher === 0) {
			return
		}
		this.fetchInterval = FETCH_INTERVAL
		clearInterval(this.fetcher)
		this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval)

	}

	increaseRefetchTimer() {
		if (this.fetcher === 0) {
			return
		}
		this.fetchInterval = Math.min(this.fetchInterval * 2, FETCH_INTERVAL_MAX)
		clearInterval(this.fetcher)
		this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval)
	}

	maximumRefetchTimer() {
		if (this.fetcher === 0) {
			return
		}
		this.fetchInterval = FETCH_INTERVAL_SINGLE_EDITOR
		clearInterval(this.fetcher)
		this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval)
	}

	visibilitychange() {
		if (this.fetcher === 0) {
			return
		}
		if (document.visibilityState === 'hidden') {
			this.fetchInterval = FETCH_INTERVAL_INVISIBLE
			clearInterval(this.fetcher)
			this.fetcher = setInterval(this._fetchSteps.bind(this), this.fetchInterval)
		} else {
			this.resetRefetchTimer()
		}
	}

	carefulRetry() {
		const newRetry = this.retryTime ? Math.min(this.retryTime * 2, MAX_PUSH_RETRY) : MIN_PUSH_RETRY
		if (newRetry > WARNING_PUSH_RETRY && this.retryTime < WARNING_PUSH_RETRY) {
			OC.Notification.showTemporary('Changes could not be sent yet')
			this._authority.emit('error', ERROR_TYPE.PUSH_FAILURE, {})
		}
		this.retryTime = newRetry
	}

	carefulRetryReset() {
		this.retryTime = MIN_PUSH_RETRY
	}

}

export default PollingBackend

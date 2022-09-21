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
import { logger } from '../helpers/logger.js'
import { SyncService, ERROR_TYPE } from './SyncService.js'
import { Connection } from './SessionApi.js'

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

/* Maximum number of retries for fetching before emitting a connection error */
const MAX_RETRY_FETCH_COUNT = 5

/**
 * Timeout for sessions to be marked as disconnected
 * Make sure that this is higher than any FETCH_INTERVAL_ values
 */
const COLLABORATOR_DISCONNECT_TIME = FETCH_INTERVAL_INVISIBLE * 1.5

class PollingBackend {

	constructor(authority, connection) {
		/** @type {SyncService} */
		this._authority = authority
		/** @type {Connection} */
		this.connection = connection
		this.fetchInterval = FETCH_INTERVAL
		this.lock = false
		this.fetchRetryCounter = 0
	}

	connect() {
		this.initialLoadingFinished = false
		this.fetcher = setInterval(this._fetchSteps.bind(this), 50)
		document.addEventListener('visibilitychange', this.visibilitychange.bind(this))
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
		// TODO: figure out when to autosave
		) {
			autosaveContent = this._authority._getContent()
		}
		this.connection.sync({
			version: this._authority.version,
			autosaveContent,
			force: !!this._forcedSave,
			manualSave: !!this._manualSave,
		}).then(this._handleResponse.bind(this), this._handleError.bind(this))
		this._manualSave = false
		this._forcedSave = false
	}

	_handleResponse({ data }) {
		const { document, sessions } = data
		this.fetchRetryCounter = 0

		if (this._authority.version < document.lastSavedVersion) {
			logger.debug('Saved document', document)
			this._authority.emit('save', { document, sessions })
		}

		this._authority.emit('change', { document, sessions })

		if (data.steps.length === 0) {
			if (!this.initialLoadingFinished) {
				this.initialLoadingFinished = true
			}
			if (this._authority.checkIdle()) {
				return
			}
			this.lock = false
			const disconnect = Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME
			const alive = sessions.filter((s) => s.lastContact > disconnect)
			if (alive.length < 2) {
				this.maximumRefetchTimer()
			} else {
				this.increaseRefetchTimer()
			}
			this._authority.emit('stateChange', { dirty: false })
			this._authority.emit('stateChange', { initialLoading: true })
			return
		}

		this._authority._receiveSteps(data)
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
				logger.error('[PollingBackend:fetchSteps] Network error when fetching steps, emitting CONNECTION_FAILED')
				this._authority.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: { retry: false } })

			} else {
				logger.error(`[PollingBackend:fetchSteps] Network error when fetching steps, retry ${this.fetchRetryCounter}`)
			}
		} else if (e.response.status === 409 && e.response.data.document.currentVersion === this._authority.version) {
			// Only emit conflict event if we have synced until the latest version
			logger.error('Conflict during file save, please resolve')
			this._authority.emit('error', {
				type: ERROR_TYPE.SAVE_COLLISSION,
				data: {
					outsideChange: e.response.data.outsideChange,
				},
			})
			this.disconnect()
		} else if (e.response.status === 403) {
			this._authority.emit('error', { type: ERROR_TYPE.SOURCE_NOT_FOUND, data: {} })
			this.disconnect()
		} else if (e.response.status === 404) {
			this._authority.emit('error', { type: ERROR_TYPE.SOURCE_NOT_FOUND, data: {} })
			this.disconnect()
		} else if (e.response.status === 503) {
			this.increaseRefetchTimer()
			this._authority.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: { retry: false } })
			logger.error('Failed to fetch steps due to unavailable service', { error: e })
		} else {
			this.disconnect()
			this._authority.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: { retry: false } })
			logger.error('Failed to fetch steps due to other reason', { error: e })
		}

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

}

export default PollingBackend

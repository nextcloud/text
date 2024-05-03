/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

	/** @type {SyncService} */
	#syncService
	/** @type {Connection} */
	#connection

	#lastPoll
	#fetchInterval
	#fetchRetryCounter
	#pollActive
	#initialLoadingFinished

	constructor(syncService, connection) {
		this.#syncService = syncService
		this.#connection = connection
		this.#fetchInterval = FETCH_INTERVAL
		this.#fetchRetryCounter = 0
		this.#lastPoll = 0
	}

	connect() {
		if (this.fetcher > 0) {
			console.error('Trying to connect, but already connected')
			return
		}
		this.#initialLoadingFinished = false
		this.fetcher = setInterval(this._fetchSteps.bind(this), 50)
		document.addEventListener('visibilitychange', this.visibilitychange.bind(this))
	}

	/**
	 * This method is only called though the timer
	 */
	async _fetchSteps() {
		if (this.#pollActive) {
			return
		}

		const now = Date.now()

		if (this.#lastPoll > (now - this.#fetchInterval)) {
			return
		}

		if (!this.fetcher) {
			console.error('No inverval but triggered')
			return
		}

		this.#pollActive = true

		logger.debug('[PollingBackend] Fetching steps', this.#syncService.version)
		await this.#connection.sync({
			version: this.#syncService.version,
		}).then(this._handleResponse.bind(this), this._handleError.bind(this))
		this.#lastPoll = Date.now()
		this.#pollActive = false
	}

	_handleResponse({ data }) {
		const { document, sessions } = data
		this.#fetchRetryCounter = 0

		this.#syncService.emit('change', { document, sessions })
		this.#syncService._receiveSteps(data)

		if (data.steps.length === 0) {
			if (!this.#initialLoadingFinished) {
				this.#initialLoadingFinished = true
			}
			if (this.#syncService.checkIdle()) {
				return
			}
			const disconnect = Date.now() - COLLABORATOR_DISCONNECT_TIME
			const alive = sessions.filter((s) => s.lastContact * 1000 > disconnect)
			if (alive.length < 2) {
				this.maximumRefetchTimer()
			} else {
				this.increaseRefetchTimer()
			}
			this.#syncService.emit('stateChange', { initialLoading: true })
			return
		}

		if (this.#initialLoadingFinished) {
			this.resetRefetchTimer()
		}
	}

	_handleError(e) {
		if (!e.response || e.code === 'ECONNABORTED') {
			if (this.#fetchRetryCounter++ >= MAX_RETRY_FETCH_COUNT) {
				logger.error('[PollingBackend:fetchSteps] Network error when fetching steps, emitting CONNECTION_FAILED')
				this.#syncService.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })

			} else {
				logger.error(`[PollingBackend:fetchSteps] Network error when fetching steps, retry ${this.#fetchRetryCounter}`)
			}
		} else if (e.response.status === 409) {
			// Still apply the steps to update our version of the document
			this._handleResponse(e.response)
			logger.error('Conflict during file save, please resolve')
			this.#syncService.emit('error', {
				type: ERROR_TYPE.SAVE_COLLISSION,
				data: {
					outsideChange: e.response.data.outsideChange,
				},
			})
		} else if (e.response.status === 412) {
			this.#syncService.emit('error', { type: ERROR_TYPE.LOAD_ERROR, data: e.response })
			this.disconnect()
		} else if (e.response.status === 403) {
			this.#syncService.emit('error', { type: ERROR_TYPE.SOURCE_NOT_FOUND, data: {} })
			this.disconnect()
		} else if (e.response.status === 404) {
			this.#syncService.emit('error', { type: ERROR_TYPE.SOURCE_NOT_FOUND, data: {} })
			this.disconnect()
		} else if (e.response.status === 503) {
			this.increaseRefetchTimer()
			this.#syncService.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
			logger.error('Failed to fetch steps due to unavailable service', { error: e })
		} else {
			this.disconnect()
			this.#syncService.emit('error', { type: ERROR_TYPE.CONNECTION_FAILED, data: {} })
			logger.error('Failed to fetch steps due to other reason', { error: e })
		}

	}

	disconnect() {
		clearInterval(this.fetcher)
		this.fetcher = 0
		document.removeEventListener('visibilitychange', this.visibilitychange.bind(this))
	}

	resetRefetchTimer() {
		this.#fetchInterval = FETCH_INTERVAL

	}

	increaseRefetchTimer() {
		this.#fetchInterval = Math.min(this.#fetchInterval * 2, FETCH_INTERVAL_MAX)
	}

	maximumRefetchTimer() {
		this.#fetchInterval = FETCH_INTERVAL_SINGLE_EDITOR
	}

	visibilitychange() {
		if (document.visibilityState === 'hidden') {
			this.#fetchInterval = FETCH_INTERVAL_INVISIBLE
		} else {
			this.resetRefetchTimer()
		}
	}

}

export default PollingBackend

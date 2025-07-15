/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { Emitter } from 'mitt'
import { sync } from '../apis/sync'
import type { Connection } from '../composables/useConnection.js'
import { logger } from '../helpers/logger.js'
import getNotifyBus, { type EventTypes } from './NotifyService'
import {
	type Session,
	type Step,
	type SyncService,
	ERROR_TYPE,
} from './SyncService.js'

/**
 * Minimum inverval to refetch the document changes in ms.
 */
const FETCH_INTERVAL = 300

/**
 * Maximum interval between refetches of document state in ms
 * if multiple users have joined
 */
const FETCH_INTERVAL_MAX = 5000

/**
 * Interval to check for changes in ms
 * when there is only one user joined
 */
const FETCH_INTERVAL_SINGLE_EDITOR = 5000

/**
 * Interval to check for changes in ms for read only users
 */
const FETCH_INTERVAL_READ_ONLY = 30000

/**
 * Interval to fetch for changes in ms
 * when a browser window is considered invisible by the page visibility API
 * https://developer.mozilla.org/de/docs/Web/API/Page_Visibility_API
 */
const FETCH_INTERVAL_INVISIBLE = 30000

const FETCH_INTERVAL_NOTIFY = 30000

/* Maximum number of retries for fetching before emitting a connection error */
const MAX_RETRY_FETCH_COUNT = 5

/**
 * Timeout for sessions to be marked as disconnected
 * Make sure that this is higher than any FETCH_INTERVAL_ values
 */
const COLLABORATOR_DISCONNECT_TIME = FETCH_INTERVAL_INVISIBLE * 1.5

interface PollData {
	document: Document
	sessions: Session[]
	steps: Step[]
}

interface ConflictData extends PollData {
	outsideChange: string
}

class PollingBackend {
	#syncService: SyncService
	#connection: Connection

	#lastPoll
	#fetchInterval: number
	#fetchRetryCounter: number
	fetcher: NodeJS.Timeout | undefined
	#pollActive = false
	#initialLoadingFinished = false
	#notifyPushBus: Emitter<EventTypes> | undefined
	visibilitychange = () => {
		if (document.visibilityState === 'hidden') {
			this.#fetchInterval = FETCH_INTERVAL_INVISIBLE
		} else {
			this.resetRefetchTimer()
		}
	}

	constructor(syncService: SyncService, connection: Connection) {
		this.#syncService = syncService
		this.#connection = connection
		this.#fetchInterval = FETCH_INTERVAL
		this.#fetchRetryCounter = 0
		this.#lastPoll = 0
	}

	connect() {
		if (this.fetcher) {
			console.error('Trying to connect, but already connected')
			return
		}
		this.#initialLoadingFinished = false
		this.fetcher = setInterval(this._fetchSteps.bind(this), 50)
		document.addEventListener('visibilitychange', this.visibilitychange)
		this.#notifyPushBus = getNotifyBus()
	}

	/**
	 * This method is only called though the timer
	 */
	async _fetchSteps() {
		if (this.#pollActive) {
			return
		}

		const now = Date.now()

		if (this.#lastPoll > now - this.#fetchInterval) {
			return
		}

		if (!this.fetcher) {
			console.error('No inverval but triggered')
			return
		}

		this.#pollActive = true

		logger.debug('[PollingBackend] Fetching steps', {
			version: this.#syncService.version,
		})
		await sync(this.#connection, {
			version: this.#syncService.version,
		}).then(this._handleResponse.bind(this), this._handleError.bind(this))
		this.#lastPoll = Date.now()
		this.#pollActive = false
	}

	_handleResponse({ data }: { data: PollData }) {
		const { document, sessions } = data
		this.#fetchRetryCounter = 0

		this.#syncService.emit('change', { document, sessions })
		this.#syncService.receiveSteps(data)

		if (data.steps.length === 0) {
			if (!this.#initialLoadingFinished) {
				this.#initialLoadingFinished = true
			}
			if (this.#syncService.checkIdle()) {
				return
			}
			const disconnect = Date.now() - COLLABORATOR_DISCONNECT_TIME
			const alive = sessions.filter((s) => s.lastContact * 1000 > disconnect)
			if (this.#syncService.isReadOnly) {
				this.maximumReadOnlyTimer()
			} else if (alive.length < 2) {
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

	_handleError(e: {
		response?: { status: number; data: ConflictData }
		code?: string
	}) {
		if (!e.response || e.code === 'ECONNABORTED') {
			if (this.#fetchRetryCounter++ >= MAX_RETRY_FETCH_COUNT) {
				logger.error(
					'[PollingBackend:fetchSteps] Network error when fetching steps, emitting CONNECTION_FAILED',
				)
				this.#syncService.emit('error', {
					type: ERROR_TYPE.CONNECTION_FAILED,
					data: {},
				})
			} else {
				logger.error(
					`[PollingBackend:fetchSteps] Network error when fetching steps, retry ${this.#fetchRetryCounter}`,
				)
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
			this.#syncService.emit('error', {
				type: ERROR_TYPE.LOAD_ERROR,
				data: e.response,
			})
			this.disconnect()
		} else if ([403, 404].includes(e.response.status)) {
			this.#syncService.emit('error', {
				type: ERROR_TYPE.SOURCE_NOT_FOUND,
				data: {},
			})
			this.disconnect()
		} else if ([502, 503].includes(e.response.status)) {
			this.increaseRefetchTimer()
			this.#syncService.emit('error', {
				type: ERROR_TYPE.CONNECTION_FAILED,
				data: {},
			})
			logger.error('Failed to fetch steps due to unavailable service', {
				error: e,
			})
		} else {
			this.disconnect()
			this.#syncService.emit('error', {
				type: ERROR_TYPE.CONNECTION_FAILED,
				data: {},
			})
			logger.error('Failed to fetch steps due to other reason', { error: e })
		}
	}

	disconnect() {
		clearInterval(this.fetcher)
		this.fetcher = undefined
		document.removeEventListener('visibilitychange', this.visibilitychange)
	}

	resetRefetchTimer() {
		if (this.#notifyPushBus && this.#initialLoadingFinished) {
			this.#fetchInterval = FETCH_INTERVAL_NOTIFY
			return
		}
		this.#fetchInterval = FETCH_INTERVAL
	}

	increaseRefetchTimer() {
		if (this.#notifyPushBus && this.#initialLoadingFinished) {
			this.#fetchInterval = FETCH_INTERVAL_NOTIFY
			return
		}
		this.#fetchInterval = Math.min(this.#fetchInterval * 2, FETCH_INTERVAL_MAX)
	}

	maximumRefetchTimer() {
		if (this.#notifyPushBus && this.#initialLoadingFinished) {
			this.#fetchInterval = FETCH_INTERVAL_NOTIFY
			return
		}
		this.#fetchInterval = FETCH_INTERVAL_SINGLE_EDITOR
	}

	maximumReadOnlyTimer() {
		this.#fetchInterval = FETCH_INTERVAL_READ_ONLY
	}
}

export default PollingBackend

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

import axios from 'nextcloud-axios'
import { schema, defaultMarkdownSerializer } from 'prosemirror-markdown'
import { receiveTransaction, sendableSteps, getVersion } from 'prosemirror-collab'
import { Step } from 'prosemirror-transform'
import { endpointUrl } from './helpers'

/**
 * Minimum inverval to refetch the document changes
 * @type {number}
 */
const FETCH_INTERVAL = 200

/**
 * Maximum interval between refetches of document state if multiple users have joined
 * @type {number}
 */
const FETCH_INTERVAL_MAX = 2000

/**
 * Interval to check for changes when there is only one user joined
 * @type {number}
 */
const FETCH_INTERVAL_SINGLE_EDITOR = 5000

const MIN_PUSH_RETRY = 500
const MAX_PUSH_RETRY = 10000

/* Timeout after that a PUSH_FAILURE error is emitted */
const WARNING_PUSH_RETRY = 5000

/* Timeout for sessions to be marked as disconnected */
const COLLABORATOR_DISCONNECT_TIME = 20

const ERROR_TYPE = {
	/**
	 * Failed to save collaborative document due to external change
	 * collission needs to be resolved manually
	 */
	SAVE_COLLISSION: 0,
	/**
	 * Failed to push changes for MAX_REBASE_RETRY times
	 */
	PUSH_FAILURE: 1
}


class EditorSync {

	constructor(data, shareToken) {
		this.view = null
		this.session = data.session
		this.document = data.document
		this.steps = []
		this.stepClientIDs = []
		this.lock = false
		this.retryTime = MIN_PUSH_RETRY
		this.dirty = false
		this.fetchInverval = FETCH_INTERVAL
		this.shareToken = shareToken

		this.onSyncHandlers = []
		this.onErrorHandlers = []
		this.onStateChangeHandlers = []

		// example for polling
		// the interval will be adjusted dynamically depending on the time without any change
		this.fetcher = setInterval(() => this.fetchSteps(), this.fetchInverval)
	}

	isPublic() {
		return !!this.shareToken
	}

	destroy() {
		clearInterval(this.fetcher)
	}

	onSync(handler) {
		this.onSyncHandlers.push(handler)
	}

	onStateChange(handler) {
		this.onStateChangeHandlers.push(handler)
	}

	triggerStateChange() {
		this.onStateChangeHandlers.forEach((handler) => handler())
	}

	onError(handler) {
		this.onErrorHandlers.push(handler)
	}

	content() {
		return defaultMarkdownSerializer.serialize(this.view.state.doc)
	}

	forceSave() {
		this._forcedSave = true
	}

	manualSave() {
		this._manualSave = true
	}

	fetchSteps() {
		if (this.lock) {
			return
		}
		this.lock = true
		this.triggerStateChange()
		const authority = this
		let autosaveContent
		if (
			this._forcedSave || this._manualSave
			|| (!sendableSteps(this.view.state) && (authority.steps.length > this.document.lastSavedVersion))
		) {
			autosaveContent = this.content()
		}
		axios.post(endpointUrl('session/sync', this.isPublic()), {
			documentId: this.document.id,
			sessionId: this.session.id,
			sessionToken: this.session.token,
			version: authority.steps.length,
			autosaveContent,
			force: !!this._forcedSave,
			manualSave: !!this._manualSave,
			token: this.shareToken
		}).then((response) => {
			if (this.document.lastSavedVersion < response.data.document.lastSavedVersion) {
				console.debug('Saved document', response.data.document)
				this.document = response.data.document
			}
			if (!this.view.props.editable) {
				this.view.setProps({ editable: () => true })
			}

			this.onSyncHandlers.forEach((handler) => handler(response.data))

			if (response.data.steps.length === 0) {
				this.lock = false
				if (response.data.sessions.filter((session) => session.lastContact > Date.now() / 1000 - COLLABORATOR_DISCONNECT_TIME).length < 2) {
					this.maximumRefetchTimer()
				} else {
					this.increaseRefetchTimer()
				}
				return
			}

			for (let i = 0; i < response.data.steps.length; i++) {
				let steps = response.data.steps[i].data.map(j => Step.fromJSON(schema, j))
				steps.forEach(step => {
					authority.steps.push(step)
					authority.stepClientIDs.push(response.data.steps[i].sessionId)
				})
			}
			let newData = authority.stepsSince(getVersion(authority.view.state))
			/*authority.view.dispatch(
				receiveTransaction(authority.view.state, newData.steps, newData.clientIDs)
			)*/
			console.debug('Synced new steps, current version is ' + getVersion(authority.view.state))
			this.lock = false
			this._forcedSave = false
			// this.sendSteps()
			this.resetRefetchTimer()
		}).catch((e) => {
			this.lock = false
			// this.sendSteps()
			if (e.response.status === 409) {
				console.error('Conflict during file save, please resolve')
				this.view.setProps({ editable: () => false })
				// TODO recover
				this.onErrorHandlers.forEach((handler) => handler(ERROR_TYPE.SAVE_COLLISSION, {
					outsideChange: e.response.data.outsideChange
				}))
			}
		})
		this._manualSave = false
		this._forcedSave = false
	}

	resetRefetchTimer() {
		this.fetchInverval = FETCH_INTERVAL
		clearInterval(this.fetcher)
		this.fetcher = setInterval(() => this.fetchSteps(), this.fetchInverval)

	}

	increaseRefetchTimer() {
		this.fetchInverval = Math.min(this.fetchInverval + 100, FETCH_INTERVAL_MAX)
		clearInterval(this.fetcher)
		this.fetcher = setInterval(() => this.fetchSteps(), this.fetchInverval)
	}

	maximumRefetchTimer() {
		this.fetchInverval = FETCH_INTERVAL_SINGLE_EDITOR
		clearInterval(this.fetcher)
		this.fetcher = setInterval(() => this.fetchSteps(), this.fetchInverval)
	}

	stepsSince(version) {
		return {
			steps: this.steps.slice(version),
			clientIDs: this.stepClientIDs.slice(version)
		}
	}

	carefulRetry(callback) {
		let newRetry = this.retryTime ? Math.min(this.retryTime * 2, MAX_PUSH_RETRY) : MIN_PUSH_RETRY
		if (newRetry > WARNING_PUSH_RETRY && this.retryTime < WARNING_PUSH_RETRY) {
			OC.Notification.showTemporary('Changes could not be sent yet')
			this.view.setProps({ editable: () => false })
			this.onErrorHandlers.forEach((handler) => handler(ERROR_TYPE.PUSH_FAILURE, {}))
			// TODO recover
		}
		this.retryTime = newRetry
		setTimeout(callback, this.retryTime)
	}

	carefulRetryReset() {
		this.retryTime = MIN_PUSH_RETRY
	}

	sendSteps() {
		let sendable = sendableSteps(this.view.state)
		if (!sendable) {
			this.dirty = false
			this.triggerStateChange()
			return
		}
		this.dirty = true
		this.triggerStateChange()
		if (this.lock) {
			setTimeout(() => {
				this.sendSteps()
			}, 500)
			return
		}
		this.lock = true
		const authority = this
		let steps = sendable.steps
		axios.post(endpointUrl('session/push', this.isPublic()), {
			documentId: this.document.id,
			sessionId: this.session.id,
			sessionToken: this.session.token,
			steps: steps.map(s => s.toJSON()) || [],
			version: getVersion(authority.view.state),
			token: this.shareToken
		}).then((response) => {
			// sucessfully applied steps on the server
			/*steps.forEach(step => {
				authority.steps.push(step)
				authority.stepClientIDs.push(this.session.id)
			})
			let newData = authority.stepsSince(getVersion(authority.view.state))
			authority.view.dispatch(
				receiveTransaction(authority.view.state, newData.steps, newData.clientIDs)
			)*/
			this.carefulRetryReset()
			this.lock = false
			this.fetchSteps()
		}).catch((e) => {
			console.error('failed to apply steps due to collission, retrying')
			// TODO: increase retry counter to check against MAX_REBASE_RETRY
			this.lock = false
			// TODO: remove if we have state machine
			this.fetchSteps()

			this.carefulRetry(() => {
				this.sendSteps()
			})
		})
	}

}

export { EditorSync, ERROR_TYPE, endpointUrl }

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
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {exampleSetup} from "prosemirror-example-setup"
import {schema, defaultMarkdownParser, defaultMarkdownSerializer} from "prosemirror-markdown"
import {collab, receiveTransaction, sendableSteps, getVersion} from 'prosemirror-collab';
import {Step} from 'prosemirror-transform';

const FETCH_INTERVAL = 200;
const MIN_PUSH_RETRY = 500;
const MAX_PUSH_RETRY = 10000;
const WARNING_PUSH_RETRY = 2000;

/**
 * Define how often the editor should retry to apply local changes, before warning the user
 */
const MAX_REBASE_RETRY = 5;

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
}

// TODO to fetch changes more frequently while typing
// we either need to have a state machine similar to the prosemirror example to fetch
// changes inbetween push tries or return updates with the push error

class EditorSync {
	constructor(doc, data) {
		this.view = null
		this.doc = doc
		this.session = data.session
		this.document = data.document
		this.steps = []
		this.stepClientIDs = []
		this.lock = false
		this.retryTime = MIN_PUSH_RETRY
		this.dirty = false
		this.fetchInverval = FETCH_INTERVAL;

		this.onSyncHandlers = []
		this.onErrorHandlers = []
		this.onStateChangeHandlers = []

		// example for polling
		// the interval will be adjusted dynamically depending on the time without any change
		this.fetcher = setInterval(() => this.fetchSteps(), this.fetchInverval)
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

	fetchSteps() {
		if (this.lock) {
			return;
		}
		this.lock = true;
		this.triggerStateChange()
		const authority = this;
		let autosaveContent = undefined
		if (!sendableSteps(this.view.state)) {
			autosaveContent = this.content()
		}
		axios.get(OC.generateUrl('/apps/text/session/sync'), {params: {
				documentId: this.document.id,
				sessionId: this.session.id,
				token: this.session.token,
				version: authority.steps.length,
				autosaveContent
			}}).then((response) => {
			this.onSyncHandlers.forEach((handler) => handler(response.data))

			if (response.data.document) {
				console.log('Saved document', response.data.document)
			}
			if (response.data.steps.length === 0) {
				this.lock = false;
				this.increaseRefetchTimer();
				return;
			}
			for (let i = 0; i < response.data.steps.length; i++) {
				let steps = response.data.steps[i].data.map(j => Step.fromJSON(schema, j));
				steps.forEach(step => {
					authority.steps.push(step)
					authority.stepClientIDs.push(response.data.steps[i].sessionId)
				})
			}
			let newData = authority.stepsSince(getVersion(authority.view.state))
			authority.view.dispatch(
				receiveTransaction(authority.view.state, newData.steps, newData.clientIDs)
			)
			console.log(getVersion(authority.view.state))
			this.lock = false;
			this.sendSteps()
			this.resetRefetchTimer();
		}).catch((e) => {
			this.lock = false;
			this.sendSteps()
			if (e.response.status === 409) {
				console.log('Conflict during file save, please resolve')
				this.view.setProps({editable: () => false})
				// TODO recover
				this.onErrorHandlers.forEach((handler) => handler(ERROR_TYPE.SAVE_COLLISSION, {
					outsideChange: e.response.outsideChange
				}))
			}
		})
	}

	resetRefetchTimer() {
		this.fetchInverval = FETCH_INTERVAL;
		clearInterval(this.fetcher)
		this.fetcher = setInterval(() => this.fetchSteps(), this.fetchInverval)

	}

	increaseRefetchTimer() {
		this.fetchInverval = Math.min(this.fetchInverval + 100, FETCH_INTERVAL*5)
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
			OC.Notification.showTemporary('Changes could not be sent yet');
			this.view.setProps({editable: () => false})
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
			return;
		}
		this.dirty = true
		this.triggerStateChange()
		if (this.lock) {
			setTimeout(() => {
				this.sendSteps()
			}, 500)
			return;
		}
		this.lock = true
		const authority = this
		let steps = sendable.steps
		axios.post(OC.generateUrl('/apps/text/session/push'), {
			documentId: this.document.id,
			sessionId: this.session.id,
			token: this.session.token,
			steps: steps.map(s => s.toJSON()) || [],
			version: getVersion(authority.view.state)
		}).then((response) => {
			// sucessfully applied steps on the server
			steps.forEach(step => {
				authority.steps.push(step)
				authority.stepClientIDs.push(this.session.id)
			})
			let newData = authority.stepsSince(getVersion(authority.view.state))
			authority.view.dispatch(
				receiveTransaction(authority.view.state, newData.steps, newData.clientIDs)
			)
			this.carefulRetryReset()
			this.lock = false
		}).catch((e) => {
			console.log('failed to apply steps due to collission, retrying');
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

const initEditor = (unusedauthority, tmpEditorId, data, fileContent, editorView) => {
	const authority = new EditorSync(defaultMarkdownParser.parse(fileContent), data)
	authority.onSync((syncState) => {
		editorView.sessions = syncState.sessions
	})

	const view = new EditorView(document.querySelector("#editor" + tmpEditorId), {
		state: EditorState.create({
			doc: authority.doc,
			plugins: [
				...exampleSetup({schema}),
				collab({
					version: authority.steps.length,
					clientID: data.session.id
				})
			]
		}),
		focus() { this.view.focus() },
		destroy() { this.view.destroy() },
		dispatchTransaction: transaction => {
			const state = view.state.apply(transaction);
			view.updateState(state);
			// TODO: might be good to debounce this a bit
			authority.sendSteps()
		}
	})
	authority.view = view;
	authority.fetchSteps()
	window.OCA.Text = {
		view,
		authority
	}
	return {
		view: view,
		authority: authority
	}
}

export { initEditor, ERROR_TYPE }

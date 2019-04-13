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

const FETCH_INTERVAL = 100;
const MIN_PUSH_RETRY = 200;
const MAX_PUSH_RETRY = 10000;
const WARNING_PUSH_RETRY = 2000;

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

		// example for polling
		// TODO: dynamic fetch interval
		// reduce fetch interval if no other user joined or no change since x sec
		setInterval(() => this.fetchSteps(), FETCH_INTERVAL)

	}

	fetchSteps() {
		if (this.lock) {
			return;
		}
		this.lock = true;
		const authority = this;
		axios.get(OC.generateUrl('/apps/text/session/sync'), {params: {
				documentId: this.document.id,
				sessionId: this.session.id,
				token: this.session.token,
				version: authority.steps.length
			}}).then((response) => {
			if (response.data.steps.length === 0) {
				this.lock = false;
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
		}).catch((e) => {
			this.lock = false;
		})
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
			return;
		}

		if (this.lock) {
			setTimeout(() => {
				this.sendSteps()
			}, 500)
			return;
		}
		this.lock = true;
		const authority = this;
		let version = sendable.version;
		let steps = sendable.steps;
		axios.post(OC.generateUrl('/apps/text/session/push'), {
			documentId: this.document.id,
			sessionId: this.session.id,
			token: this.session.token,
			steps: steps.map(s => s.toJSON()) || [],
			version: getVersion(authority.view.state)
		}).then((response) => {
			// sucessfully applied steps on the server
			let newSteps = []
			let newClientIDs = []
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
			this.lock = false
			// TODO: remove if we have state machine
			this.fetchSteps()

			this.carefulRetry(() => {
				this.sendSteps()
			})
		})
	}

}

const initEditor = (unusedauthority, tmpEditorId, data, fileContent) => {
	const authority = new EditorSync(defaultMarkdownParser.parse(fileContent), data)

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
		get content() {
			return defaultMarkdownSerializer.serialize(this.view.state.doc)
		},
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
}

export { initEditor }

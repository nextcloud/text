import axios from 'nextcloud-axios'

import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"

import {schema, defaultMarkdownParser, defaultMarkdownSerializer} from "prosemirror-markdown"
import {Step} from 'prosemirror-transform'
import {collab, receiveTransaction, sendableSteps, getVersion} from "prosemirror-collab"


import Authority from './authority'

/* This value allows to simulate longer RTT
 * DEBUG_TIMEOUT 100 will simulate a RTT of 100ms for each request
 * so 200ms on total for sending change and fetching change
 */
const DEBUG_TIMEOUT = 100;
const initEditor = (authority, tmpEditorId) => {
	const view = new EditorView(document.querySelector("#editor" + tmpEditorId), {
		state: EditorState.create({
			doc: authority.doc,
			plugins: [
				...exampleSetup({schema}), collab({version: authority.steps.length})]
		}),
		get content() {
			return defaultMarkdownSerializer.serialize(this.view.state.doc)
		},
		focus() { this.view.focus() },
		destroy() { this.view.destroy() },
		dispatchTransaction: transaction => {
			const state = view.state.apply(transaction);
			view.updateState(state);
			let sendable = sendableSteps(state)
			if (sendable) {
				setTimeout(() => authority.receiveSteps(sendable.version, sendable.steps, sendable.clientID), DEBUG_TIMEOUT)
			}
		}
	})

	authority.onNewSteps.push(function() {
		// https://github.com/scrumpy/tiptap/issues/74
		let newData = authority.stepsSince(getVersion(view.state))
		const steps = JSON.parse(JSON.stringify(newData.steps));
		const cleanSteps = steps[0].map(step => Step.fromJSON(schema, step));
		setTimeout(() => {
			view.dispatch(receiveTransaction(view.state, cleanSteps, newData.clientIDs))
		}, DEBUG_TIMEOUT)
	})


	window.view[tmpEditorId] = view;
}

window.view = {};
/*
 * Loading initial document state from server
 */
axios.get('http://localhost:8000/remote.php/webdav/example.md').then((response) => {
	var contentDom = document.querySelector("#editor-content");
	contentDom.innerHTML = response.data;
	const authority = new Authority(defaultMarkdownParser.parse(document.querySelector("#editor-content").textContent))
	initEditor(authority, 1);
	initEditor(authority, 2);
	initEditor(authority, 3);
})


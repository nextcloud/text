import { Extension } from '@tiptap/core'
import { Step } from 'prosemirror-transform'
import {
	collab,
	sendableSteps,
	getVersion,
	receiveTransaction,
} from 'prosemirror-collab'

let timeout
const debounce = (fn, delay) => (...args) => {
	if (timeout) {
		clearTimeout(timeout)
	}
	timeout = setTimeout(() => {
		fn(...args)
		timeout = null
	}, delay)
}

const Collaboration = Extension.create({
	name: 'collaboration',
	onCreate() {
		this.getSendableSteps = debounce(state => {
			const sendable = sendableSteps(state)

			if (sendable && this.editor.options.editable) {
				this.options.onSendable({
					editor: this.editor,
					sendable: {
						version: sendable.version,
						steps: sendable.steps.map(step => step.toJSON()),
						clientID: sendable.clientID,
					},
				})
			}
		}, this.options.debounce)

		this.editor.on('transaction', ({ editor }) => {
			this.getSendableSteps(editor.state)
		})
	},

	addOptions() {
		return {
			version: 0,
			clientID: Math.floor(Math.random() * 0xFFFFFFFF),
			debounce: 250,
			onSendable: () => { },
			update: ({ steps, version }) => {
				const { state, view, schema } = this.editor

				if (getVersion(state) > version) {
					return
				}

				view.dispatch(receiveTransaction(
					state,
					steps.map(item => Step.fromJSON(schema, item.step)),
					steps.map(item => item.clientID),
				))
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			collab({
				version: this.options.version,
				clientID: this.options.clientID,
			}),
		]
	},

})

export default Collaboration

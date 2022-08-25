import axios from '@nextcloud/axios'
import { VueRenderer } from '@tiptap/vue-2'
import { generateUrl } from '@nextcloud/router'
import tippy from 'tippy.js'
import List from './List.vue'

const USERS_LIST_ENDPOINT_URL = generateUrl('apps/text/api/v1/users')

const emitMention = ({ session, props }) => {
	axios.put(generateUrl('apps/text/session/mention'), {
		documentId: session.documentId,
		sessionId: session.id,
		sessionToken: session.token,
		mention: props.id,
	})
}

export default ({ session }) => ({
	items: async ({ query }) => {
		const params = {
			documentId: session.documentId,
			sessionId: session.id,
			sessionToken: session.token,
			filter: query,
		}
		const response = await axios.post(USERS_LIST_ENDPOINT_URL, params)
		const users = JSON.parse(JSON.stringify(response.data))
		const result = []

		Object.keys(users).map(key => result.push({
			id: key,
			label: users[key],
		}))

		return result
	},

	command: ({ editor, range, props }) => {
		emitMention({ session, props })

		// Insert mention
		// from https://github.com/ueberdosis/tiptap/blob/9a254bf9daf6d839bd02c968e14837098b903b38/packages/extension-mention/src/mention.ts

		// increase range.to by one when the next node is of type "text"
		// and starts with a space character
		const nodeAfter = editor.view.state.selection.$to.nodeAfter
		const overrideSpace = nodeAfter?.text?.startsWith(' ')

		if (overrideSpace) {
			range.to += 1
		}

		editor
			.chain()
			.focus()
			.insertContentAt(range, [
				{
					type: 'mention',
					attrs: props,
				},
				{
					type: 'text',
					text: ' ',
				},
			])
			.run()

		window.getSelection()?.collapseToEnd()
	},

	render: () => {
		let component
		let popup

		return {
			onStart: props => {
				component = new VueRenderer(List, {
					parent: this,
					propsData: props,
				})

				if (!props.clientRect) {
					return
				}

				popup = tippy('body', {
					getReferenceClientRect: props.clientRect,
					appendTo: () => document.body,
					content: component.element,
					showOnCreate: true,
					interactive: true,
					trigger: 'manual',
					placement: 'bottom-start',
				})
			},

			onUpdate(props) {
				component.updateProps(props)

				if (!props.clientRect || !popup) {
					return
				}

				popup[0].setProps({
					getReferenceClientRect: props.clientRect,
				})
			},

			onKeyDown(props) {
				if (!popup) {
					return
				}

				if (props.event.key === 'Escape') {
					popup[0].hide()

					return true
				}

				return component.ref?.onKeyDown(props)
			},

			onExit() {
				if (!popup) {
					return
				}
				popup[0].destroy()
				component.destroy()
			},
		}
	},
})

import axios from '@nextcloud/axios'
import { VueRenderer } from '@tiptap/vue-2'
import { generateUrl } from '@nextcloud/router'
import tippy from 'tippy.js'
import List from './List.vue'

const USERS_LIST_ENDPOINT_URL = generateUrl('apps/text/api/v1/users');

export default {
	items: async ({ query }) => {
		const params = { filter: query }
		const response = await axios.post(USERS_LIST_ENDPOINT_URL, params)
		const users = JSON.parse(JSON.stringify(response.data))
		let result = []

		Object.keys(users).map(key => result.push({
			id: key,
			label: users[key],
		}))

		return result
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

				if (!props.clientRect) {
					return
				}

				popup[0].setProps({
					getReferenceClientRect: props.clientRect,
				})
			},

			onKeyDown(props) {
				if (props.event.key === 'Escape') {
					popup[0].hide()

					return true
				}

				return component.ref?.onKeyDown(props)
			},

			onExit() {
				popup[0].destroy()
				component.destroy()
			},
		}
	},
}
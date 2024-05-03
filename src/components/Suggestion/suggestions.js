/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import tippy from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-2'

export default ({
	listComponent,
	items = () => {},
	command = ({ editor, range, props }) => {},
}) => ({
	items,
	command,
	render: () => {
		let component
		let popup

		return {
			onStart: props => {
				component = new VueRenderer(listComponent, {
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

				component.ref.$on('select', () => {
					popup.length > 0 && popup[0].hide()
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
					popup[0].destroy()
					component.destroy()
					popup = null

					return true
				}

				return component.ref?.onKeyDown?.(props)
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

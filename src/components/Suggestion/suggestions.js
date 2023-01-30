/*
* @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
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
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
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

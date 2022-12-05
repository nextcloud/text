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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

const Keymap = Extension.create({

	name: 'customkeymap',

	addKeyboardShortcuts() {
		return this.options
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					handleKeyDown(view, event) {
						const key = event.key || event.keyCode
						if ((event.ctrlKey || event.metaKey) && !event.shiftKey && (key === 'f' || key === 70)) {
							// We need to stop propagation and dispatch the event on the window
							// in order to force triggering the browser native search in the text editor
							event.stopPropagation()
							window.dispatchEvent(event)
							return true
						}
						if (event.key === 'Delete' && event.ctrlKey === true) {
							// Prevent deleting the file, by core Viewer.vue
							event.stopPropagation()
							window.dispatchEvent(event)
							return true
						}
					},
				},
			}),
		]
	},

})

export default Keymap

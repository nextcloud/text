/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

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

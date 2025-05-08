/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

const Keymap = Extension.create({
	name: 'Keymap',

	addKeyboardShortcuts() {
		return this.options
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					handleKeyDown(view, event) {
						const key = event.key || event.keyCode

						/**
						 * <Esc>
						 * Overwrite Viewer keybinding to close viewer
						 */
						if (event.key === 'Escape') {
							event.preventDefault()
							event.stopPropagation()
							return true
						}

						/**
						 * <Mod>-<Del>
						 * Overwrite Viewer keybinding to delete the file
						 */
						if (
							(event.ctrlKey || event.metaKey)
							&& !event.shiftKey
							&& event.key === 'Delete'
						) {
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

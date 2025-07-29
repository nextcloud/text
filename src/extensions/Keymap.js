/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { emit } from '@nextcloud/event-bus'
import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

const Keymap = Extension.create({
	name: 'CustomKeymap',

	addKeyboardShortcuts() {
		return {
			/**
			 * <Mod>-<Alt>-<H>
			 * Toggle editor outline
			 */
			'Mod-Alt-h': () => {
				emit('text:keyboard:outline')
				return true
			},
			/**
			 * <Backspace>
			 * Allows to undo input rules after they got automatically applied
			 */
			Backspace: () => this.editor.commands.undoInputRule(),
		}
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					handleKeyDown(view, event) {
						/**
						 * <Mod>-<S>
						 * Save editor content
						 */
						if (
							(event.ctrlKey || event.metaKey)
							&& !event.altKey
							&& !event.shiftKey
							&& event.key === 's'
						) {
							event.preventDefault()
							event.stopPropagation()
							emit('text:keyboard:save')
							return true
						}

						/**
						 * <Esc>
						 * Overwrite Viewer keybinding to close viewer
						 */
						if (
							!event.ctrlKey
							&& !event.metaKey
							&& !event.altKey
							&& !event.shiftKey
							&& event.key === 'Escape'
						) {
							event.preventDefault()
							event.stopPropagation()
							return true
						}

						/**
						 * <Mod>-<Del>
						 * Prevent Viewer keybinding to delete the file, but don't prevent
						 * browser keybinding to delete word after cursor.
						 */
						if (
							(event.ctrlKey || event.metaKey)
							&& !event.altKey
							&& !event.shiftKey
							&& event.key === 'Delete'
						) {
							event.stopPropagation()
						}
					},
				},
			}),
		]
	},
})

export default Keymap

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

export default Extension.create({
	addOptions() {
		return {
			fileId: null,
		}
	},
	addStorage() {
		return {
			started: false,
		}
	},
	onCreate() {
		if (this.options.fileId === null) {
			throw new Error('fileId needs to be provided')
		}
		this.storage.started = true
	},
	onSelectionUpdate({ editor }) {
		if (!this.storage.started) {
			return
		}

		const pos = editor.state.selection.$anchor.pos
		sessionStorage.setItem('text-lastPos-' + this.options.fileId, pos)
	},
	addCommands() {
		return {
			autofocus: () => ({ commands, editor }) => {
				const pos = sessionStorage.getItem('text-lastPos-' + this.options.fileId)
				if (pos) {
					return commands.focus(pos)
				}

				return commands.focus('start')
			},
		}
	},
})

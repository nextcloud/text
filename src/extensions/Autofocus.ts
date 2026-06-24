/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

export interface AutofocusOptions {
	fileId: number | null
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		autofocus: {
			autofocus: () => ReturnType
		}
	}
}

export default Extension.create<AutofocusOptions>({
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
		localStorage.setItem('text-lastPos-' + this.options.fileId, String(pos))
	},
	addCommands() {
		return {
			autofocus:
				() =>
				({ commands }) => {
					const pos = localStorage.getItem(
						'text-lastPos-' + this.options.fileId,
					)
					if (pos) {
						return commands.focus(Number(pos))
					}

					return commands.focus('start')
				},
		}
	},
})

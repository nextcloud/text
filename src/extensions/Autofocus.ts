/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'

export interface AutofocusOptions {
	id: number | null
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
			id: null,
		}
	},
	addStorage() {
		return {
			started: false,
		}
	},
	onCreate() {
		if (this.options.id === null) {
			throw new Error('id needs to be provided')
		}
	},
	onSelectionUpdate({ editor }) {
		if (!this.storage.started) {
			return
		}

		const pos = editor.state.selection.$anchor.pos
		localStorage.setItem('text-lastPos-' + this.options.id, String(pos))
	},
	addCommands() {
		return {
			autofocus:
				() => ({ commands }) => {
					this.storage.started = true
					const pos = localStorage.getItem('text-lastPos-' + this.options.id)
					if (pos) {
						return commands.focus(Number(pos))
					}

					return commands.focus('start')
				},
		}
	},
})

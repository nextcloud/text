/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Context } from '../composables/useConnection.ts'

import { Extension } from '@tiptap/core'

export interface AutofocusOptions {
	context: Context | null
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
			context: null,
		}
	},
	addStorage() {
		return {
			started: false,
		}
	},
	onSelectionUpdate({ editor }) {
		if (!this.storage.started || !this.options.context) {
			return
		}

		const pos = editor.state.selection.$anchor.pos
		localStorage.setItem(itemKey(this.options.context), String(pos))
	},
	addCommands() {
		return {
			autofocus:
				() => ({ commands }) => {
					this.storage.started = true
					const pos = this.options.context && localStorage.getItem(itemKey(this.options.context))
					if (pos) {
						return commands.focus(Number(pos))
					}

					return commands.focus('start')
				},
		}
	},
})

/**
 * Key for local storage to store position in
 *
 * @param context from the options to identify the document
 */
function itemKey(context: Context): string {
	const { type, id } = context
	return `text-lastPos-${type}-${id}`
}

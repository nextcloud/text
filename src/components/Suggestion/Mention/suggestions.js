/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { emitMention, getUsers } from '../../../apis/mention.ts'
import createSuggestions from '../suggestions.js'
import MentionList from './MentionList.vue'

export default ({ connection, options }) =>
	createSuggestions({
		listComponent: MentionList,
		items: async ({ query }) => {
			let customUsers = {}
			if (typeof options?.mentionSearch === 'function') {
				customUsers = await options.mentionSearch(query)
			}

			const entries = Object.entries(customUsers).map(([id, label]) => ({
				id,
				label,
			}))
			if (entries.length >= 6) {
				return entries
			}

			const serverUsers = await getUsers(query, { connection })
			const serverEntries = Object.entries(serverUsers)
				.filter(([id]) => !(id in customUsers))
				.map(([id, label]) => ({ id, label }))
				.slice(0, 6 - entries.length)

			return [...entries, ...serverEntries]
		},

		command: ({ editor, range, props }) => {
			if (options?.emitMention) {
				options.emitMention({ props })
			} else {
				emitMention(props.id, window.location, { connection })
			}

			// Insert mention
			// from https://github.com/ueberdosis/tiptap/blob/9a254bf9daf6d839bd02c968e14837098b903b38/packages/extension-mention/src/mention.ts

			// increase range.to by one when the next node is of type "text"
			// and starts with a space character
			const nodeAfter = editor.view.state.selection.$to.nodeAfter
			const overrideSpace = nodeAfter?.text?.startsWith(' ')

			if (overrideSpace) {
				range.to += 1
			}

			editor
				.chain()
				.focus()
				.insertContentAt(range, [
					{
						type: 'mention',
						attrs: props,
					},
					{
						type: 'text',
						text: ' ',
					},
				])
				.run()

			window.getSelection()?.collapseToEnd()
		},
		...options,
	})

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import MentionList from './MentionList.vue'
import createSuggestions from '../suggestions.js'
import { emitMention, getUsers } from '../../../apis/mention.ts'

export default ({ connection, options }) => createSuggestions({
	listComponent: MentionList,
	items: async ({ query }) => {
		const users = await getUsers(query, { connection })
		return Object.entries(users).map(([id, label]) => ({ id, label }))
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

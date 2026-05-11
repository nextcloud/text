/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { MarkdownSerializerState } from 'prosemirror-markdown'

import { OrderedList as TiptapOrderedList } from '@tiptap/extension-list'
import { toggleListCommand } from '../commands'

const OrderedList = TiptapOrderedList.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			isList: {
				default: true,
				rendered: false,
			},
		}
	},

	addCommands() {
		return {
			...this.parent?.(),
			toggleOrderedList: toggleListCommand('orderedList', 'listItem'),
		}
	},

	// Overwrite toMarkdown from prosemirror-markdown to preserve non-1 start numbers in lists
	// @ts-expect-error - toMarkdown is a custom field not part of the official Tiptap API
	toMarkdown(state: MarkdownSerializerState, node: Node) {
		const start = node.attrs.start ?? 1
		const maxW = String(start + node.childCount - 1).length
		const space = state.repeat(' ', maxW + 2)
		state.renderList(node, space, (i) => {
			const nStr = String(start + i)
			return state.repeat(' ', maxW - nStr.length) + nStr + '. '
		})
	},
})

export default OrderedList

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'

declare module 'prosemirror-markdown' {
	interface MarkdownSerializerState {
		delim: string
	}
}

const Comment = Node.create({
	name: 'comment',
	content: 'commentItem+',
	defining: true,
	isolating: true,

	addAttributes() {
		return {
			referenceId: {
				default: '',
				parseHTML: (el) => el.getAttribute('data-reference-id') ?? '',
				renderHTML: (attrs) => ({
					'data-reference-id': attrs.referenceId,
				}),
			},
		}
	},

	parseHTML() {
		return [{ tag: 'div[data-type="comment"]' }]
	},

	renderHTML({ node, HTMLAttributes }) {
		const id = node.attrs.referenceId
		return [
			'div',
			mergeAttributes(HTMLAttributes, {
				'data-type': 'comment',
				id: `c-${id}`,
			}),
			0,
		]
	},

	toMarkdown(state, node) {
		state.write(`[^${node.attrs.referenceId}]:\n`)
		const savedDelim = state.delim
		state.delim += '    '
		state.renderList(node, '  ', (i) => {
			const item = node.child(i)
			const { author, authorLabel, timestamp } = item.attrs
			const authorMarkdown = author
				? `@[${authorLabel}](mention://user/${encodeURIComponent(author)})`
				: `@${authorLabel || ''}`
			const ts = timestamp ? ` *(${timestamp})*` : ''
			return `- ${authorMarkdown}${ts}\n`
		})
		state.delim = savedDelim
		// state.wrapBlock('    ', marker, node, () => state.renderContent(node))
		state.closeBlock(node)
	},
})

export default Comment

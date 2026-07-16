/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'

const CommentItem = Node.create({
	name: 'commentItem',
	content: 'block+',
	defining: true,

	addAttributes() {
		return {
			author: {
				default: '',
				parseHTML: (el) => el.getAttribute('data-author') ?? '',
				renderHTML: (attrs) => ({ 'data-author': attrs.author }),
			},
			authorLabel: {
				default: '',
				parseHTML: (el) => el.getAttribute('data-author-label') ?? '',
				renderHTML: (attrs) => ({ 'data-author-label': attrs.authorLabel }),
			},
			timestamp: {
				default: '',
				parseHTML: (el) => el.getAttribute('data-timestamp') ?? '',
				renderHTML: (attrs) => ({ 'data-timestamp': attrs.timestamp }),
			},
		}
	},

	parseHTML() {
		return [{ tag: 'div[data-type="comment-item"]' }]
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'comment-item' }),
			0,
		]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
	},
})

export default CommentItem

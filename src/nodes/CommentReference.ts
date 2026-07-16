/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'

const CommentReference = Node.create({
	name: 'commentReference',
	group: 'inline',
	inline: true,
	atom: true,

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
		return [{ tag: 'sup[data-type="comment-reference"]' }]
	},

	renderHTML({ node, HTMLAttributes }) {
		const id = node.attrs.referenceId
		return [
			'sup',
			mergeAttributes(HTMLAttributes, {
				'data-type': 'comment-reference',
				id: `cref-${id}`,
			}),
			[
				'a',
				{ href: `#c-${id}`, class: 'comment-ref', role: 'doc-noteref', title: id },
				'💬',
			],
		]
	},

	toMarkdown(state, node) {
		state.write(`[^${node.attrs.referenceId}]`)
	},
})

export default CommentReference

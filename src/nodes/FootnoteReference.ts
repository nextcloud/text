/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'

const FootnoteReference = Node.create({
	name: 'footnoteReference',
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
		return [{ tag: 'sup[data-type="footnote-reference"]' }]
	},

	renderHTML({ node, HTMLAttributes }) {
		const id = node.attrs.referenceId
		return [
			'sup',
			mergeAttributes(HTMLAttributes, { 'data-type': 'footnote-reference', id: `fnref-${id}` }),
			[
				'a',
				{ href: `#fn-${id}`, class: 'footnote-ref', role: 'doc-noteref' },
				`[${id}]`,
			],
		]
	},

	toMarkdown(state, node) {
		state.write(`[^${node.attrs.referenceId}]`)
	},
})

export default FootnoteReference

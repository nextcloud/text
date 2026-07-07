/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'

const Footnote = Node.create({
	name: 'footnote',
	content: 'block+',
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
		return [
			{
				tag: 'div[data-type="footnote"]',
				// Skip the label span; recurse into the body wrapper
				contentElement: (dom) => (dom as HTMLElement).querySelector('.footnote-body') ?? (dom as HTMLElement),
			},
		]
	},

	renderHTML({ node, HTMLAttributes }) {
		const id = node.attrs.referenceId
		return [
			'div',
			mergeAttributes(HTMLAttributes, { 'data-type': 'footnote', id: `fn-${id}` }),
			['span', { class: 'footnote-label', contenteditable: 'false' }, `[${id}]`],
			['div', { class: 'footnote-body' }, 0],
			['a', { href: `#fnref-${id}`, class: 'footnote-backref', contenteditable: 'false', 'aria-label': 'Back to reference' }, '↩'],
		]
	},

	toMarkdown(state, node) {
		const marker = `[^${node.attrs.referenceId}]: `
		const wrapper = ' '.repeat(marker.length)
		state.wrapBlock(wrapper, marker, node, () => state.renderContent(node))
		state.closeBlock(node)
	},
})

export default Footnote

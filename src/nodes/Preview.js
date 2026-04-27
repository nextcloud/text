/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Node, getMarkRange, getNodeType, isNodeActive } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import { domHref, isLinkToSelfWithHash, parseHref } from './../helpers/links.js'

import Preview from './Preview.vue'

export default Node.create({
	name: 'preview',

	group: 'block',

	content: 'text?',

	atom: true,

	marks: 'link',

	isolating: true,

	addOptions() {
		return {
			isEmbedded: false,
			relativePath: null,
		}
	},

	addAttributes() {
		return {
			href: { parseHTML: parseHref },
			title: { parseHTML: (el) => el.getAttribute('title') },
		}
	},

	parseHTML() {
		return [
			{
				tag: 'a[title="preview"]',
				priority: 1001,
			},
		]
	},

	renderHTML({ node }) {
		return [
			'a',
			{
				...node.attrs,
				href: domHref(node, this.options.relativePath),
				rel: 'noopener noreferrer nofollow',
			},
			0,
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(Preview)
	},

	toMarkdown: (state, node) => {
		state.write('[')
		state.text(node.textContent, false)
		state.write(`](${node.attrs.href} (${node.attrs.title}))`)
		state.closeBlock(node)
	},

	addCommands() {
		return {
			/**
			 * Turn a paragraph that contains a single link
			 * into a preview.
			 *
			 */
			setPreview:
				() =>
				({ state, chain }) => {
					if (!previewPossible(state)) {
						return false
					}

					const { $from } = state.selection

					if (!hasOtherContent($from.parent)) {
						// Paragraph contains only a link
						return chain()
							.setNode(
								this.name,
								previewAttributesFromSelection(state),
							)
							.run()
					}

					if ($from.parent.type.name !== 'paragraph') {
						return false
					}

					const previewAttrs = previewAttributesFromSelection(state)

					// Link is surrounded by other text in a paragraph
					const range = getMarkRange($from, state.schema.marks.link)
					if (!range) {
						return false
					}

					const hasContentBefore = range.from > $from.start()
					const hasContentAfter = range.to < $from.end()

					let c = chain()

					if (hasContentAfter) {
						c = c.setTextSelection(range.to).splitBlock()
					}
					if (hasContentBefore) {
						c = c.setTextSelection(range.from).splitBlock()
					} else {
						c = c.setTextSelection($from.before() + 1)
					}

					return c.setNode(this.name, previewAttrs).run()
				},

			/**
			 * Turn a preview back into a paragraph with a link.
			 *
			 */
			unsetPreview:
				() =>
				({ state, chain }) => {
					return (
						isActive(this.name, this.attributes, state)
						&& chain().setNode('paragraph').run()
					)
				},

			/**
			 * Insert a preview for given link.
			 *
			 * @param {string} link - the link URL
			 */
			insertPreview:
				(link) =>
				({ state, chain }) => {
					return chain()
						.insertContent({
							type: 'preview',
							attrs: { href: link, title: 'preview' },
							content: [
								{
									type: 'text',
									marks: [
										{
											type: 'link',
											attrs: { href: link },
										},
									],
									text: link,
								},
							],
						})
						.run()
				},
		}
	},
})

/**
 *
 * @param {object} state the editor state
 * @returns {object|null} the link node or null
 */
function getLinkAtCursor(state) {
	const { $from } = state.selection
	const range = getMarkRange($from, state.schema.marks.link)
	if (!range) {
		return null
	}
	return state.doc.resolve(range.from).nodeAfter
}

/**
 * Attributes for a preview from link in the current selection
 *
 * @param {object} state the edior state
 * @return {object}
 */
function previewAttributesFromSelection(state) {
	const linkNode = getLinkAtCursor(state)
	const href = extractHref(linkNode)
	return { href, title: 'preview' }
}

/**
 * Is the active node one of typeOrName with the given attributes
 * @param {object|string} typeOrName type or name of the preview node type
 * @param {object} attributes attributes of the node
 * @param {object} state current editor state
 * @return {boolean}
 */
function isActive(typeOrName, attributes, state) {
	const type = getNodeType(typeOrName, state.schema)
	return isNodeActive(state, type, attributes)
}

/**
 * Is it possible to convert the currently selected node into a preview?
 *
 * @param {object} state current editor state
 * @param {object} state.selection current selection
 * @return {boolean}
 */
function previewPossible(state) {
	const linkNode = getLinkAtCursor(state)
	const href = extractHref(linkNode)
	if (!href || isLinkToSelfWithHash(href)) {
		return false
	}
	return true
}

/**
 * Does the node contain more content than the first child
 * @param {object} node node to inspect
 * @return {boolean}
 */
function hasOtherContent(node) {
	return (
		node.childCount > 2
		|| (node.childCount === 2 && node.lastChild.textContent.trim())
	)
}

/**
 * Get the link href of the given node
 * @param {object} node to inspect
 * @return {string} The href of the link mark of the node
 */
function extractHref(node) {
	if (!node) {
		return undefined
	}
	const link = node.marks.find((mark) => mark.type.name === 'link')
	return link?.attrs.href
}

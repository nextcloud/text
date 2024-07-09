/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Node, isNodeActive, getNodeType } from '@tiptap/core'
import { domHref, parseHref, isLinkToSelfWithHash } from './../helpers/links.js'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

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
			title: { parseHTML: el => el.getAttribute('title') },
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
		return ['a', {
			...node.attrs,
			href: domHref(node, this.options.relativePath),
			rel: 'noopener noreferrer nofollow',
		}, 0]
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
			setPreview: () => ({ state, chain }) => {
				return previewPossible(state)
					&& chain()
						.setNode(this.name, previewAttributesFromSelection(state))
						.run()
			},

			/**
			 * Turn a preview back into a paragraph with a link.
			 *
			 */
			unsetPreview: () => ({ state, chain }) => {
				return isActive(this.name, this.attributes, state)
					&& chain()
						.setNode('paragraph')
						.run()
			},

			/**
			 * Insert a preview for given link.
			 *
			 * @param {string} link - the link URL
			 */
			insertPreview: (link) => ({ state, chain }) => {
				return chain()
					.insertContent({
						type: 'preview',
						attrs: { href: link, title: 'preview' },
						content: [{
							type: 'text',
							marks: [{
								type: 'link',
								attrs: { href: link },
							}],
							text: link,
						}],
					})
					.run()
			},
		}
	},
})

/**
 * Attributes for a preview from link in the current selection
 *
 * @param {object} state the edior state
 * @param {object} state.selection current selection
 * @return {object}
 */
function previewAttributesFromSelection({ selection }) {
	const { $from } = selection
	const href = extractHref($from.nodeAfter)
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
 * @param {object} state current editor state
 * @param {object} state.selection current selection
 * @return {boolean}
 */
function previewPossible({ selection }) {
	const { $from } = selection
	if (hasOtherContent($from.parent)) {
		return false
	}
	const href = extractHref($from.parent.firstChild)
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
	return node.childCount > 2
		|| (node.childCount === 2 && node.lastChild.textContent.trim())
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
	const link = node.marks.find(mark => mark.type.name === 'link')
	return link?.attrs.href
}

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import extractLinkParagraphs from './extractLinkParagraphs.js'
import Vue from 'vue'
import PreviewOptions from '../components/Editor/PreviewOptions.vue'

export const previewOptionsPluginKey = new PluginKey('linkParagraphMenu')

/**
 * Preview option decorations ProseMirror plugin
 * Add preview options to linkParagraphs.
 *
 * @param {object} options - options for the plugin
 * @param {object} options.editor - the tiptap editor
 *
 * @return {Plugin<DecorationSet>}
 */
export default function previewOptions({ editor }) {
	return new Plugin({
		key: previewOptionsPluginKey,

		state: {
			init(_, { doc }) {
				if (!editor.options.editable) {
					return { decorations: DecorationSet.create() }
				}
				const linkParagraphs = extractLinkParagraphs(doc)
				return {
					linkParagraphs,
					decorations: linkParagraphDecorations(doc, linkParagraphs, editor),
				}
			},
			apply(tr, value, _oldState, newState) {
				if (!tr.docChanged) {
					return value
				}
				if (!editor.options.editable) {
					return value
				}
				const linkParagraphs = extractLinkParagraphs(newState.doc)
				const decorations = mapDecorations(value, tr, linkParagraphs) || linkParagraphDecorations(newState.doc, linkParagraphs, editor)
				return { linkParagraphs, decorations }
			},
		},

		props: {
			decorations(state) {
				return this.getState(state).decorations
			},
		},
	})
}

/**
 * Map the previous deocrations to current document state
 *
 * Return false if previewParagraphs changes or decorations would get removed. The latter prevents
 * lost decorations in case of replacements.
 *
 * @param {object} value - previous plugin state
 * @param {object} tr - current transaction
 * @param {Array} linkParagraphs - array of linkParagraphs
 *
 * @return {false|DecorationSet}
 */
function mapDecorations(value, tr, linkParagraphs) {
	if (linkParagraphsChanged(linkParagraphs, value.linkParagraphs)) {
		return false
	}
	let removedDecorations = false
	const decorations = value.decorations.map(tr.mapping, tr.doc, { onRemove: () => { removedDecorations = true } })
	return removedDecorations
		? false
		: decorations
}

/**
 * Check if the linkParagraphs provided are equivalent.
 *
 * @param {Array} current - array of linkParagraphs
 * @param {Array} prev - linkParagraphs to compare against
 *
 * @return {boolean}
 */
function linkParagraphsChanged(current, prev) {
	return (current.length !== prev.length)
		|| current.some(isDifferentFrom(prev))
}

/**
 * Checks if linkParagraphs are different
 *
 * @param {Array} other - linkParagraphs to compare against
 *
 * Returns a function to be used to call to Array#some.
 * The returned function takes a linkParagraph and an index (as provided by iterators)
 */
const isDifferentFrom = (other) => (linkParagraph, i) => {
	return linkParagraph.type !== other[i].type
		|| linkParagraph.nodeSize !== other[i].nodeSize
}

/**
 * Create anchor decorations for the given linkParagraphs
 *
 * @param {Document} doc - prosemirror doc
 * @param {Array} linkParagraphs - linkParagraphs structure in the doc
 * @param {object} editor - tiptap editor
 *
 * @return {DecorationSet}
 */
function linkParagraphDecorations(doc, linkParagraphs, editor) {
	const decorations = linkParagraphs.map((linkParagraph) => decorationForLinkParagraph(linkParagraph, editor))
	return DecorationSet.create(doc, decorations)
}

/**
 * Create a decoration for the given linkParagraph
 *
 * @param {object} linkParagraph to decorate
 * @param {object} editor - tiptap editor
 *
 * @return {Decoration}
 */
function decorationForLinkParagraph(linkParagraph, editor) {
	return Decoration.widget(
		linkParagraph.offset + 1,
		previewOptionForLinkParagraph(linkParagraph, editor),
		{ side: -1 },
	)
}

/**
 * Create a previewOptions element for the given linkParagraph
 *
 * @param {object} linkParagraph - linkParagraph to generate anchor for
 * @param {object} editor - tiptap editor
 *
 * @return {Element}
 */
function previewOptionForLinkParagraph(linkParagraph, editor) {
	const propsData = {
		$editor: editor,
		...linkParagraph,
	}
	const el = document.createElement('div')
	const Component = Vue.extend(PreviewOptions)
	const previewOption = new Component({
		propsData,
	}).$mount(el)
	return previewOption.$el
}

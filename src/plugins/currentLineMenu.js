/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { EditorState, Plugin, PluginKey, Transaction } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Editor } from '@tiptap/core'
import Vue from 'vue'
import SmartPickerMenu from '../components/Editor/SmartPickerMenu.vue'

export const currentLineMenuKey = new PluginKey('currentLineMenu')

/**
 * Menu for the current line the cursor is on.
 * ProseMirror plugin providing a single decoration for the current line.
 *
 * @param {object} options - options for the plugin
 * @param {Editor} options.editor - the tiptap editor
 *
 * @return {Plugin<DecorationSet>}
 */
export default function currentLineMenu({ editor }) {
	return new Plugin({
		key: currentLineMenuKey,

		state: {
			init(_, state) {
				if (!editor.options.editable) {
					return { decorations: DecorationSet.empty }
				}
				const currentParagraph = getCurrentParagraph(state)
				return {
					currentParagraph,
					decorations: currentParagraphDecorations(
						state.doc,
						currentParagraph,
						editor,
					),
				}
			},
			apply(tr, value, _oldState, newState) {
				if (!editor.options.editable) {
					return { decorations: DecorationSet.empty }
				}
				const currentParagraph = getCurrentParagraph(newState)
				if (!currentParagraph) {
					return { decorations: DecorationSet.empty }
				}
				const decorations =
					mapDecorations(value, tr, currentParagraph) ||
					currentParagraphDecorations(
						newState.doc,
						currentParagraph,
						editor,
					)
				return { currentParagraph, decorations }
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
 * @param {Transaction} tr - current transaction
 * @param {object|undefined} currentParagraph - attributes of the current paragraph
 *
 * @return {false|DecorationSet}
 */
function mapDecorations(value, tr, currentParagraph) {
	if (value.currentParagraph?.pos !== currentParagraph.pos) {
		return false
	}
	let removedDecorations = false
	const decorations = value.decorations.map(tr.mapping, tr.doc, {
		onRemove: () => {
			removedDecorations = true
		},
	})
	return removedDecorations ? false : decorations
}

/**
 * Get the paragraph node the cursor is on.
 *
 * @param {EditorState} state - the prosemirror state
 * @return {object|undefined} - the current paragraph if the cursor is in one
 */
function getCurrentParagraph({ selection }) {
	const { parent, depth } = selection.$anchor
	// handle invalid cursor position
	if (depth > 1) {
		return false
	}
	const pos = depth === 0 ? 0 : selection.$anchor.before()
	const isRootDepth = depth === 1
	const noLinkPickerYet = !parent.textContent.match(/(^| )\/$/)
	if (
		isRootDepth &&
		noLinkPickerYet &&
		selection.empty &&
		parent.isTextblock &&
		!parent.type.spec.code
	) {
		return { pos }
	}
}

/**
 * Create a menu decorations for the given paragraph
 *
 * @param {Document} doc - prosemirror doc
 * @param {object} currentParagraph - paragraph to decorate
 * @param {Editor} editor - tiptap editor
 *
 * @return {DecorationSet}
 */
function currentParagraphDecorations(doc, currentParagraph, editor) {
	if (!currentParagraph) {
		return DecorationSet.empty
	}
	const decorations = [decorationForCurrentParagraph(currentParagraph, editor)]
	return DecorationSet.create(doc, decorations)
}

/**
 * Create a decoration for the currentParagraph
 *
 * @param {object} currentParagraph to decorate
 * @param {Editor} editor - tiptap editor
 *
 * @return {Decoration}
 */
function decorationForCurrentParagraph(currentParagraph, editor) {
	return Decoration.widget(
		currentParagraph.pos + 1,
		menuForCurrentParagraph(editor),
		{ side: -1 },
	)
}

/**
 * Create a menu element for the given currentParagraph
 *
 * @param {Editor} editor - tiptap editor
 *
 * @return {Element}
 */
function menuForCurrentParagraph(editor) {
	const el = document.createElement('div')
	const Component = Vue.extend(SmartPickerMenu)
	const menu = new Component()
	menu.$mount(el)
	menu.$on('open-smart-picker', () => {
		const { selection } = editor.state
		const { textContent } = selection.$anchor.parent
		const eol = selection.$anchor.end()
		const chain = editor.chain().focus().setTextSelection(eol)
		if (textContent.trim() === '') {
			chain.insertContent('/').run()
		} else {
			chain.splitBlock().insertContent('/').run()
		}
	})
	return menu.$el
}

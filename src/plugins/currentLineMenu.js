/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Plugin, PluginKey, EditorState } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import Vue from 'vue'
import SmartPickerMenu from '../components/Editor/SmartPickerMenu.vue'

export const currentLineMenuKey = new PluginKey('currentLineMenu')

/**
 * Menu for the current line the cursor is on.
 * ProseMirror plugin providing a single decoration for the current line.
 *
 * @param {object} options - options for the plugin
 * @param {object} options.editor - the tiptap editor
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
					decorations: currentParagraphDecorations(state.doc, currentParagraph, editor),
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
				const decorations = (value.currentParagraph?.index === currentParagraph.index)
					? value.decorations.map(tr.mapping, tr.doc)
					: currentParagraphDecorations(newState.doc, currentParagraph, editor)
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
 * Get the paragraph node the cursor is on.
 *
 * @param {EditorState} state - the prosemirror state
 * @return {Node|undefined} - the current paragraph if the cursor is in one
 */
function getCurrentParagraph({ selection }) {
	const { parent, depth } = selection.$anchor
	const isRootDepth = depth === 1
	const noLinkPickerYet = !parent.textContent.match(/(^| )\/$/)
	return isRootDepth
		&& noLinkPickerYet
		&& selection.empty
		&& parent.isTextblock
		&& !parent.type.spec.code
		&& { pos: selection.$anchor.before(), index: selection.$anchor.index(0) }
}

/**
 * Create a menu decorations for the given paragraph
 *
 * @param {Document} doc - prosemirror doc
 * @param {Node} currentParagraph - paragraph to decorate
 * @param {object} editor - tiptap editor
 *
 * @return {DecorationSet}
 */
function currentParagraphDecorations(doc, currentParagraph, editor) {
	const decorations = [decorationForCurrentParagraph(currentParagraph, editor)]
	return DecorationSet.create(doc, decorations)
}

/**
 * Create a decoration for the currentParagraph
 *
 * @param {object} currentParagraph to decorate
 * @param {object} editor - tiptap editor
 *
 * @return {Decoration}
 */
function decorationForCurrentParagraph(currentParagraph, editor) {
	return Decoration.widget(
		currentParagraph.pos + 1,
		menuForCurrentParagraph(currentParagraph, editor),
		{ side: -1 },
	)
}

/**
 * Create a menu element for the given currentParagraph
 *
 * @param {object} currentParagraph - currentParagraph to generate menu for
 * @param {object} editor - tiptap editor
 *
 * @return {Element}
 */
function menuForCurrentParagraph(currentParagraph, editor) {
	const propsData = {
		$editor: editor,
		...currentParagraph,
	}
	const el = document.createElement('div')
	const Component = Vue.extend(SmartPickerMenu)
	const menu = new Component({
		propsData,
	}).$mount(el)
	menu.$on('open-smart-picker', () => {
		const { selection } = editor.state
		const { textContent } = selection.$anchor.parent
		const eol = selection.$anchor.end()
		const contentToInsert = textContent.match(/(^| )$/) ? '/' : ' /'
		editor.chain()
			.focus()
			.setTextSelection(eol)
			.insertContent(contentToInsert)
			.run()
	})
	return menu.$el
}

/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createMarkdownSerializer } from '../extensions/Markdown'
import { Editor } from '@tiptap/core'

import Document from '@tiptap/extension-document'
import Paragraph from '../nodes/Paragraph'
import Text from '@tiptap/extension-text'

import createEditor from '../EditorFactory'
import markdownit from '../markdownit'

export function createCustomEditor({ content, extensions }) {
	return new Editor({
		content,
		extensions: [
			Document,
			Paragraph,
			Text,
			...extensions,
		]
	})
}

/**
 * Ease markdown through TipTap editor and return serialized markdown
 *
 * @param {string} markdown
 * @returns {string}
 */
export function markdownThroughEditor(markdown) {
	const tiptap = createEditor({
		enableRichEditing: true
	})
	tiptap.commands.setContent(markdownit.render(markdown))
	const serializer = createMarkdownSerializer(tiptap.schema)
	return serializer.serialize(tiptap.state.doc)
}

/**
 * Ease HTML as input through the Editor and return the serialized markdown
 *
 * @param {string} html
 * @returns {string}
 */
export function markdownThroughEditorHtml(html) {
	const tiptap = createEditor({
		enableRichEditing: true
	})
	tiptap.commands.setContent(html)
	const serializer = createMarkdownSerializer(tiptap.schema)
	return serializer.serialize(tiptap.state.doc)
}

/**
 * Paste HTML into the Editor and return the serialized markdown
 *
 * @param {string} html
 * @returns {string}
 */
export function markdownFromPaste(html) {
	const tiptap = createEditor({
		enableRichEditing: true
	})
	tiptap.commands.insertContent(html)
	const serializer = createMarkdownSerializer(tiptap.schema)
	return serializer.serialize(tiptap.state.doc)
}

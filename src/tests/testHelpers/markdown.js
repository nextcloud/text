/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createRichEditor } from '../../EditorFactory.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import markdownit from '../../markdownit/index.js'

/**
 * Ease markdown through TipTap editor and return serialized markdown
 *
 * @param {string} markdown to process
 * @return {string}
 */
export function markdownThroughEditor(markdown) {
	const tiptap = createRichEditor()
	tiptap.commands.setContent(markdownit.render(markdown))
	const serializer = createMarkdownSerializer(tiptap.schema)
	const serializedMarkdown = serializer.serialize(tiptap.state.doc)
	tiptap.destroy()
	return serializedMarkdown
}

/**
 * Ease HTML as input through the Editor and return the serialized markdown
 *
 * @param {string} html to process
 * @return {string}
 */
export function markdownThroughEditorHtml(html) {
	const tiptap = createRichEditor()
	tiptap.commands.setContent(html)
	const serializer = createMarkdownSerializer(tiptap.schema)
	const markdown = serializer.serialize(tiptap.state.doc)
	tiptap.destroy()
	return markdown
}

/**
 * Paste HTML into the Editor and return the serialized markdown
 *
 * @param {string} html to paste
 * @return {string}
 */
export function markdownFromPaste(html) {
	const tiptap = createRichEditor()
	tiptap.commands.insertContent(html)
	const serializer = createMarkdownSerializer(tiptap.schema)
	const markdown = serializer.serialize(tiptap.state.doc)
	tiptap.destroy()
	return markdown
}

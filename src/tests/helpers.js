import { Editor } from '@tiptap/core'
import { serializeEditorContent } from '../extensions/Serializer'

import Document from '@tiptap/extension-document'
import Paragraph from '../nodes/Paragraph'
import Text from '@tiptap/extension-text'

import { createRichEditor } from '../EditorFactory'
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
	const tiptap = createRichEditor()
	tiptap.commands.setContent(markdownit.render(markdown))
	return serializeEditorContent(tiptap)
}

/**
 * Ease HTML as input through the Editor and return the serialized markdown
 *
 * @param {string} html
 * @returns {string}
 */
export function markdownThroughEditorHtml(html) {
	const tiptap = createRichEditor()
	tiptap.commands.setContent(html)
	return serializeEditorContent(tiptap)
}

/**
 * Paste HTML into the Editor and return the serialized markdown
 *
 * @param {string} html
 * @returns {string}
 */
export function markdownFromPaste(html) {
	const tiptap = createRichEditor()
	tiptap.commands.insertContent(html)
	return serializeEditorContent(tiptap)
}

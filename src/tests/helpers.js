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
		content: markdownit.render(markdown),
		enableRichEditing: true
	})
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
		content: html,
		enableRichEditing: true
	})
	const serializer = createMarkdownSerializer(tiptap.schema)
	return serializer.serialize(tiptap.state.doc)
}

import { Editor } from '@tiptap/core'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import Paragraph from '../../src/nodes/Paragraph.js'

export const createCustomEditor = ({ content, extensions }) => {
	return new Editor({
		content,
		extensions: [Document, Paragraph, Text, ...extensions],
	})
}

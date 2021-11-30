import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

export default function({ content, extensions }) {
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

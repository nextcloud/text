import type { Extensions } from '@tiptap/core'
import type { Doc } from 'yjs'

import { Editor } from '@tiptap/core'
import Collaboration from '@tiptap/extension-collaboration'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import { builders } from 'prosemirror-test-builder'
import { test as baseTest, expect } from 'vitest'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import Markdown from '../../extensions/Markdown.js'
import RichText from '../../extensions/RichText.ts'
import markdownit from '../../markdownit/index.js'
import EditableTable from '../../nodes/EditableTable.js'
import Paragraph from '../../nodes/Paragraph.js'
import { createDocumentString } from './createDocumentString.ts'

export default baseTest.extend<{
	editor: Editor
	extensions: Extensions // overwrite to add extensions to the defaults
	allExtensions: Extensions // overwrite to replace all extensions
	markdownThroughEditor: (input: string) => string
	markdownThroughEditorHtml: (input: string) => string
	serializeMarkdown: () => string
	expectDocument: (doc: Node) => void
	ydoc?: Doc // set to enable collaborative editing
}>({
	extensions: [],
	ydoc: undefined,
	editor: async ({ allExtensions }, use) => {
		const editor = new Editor({ extensions: allExtensions })
		await use(editor)
		editor.destroy()
	},
	allExtensions: async ({ extensions, ydoc }, use) => {
		if (extensions.length === 0) {
			await use([
				RichText.configure({
					editing: false,
					extensions: [
						...(ydoc ? [Collaboration.configure({ document: ydoc })] : []),
						EditableTable,
					],
				}),
			])
		} else {
			await use([Markdown, Document, Text, Paragraph, ...extensions])
		}
	},
	markdownThroughEditor: async ({ editor, serializeMarkdown }, use) => {
		await use((markdown: string) => {
			const content = markdownit.render(markdown)
			editor.commands.setContent(content)
			return serializeMarkdown()
		})
	},
	markdownThroughEditorHtml: async ({ editor, serializeMarkdown }, use) => {
		await use((content: string) => {
			editor.commands.setContent(content)
			return serializeMarkdown()
		})
	},
	serializeMarkdown: async ({ editor }, use) => {
		await use(() => {
			const serializer = createMarkdownSerializer(editor.schema)
			return serializer.serialize(editor.state.doc)
		})
	},

	/**
	 * Compare given document from editor with builders
	 *
	 * @param expected The expected document
	 * @example
	 * expectDocument(table(
	 *   tr(
	 *     td('foo')
	 *   )
	 * ))
	 */
	expectDocument: async ({ editor }, use) => {
		use((expected: Node) => {
			expect(typeof expected).toBe('object')
			const { doc, p } = builders(editor.schema, { p: { nodeType: 'paragraph' } })
			expect(createDocumentString(editor.state.doc))
				.toBe(createDocumentString(doc(expected, p())))
		})
	},
})

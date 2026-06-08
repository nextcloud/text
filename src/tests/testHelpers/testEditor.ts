import type { Editor, Extensions } from '@tiptap/core'

import { test as baseTest } from 'vitest'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import markdownit from '../../markdownit/index.js'
import createCustomEditor from './createCustomEditor.js'

export default baseTest.extend<{
	editor: Editor
	extensions: Extensions
	markdownThroughEditor: (input: string) => string
	serializeMarkdown: () => string
}>({
	editor: async ({ extensions }, use) => {
		const editor = createCustomEditor('', extensions)
		await use(editor)
		editor.destroy()
	},
	extensions: [],
	markdownThroughEditor: async ({ editor, serializeMarkdown }, use) => {
		use((markdown: string) => {
			const content = markdownit.render(markdown)
			editor.commands.setContent(content)
			return serializeMarkdown()
		})
	},
	serializeMarkdown: async ({ editor }, use) => {
		use(() => {
			const serializer = createMarkdownSerializer(editor.schema)
			return serializer.serialize(editor.state.doc)
		})
	},
})

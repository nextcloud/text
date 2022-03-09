import { createEditor } from './../EditorFactory'
import { createMarkdownSerializer } from './../extensions/Markdown'
import markdownit from './../markdownit'
import input from './fixtures/table.md'
import output from './fixtures/table.html'
import otherStructure from './fixtures/tableWithOtherStructure.html'

describe('Table', () => {

	test('load into editor', () => {
		const tiptap = editorWithContent(markdownit.render(input))
		expect(tiptap.getHTML().replaceAll('><', ">\n<")).toBe(output.replace(/\n$/, ''))
	})

	test('serialize from editor', () => {
		const tiptap = editorWithContent(markdownit.render(input))
		const serializer = createMarkdownSerializer(tiptap.schema)
		expect(serializer.serialize(tiptap.state.doc)).toBe(input.replace(/\n$/, ''))
	})

	test('handle html table with other structure', () => {
		const tiptap = editorWithContent(
			otherStructure.replace(/\n\s*/g,'')
		)
		expect(tiptap.getHTML().replaceAll('><', ">\n<")).toBe(output.replace(/\n$/, ''))
	})

})

function editorWithContent(content) {
	return createEditor({
		content,
		enableRichEditing: true
	})
}


import { createEditor } from '../../EditorFactory'
import { createMarkdownSerializer } from '../../extensions/Markdown'
import markdownit from '../../markdownit'
import input from '../fixtures/table.md'
import output from '../fixtures/tables/basic.out.html'
import otherStructure from '../fixtures/tableWithOtherStructure.html'
import handbook from '../fixtures/tables/handbook.html'
import handbookOut from '../fixtures/tables/handbook.out.html'

describe('Table', () => {

	test('load into editor', () => {
		const tiptap = editorWithContent(markdownit.render(input))
		expect(formatHTML(tiptap.getHTML())).toBe(formatHTML(output))
	})

	test('serialize from editor', () => {
		const tiptap = editorWithContent(markdownit.render(input))
		const serializer = createMarkdownSerializer(tiptap.schema)
		expect(serializer.serialize(tiptap.state.doc)).toBe(input)
	})

	test('handle html table with other structure', () => {
		const tiptap = editorWithContent(
			otherStructure.replace(/\n\s*/g,'')
		)
		expect(formatHTML(tiptap.getHTML())).toBe(formatHTML(output))
	})

	test('handle html table from handbook', () => {
		const tiptap = editorWithContent(
			handbook.replace(/\n\s*/g,'')
		)
		expect(formatHTML(tiptap.getHTML())).toBe(formatHTML(handbookOut))
	})

})

function editorWithContent(content) {
	return createEditor({
		content,
		enableRichEditing: true
	})
}

function formatHTML(html) {
	return html.replaceAll('><', ">\n<").replace(/\n$/, '')
}

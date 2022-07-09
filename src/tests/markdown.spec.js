import { createEditor } from './../EditorFactory';
import { createMarkdownSerializer } from './../extensions/Markdown'
import spec from "./fixtures/spec"
import markdownit from './../markdownit'
import { typesAvailable } from './../markdownit/callouts'

const markdownThroughEditor = (markdown) => {
	const tiptap = createEditor({
		content: markdownit.render(markdown),
		enableRichEditing: true
	})
	const serializer = createMarkdownSerializer(tiptap.schema)
	return serializer.serialize(tiptap.state.doc)
}

const markdownThroughEditorHtml = (html) => {
	const tiptap = createEditor({
		content: html,
		enableRichEditing: true
	})
	const serializer = createMarkdownSerializer(tiptap.schema)
	return serializer.serialize(tiptap.state.doc)
}

/**
 * Commonmark: Test integrity of parsing and serializing commonmark markdown
 */
describe('Parsing Commonmark', () => {
	const skippedMarkdownTests = [];

	spec.forEach((entry) => {
		// We have HTML disabled
		if (entry.section === "Raw HTML" || entry.markdown.includes("<") || skippedMarkdownTests.indexOf(entry.example) !== -1) {
			return
		}
	
		test('commonmark ' + entry.example, () => {
			/* We should not modify the markdown syntacticly, it is a bit complex to test.
			   If we compare our tiptap HTML and the entry.html it will fail
			     as we e.g. add attributes to HTML nodes (IDs to headings ...).
			   We could also compare markdownThroughEditor with the entry.markdown,
			     but this will fail because there are markdown repesentations that lead to the same HTML output
				 e.g. code spans containing a newline are converted to spaces, so `a\nb` is equal to `a b`.
			   The only robust solution is to test if the resulting markdown is equal,
			     this is done by comparing the HTML representation of the orignal markdown and the one
			     of the markdown after it ran through the editor
			*/
			const rendered = markdownit.render(entry.markdown)
			expect(markdownit.render(markdownThroughEditorHtml(rendered))).toBe(rendered)
		})
	})
})


/**
 * Test integrity of parsing and serializing the extended markdown
 * This is used to test our extensions (like TaskLists, Callouts...) 
 */
 describe('Commonmark extensions', () => {
	test('strikethrough', () => {
		const html = '<p><s>Text</s></p>'
		const md = '~~Text~~'
		expect(markdownThroughEditorHtml(html)).toBe(md)
	})

	test('Underline', () => {
		const html = '<p><u>Text</u></p>'
		const md = '__Text__'
		expect(markdownThroughEditorHtml(html)).toBe(md)
	})

	test('checkboxes', () => {
		expect(markdownThroughEditor('- [ ] [asd](sdf)')).toBe('* [ ] [asd](sdf)')
		expect(markdownThroughEditor('- [x] [asd](sdf)')).toBe('* [x] [asd](sdf)')
		expect(markdownThroughEditor('- [ [asd](sdf)')).toBe('* [ [asd](sdf)')
		expect(markdownThroughEditor('- [ ] asd')).toBe('* [ ] asd')
		expect(markdownThroughEditor('- [ ] foo\n- [x] bar')).toBe('* [ ] foo\n* [x] bar')
		expect(markdownThroughEditor('- [x] foo\n' +
			'  - [ ] bar\n' +
			'  - [x] baz\n' +
			'- [ ] bim')).toBe('* [x] foo\n' +
				'  * [ ] bar\n' +
				'  * [x] baz\n' +
				'* [ ] bim')
		expect(markdownThroughEditor('- [X] asd')).toBe('* [x] asd')
		expect(markdownThroughEditor('- [\t] asd')).toBe('* [ ] asd')
		expect(markdownThroughEditor('- [  ] asd')).toBe('* [ ] asd')
		expect(markdownThroughEditor('-   [X] asd')).toBe('* [x] asd')
		expect(markdownThroughEditor('- [F] asd')).toBe('* [F] asd')

		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><label>foo</label></li></ul>')).toBe('* [x] foo')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" /><label>test</label></li></ul>')).toBe('* [ ] test')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><div><h2>Test</h2><p><strong>content</strong></p></div></li></ul>')).toBe('* [x] Test\n\n  **content**')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><p>Test</p><h1>Block level headline</h1></li></ul>')).toBe('* [x] Test\n\n  # Block level headline')
	})

	test('table', () => {
		// ...
	})

	test('Task lists', () => {
		// ...
	})

	test('callouts', () => {
		typesAvailable.forEach(type => {
			const entry = `::: ${type}\n!${type}!\n\njust do it\n\n:::`
			expect(markdownThroughEditor(entry)).toBe(entry)
	
			expect(markdownThroughEditorHtml(
				`<div data-callout="${type}" class="callout callout-${type}"><p>!${type}!</p>just do it<p></p></div>`
			)).toBe(`::: ${type}\n!${type}!\n\njust do it\n\n:::`)
			expect(markdownThroughEditorHtml(
				`<p class="callout ${type}">!${type}!</p>`
			)).toBe(`::: ${type}\n!${type}!\n\n:::`)
		})
	})

	test('callouts with handbook classes', () => {
		expect(markdownThroughEditorHtml(
			`<p class="callout warning">!warning!</p>`
		)).toBe(`::: warn\n!warning!\n\n:::`)
	})
})

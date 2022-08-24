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

describe('Commonmark', () => {
	beforeAll(() => {
		// Make sure html tests pass
		// entry.section === 'HTML blocks' || entry.section === 'Raw HTML'
		markdownit.set({ html: true})
	})
	afterAll(() => {
		markdownit.set({ html: false})
	})

	// failures because of some additional newline in markdownit
	const skippedMarkdownTests = [
		187, 209, 210
	];

	spec.forEach((entry) => {
		if (skippedMarkdownTests.indexOf(entry.example) !== -1) {
			return
		}
		test('commonmark ' + entry.example, () => {
			const expected = entry.markdown.includes('__')
				? entry.html.replace(/<strong>/g, '<u>').replace(/<\/strong>/g, '</u>')
				: entry.html
			try {
				// Ignore special markup for untouched markdown
				expect(markdownit.render(entry.markdown).replace(/<span class="keep-md">([^<]+)<\/span>/g, '$1')).toBe(expected)
			} catch {
				// Header anchors
				expect(markdownit.render(entry.markdown).replace(/ id=\"[^\"]*\" tabindex=\"-1\"/g, '')).toBe(expected)
			}
		})
	})
})

describe('Markdown though editor', () => {
	test('headlines', () => {
		expect(markdownThroughEditor('# Test')).toBe('# Test')
		expect(markdownThroughEditor('## Test')).toBe('## Test')
		expect(markdownThroughEditor('### Test')).toBe('### Test')
		expect(markdownThroughEditor('#### Test')).toBe('#### Test')
		expect(markdownThroughEditor('##### Test')).toBe('##### Test')
	})
	test('hard breaks', () => {
		expect(markdownThroughEditor('hard  \nbreak')).toBe('hard  \nbreak')
		expect(markdownThroughEditor('hard\\\nbreak')).toBe('hard  \nbreak')
		expect(markdownThroughEditor('soft\nbreak')).toBe('soft\nbreak')
	})
	test('inline format', () => {
		expect(markdownThroughEditor('**Test**')).toBe('**Test**')
		expect(markdownThroughEditor('__Test__')).toBe('__Test__')
		expect(markdownThroughEditor('_Test_')).toBe('*Test*')
		expect(markdownThroughEditor('~~Test~~')).toBe('~~Test~~')
		expect(markdownThroughEditor('Have an `inline code` element')).toBe('Have an `inline code` element')
	})
	test('ul', () => {
		expect(markdownThroughEditor('- foo\n- bar')).toBe('* foo\n* bar')
		expect(markdownThroughEditor('- foo\n\n- bar')).toBe('* foo\n* bar')
		expect(markdownThroughEditor('- foo\n\n\n- bar')).toBe('* foo\n* bar')
	})
	test('ol', () => {
		expect(markdownThroughEditor('1. foo\n2. bar')).toBe('1. foo\n2. bar')
	})
	test('paragraph', () => {
		// Test whitespace characters are untouched
		expect(markdownThroughEditor('foo\nbar\n\nfoobar\nfoo\tbar')).toBe('foo\nbar\n\nfoobar\nfoo\tbar')
	})
	test('links', () => {
		expect(markdownThroughEditor('[test](foo)')).toBe('[test](foo)')
		expect(markdownThroughEditor('[test](foo "bar")')).toBe('[test](foo "bar")')
		// Issue #2703
		expect(markdownThroughEditor('[bar\\\\]: /uri\n\n[bar\\\\]')).toBe('[bar\\\\](/uri)')
	})
	test('images', () => {
		expect(markdownThroughEditor('![test](foo)')).toBe('![test](foo)')
	})
	test('special characters', () => {
		expect(markdownThroughEditor('"\';&.-#><')).toBe('"\';&.-#><')
	})
	test('code block', () => {
		expect(markdownThroughEditor('```\n<?php echo "Hello World";\n```')).toBe('```\n<?php echo "Hello World";\n```')
	})
	test('markdown untouched', () => {
		// Issue #2703
		expect(markdownThroughEditor('[bar\\\\]: /uri\n\n[bar\\\\]')).toBe('[bar\\\\](/uri)')
		expect(markdownThroughEditor('## Test \\')).toBe('## Test \\')
		expect(markdownThroughEditor('- [ [asd](sdf)')).toBe('* [ [asd](sdf)')
	})
	test('checkboxes', () => {
		// Invalid ones but should be syntactical unchanged
		expect(markdownThroughEditor('- [F] asd')).toBe('* [F] asd')
		expect(markdownThroughEditor('- [ [asd](sdf)')).toBe('* [ [asd](sdf)')
		// Valid, whitespace is allowed inside the checkbox
		expect(markdownThroughEditor('- [\t] asd')).toBe('* [ ] asd')
		expect(markdownThroughEditor('- [ ] asd')).toBe('* [ ] asd')
		// Valid ones
		expect(markdownThroughEditor('- [ ] [asd](sdf)')).toBe('* [ ] [asd](sdf)')
		expect(markdownThroughEditor('- [x] [asd](sdf)')).toBe('* [x] [asd](sdf)')
		expect(markdownThroughEditor('- [ ] foo\n- [x] bar')).toBe('* [ ] foo\n* [x] bar')
		expect(markdownThroughEditor('- [x] foo\n' +
			'  - [ ] bar\n' +
			'  - [x] baz\n' +
			'- [ ] bim')).toBe('* [x] foo\n' +
				'  * [ ] bar\n' +
				'  * [x] baz\n' +
				'* [ ] bim')
		expect(markdownThroughEditor('- [X] asd')).toBe('* [x] asd')
		expect(markdownThroughEditor('-   [X] asd')).toBe('* [x] asd')

		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><label>foo</label></li></ul>')).toBe('* [x] foo')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" /><label>test</label></li></ul>')).toBe('* [ ] test')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><div><h2>Test</h2><p><strong>content</strong></p></div></li></ul>')).toBe('* [x] Test\n\n  **content**')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><p>Test</p><h1>Block level headline</h1></li></ul>')).toBe('* [x] Test\n\n  # Block level headline')
	})

	test('horizontal rule', () => {
		expect(markdownThroughEditor('foo\n\n---\n\nfoobar')).toBe('foo\n\n---\n\nfoobar')
	})

	test('escaping', () => {
		const test = '(Asdf [asdf asdf](asdf asdf) asdf asdf asdf asdf asdf asdf asdf asdf asdf)\n' +
			'\n' +
			'* [asdf asdf asdf/asdf](Asdf Asdf)\n' +
			'* asdf asdf asdf [a--f asdf asdf](a--f Asdf Asdf)\n' +
			'* [Asdf asdf asdf asdf asdf asdf](Asdf asdf)'
		expect(markdownThroughEditor(test)).toBe(test)
		expect(markdownThroughEditor('This is a [test] for escaping')).toBe('This is a [test] for escaping')
		expect(markdownThroughEditor('This is a [test for escaping')).toBe('This is a [test for escaping')
	})

	test('callouts', () => {
		typesAvailable.forEach(type => {
			const entry = `::: ${type}\n!${type}!\n\njust do it\n\n:::`
			expect(markdownThroughEditor(entry)).toBe(entry)
		})
	})
})

describe('Markdown serializer from html', () => {
	test('paragraph', () => {
		expect(markdownThroughEditorHtml('<p>hello</p><p>world</p>')).toBe('hello\n\nworld')
	})
	test('hard line breaks', () => {
		expect(markdownThroughEditorHtml('<p>hard<br />break</p>')).toBe('hard  \nbreak')
		expect(markdownThroughEditorHtml('<p>hard<br>break</p>')).toBe('hard  \nbreak')
		expect(markdownThroughEditorHtml('<p>soft\nbreak</p>')).toBe('soft\nbreak')
	})
	test('links', () => {
		expect(markdownThroughEditorHtml('<a href="foo">test</a>')).toBe('[test](foo)')
	})
	test('images', () => {
		expect(markdownThroughEditorHtml('<img src="image" alt="description" />')).toBe('![description](image)')
		expect(markdownThroughEditorHtml('<p><img src="image" alt="description" /></p>')).toBe('![description](image)')
	})
	test('checkboxes', () => {
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><label>foo</label></li></ul>')).toBe('* [x] foo')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" /><label>test</label></li></ul>')).toBe('* [ ] test')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><div><h2>Test</h2><p><strong>content</strong></p></div></li></ul>')).toBe('* [x] Test\n\n  **content**')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><p>Test</p><h1>Block level headline</h1></li></ul>')).toBe('* [x] Test\n\n  # Block level headline')
	})

	test('callouts', () => {
		typesAvailable.forEach(type => {
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

	test('front matter', () => {
		expect(markdownThroughEditorHtml('<pre id="frontmatter"><code>some: value</code></pre><h1>Heading</h1>')).toBe('---\nsome: value\n---\n\n# Heading')
		// Test --- within front matter is allowed
		expect(markdownThroughEditorHtml('<pre id="frontmatter"><code>---</code></pre><h1>Heading</h1>')).toBe('----\n---\n----\n\n# Heading')
	})
})

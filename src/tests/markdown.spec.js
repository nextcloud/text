import spec from "./fixtures/spec"
import markdownit from './../markdownit'
import { typesAvailable } from './../markdownit/callouts'
import { markdownThroughEditor, markdownThroughEditorHtml } from "./helpers";
import { createMarkdownSerializer } from "../extensions/Markdown";
import createEditor from "../EditorFactory";

/*
 * This file is for various markdown tests, mainly testing if input and output stays the same.
 *
 * Please add test belonging to some Node or Mark to the corresponding file in './nodes/` or `./marks/`
 */

describe('Commonmark', () => {
	const skippedMarkdownTests = [
		// we interpret this as front matter
		96, 98,
		// contain HTML
		21, 31, 201, 344, 474, 475, 476, 490, 493, 523, 535, 642, 643,
		// contain comments
		309, 308,
	];

	const normalize = (str) => {
		// https://github.com/markdown-it/markdown-it/blob/df4607f1d4d4be7fdc32e71c04109aea8cc373fa/test/commonmark.js#L10
		return str.replace(/<blockquote><\/blockquote>/g, '<blockquote>\n</blockquote>')
			.replace(/<span class="keep-md">([^<]+)<\/span>/g, '$1')
			.replace(/<br data-syntax=".{1,2}" \/>/g, '<br />\n')
			.replace(/<ul data-bullet="."/g, '<ul')
	}

	// special treatment because we use markdown-it-image-figures
	const figureImageMarkdownTests = [
		516, 519, 530, 571, 572, 573, 574, 575, 576, 577, 579, 580, 581, 582, 583, 584, 585, 587, 588, 590
	]

	spec.forEach((entry) => {
		// We do not support HTML
		if (entry.section === 'HTML blocks' || entry.section === 'Raw HTML') return;

		if (skippedMarkdownTests.indexOf(entry.example) !== -1) {
			return
		}

		test('commonmark parsing ' + entry.example, () => {
			let expected = entry.markdown.includes('__')
				? entry.html.replace(/<strong>/g, '<u>').replace(/<\/strong>/g, '</u>')
				: entry.html
			if (figureImageMarkdownTests.indexOf(entry.example) !== -1) {
				expected = expected.replace(/<p>/g, '<figure>').replace(/<\/p>/g, '</figure>')
			}

			const rendered = markdownit.render(entry.markdown)

			// Ignore special markup for untouched markdown
			expect(normalize(rendered)).toBe(expected)
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
		expect(markdownThroughEditor('hard\\\nbreak')).toBe('hard\\\nbreak')
		expect(markdownThroughEditor('mixed\\\nhard  \nbreak')).toBe('mixed\\\nhard  \nbreak')
		expect(markdownThroughEditor('hard<br>break')).toBe('hard<br />break')
		expect(markdownThroughEditor('hard<br />break')).toBe('hard<br />break')
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
		expect(markdownThroughEditor('+ foo\n+ bar')).toBe('+ foo\n+ bar')
		expect(markdownThroughEditor('* foo\n* bar')).toBe('* foo\n* bar')
		expect(markdownThroughEditor('- foo\n- bar')).toBe('- foo\n- bar')
		expect(markdownThroughEditor('- foo\n\n- bar')).toBe('- foo\n- bar')
		expect(markdownThroughEditor('- foo\n\n\n- bar')).toBe('- foo\n- bar')
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
		// Inline images
		expect(markdownThroughEditor('text ![test](foo) moretext')).toBe('text ![test](foo) moretext')
		// regression introduced in #3282. See issue #3428.
		expect(markdownThroughEditor('![test](foo)')).toBe('![test](foo)')
		expect(markdownThroughEditor('Hello\n\n![test](foo)')).toBe('Hello\n\n![test](foo)')
	})
	test('special characters', () => {
		expect(markdownThroughEditor('"\';&.-#><')).toBe('"\';&.-#><')
	})
	test('code block', () => {
		expect(markdownThroughEditor('```\n<?php echo "Hello World";\n```')).toBe('```\n<?php echo "Hello World";\n```')
		// Issue #3328
		expect(markdownThroughEditor('```python\nprint("Hello World")\n```')).toBe('```python\nprint("Hello World")\n```')
		// Issue #3739
		expect(markdownThroughEditor('```\n```')).toBe('```\n```')
	})
	test('markdown untouched', () => {
		// Issue #2703
		expect(markdownThroughEditor('[bar\\\\]: /uri\n\n[bar\\\\]')).toBe('[bar\\\\](/uri)')
		expect(markdownThroughEditor('## Test \\')).toBe('## Test \\')
		expect(markdownThroughEditor('- [ [asd](sdf)')).toBe('- [ [asd](sdf)')
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

	test('front matter', () => {
		expect(markdownThroughEditor('---\nhello: world\n---')).toBe('---\nhello: world\n---')
		expect(markdownThroughEditor('---\n---')).toBe('---\n---')
	})

	test('mentions', () => {
		expect(markdownThroughEditor('@[username](mention://user/id)')).toBe(' @[username](mention://user/id) ')
	})
})

describe('Markdown serializer from html', () => {
	test('ul', () => {
		expect(markdownThroughEditorHtml('<ul data-bullet="*"><li>1</li><li>2</li></ul>')).toBe('* 1\n* 2')
		expect(markdownThroughEditorHtml('<ul data-bullet="-"><li>1</li><li>2</li></ul>')).toBe('- 1\n- 2')
	})
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
		expect(markdownThroughEditorHtml('<p>text<img src="image" alt="description" />moretext</p>')).toBe('text![description](image)moretext')
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

	test('table cell escaping', () => {
		// while '|' has no special meaning in commonmark is has to be escaped for GFM tables
		expect(markdownThroughEditorHtml('<table><tr><th>greetings</th></tr><tr><td>hello | hallo</td></tr></table>')).toBe('| greetings |\n|-----------|\n| hello \\| hallo |\n')
	})

	test('front matter', () => {
		expect(markdownThroughEditorHtml('<pre id="frontmatter"><code>some: value</code></pre><h1>Heading</h1>')).toBe('---\nsome: value\n---\n\n# Heading')
		// Test --- within front matter is allowed
		expect(markdownThroughEditorHtml('<pre id="frontmatter"><code>---</code></pre><h1>Heading</h1>')).toBe('----\n---\n----\n\n# Heading')
	})

	test('mentions', () => {
		expect(markdownThroughEditorHtml('<span class="mention" data-label="username" data-type="user" data-id="id">username</span>')).toBe(' @[username](mention://user/id) ')
	})
})

describe('Trailing nodes', () => {
	test('No extra transaction is added after loading', () => {
		const source = "# My heading\n\n* test\n* test2"
		const tiptap = createEditor({
			content: markdownit.render(source),
			enableRichEditing: true,
		})

		const jsonBefore = tiptap.getJSON()

		// Focus triggers a transaction which is adding the trailing node
		// this pushes a step through the collaboration plugin
		// Resulting markdown will not contain the trailing paragraph so everytime the tiptap instance is created from the html, this transaction gets dispatched
		tiptap.commands.focus()

		const jsonAfter = tiptap.getJSON()
		expect(jsonAfter).toStrictEqual(jsonBefore)

		const serializer = createMarkdownSerializer(tiptap.schema)
		const md = serializer.serialize(tiptap.state.doc)
		expect(md).toBe(source)
	})
})

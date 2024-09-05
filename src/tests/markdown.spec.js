/**
 * SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from './../markdownit'
import { typesAvailable } from './../markdownit/callouts'
import {
	markdownThroughEditor,
	markdownThroughEditorHtml,
	markdownFromPaste
} from './helpers.js'
import { createMarkdownSerializer } from "../extensions/Markdown";
import createEditor from "../EditorFactory";

/*
 * This file is for various markdown tests, mainly testing if input and output stays the same.
 *
 * Please add test belonging to some Node or Mark to the corresponding file in './nodes/` or `./marks/`
 */

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

	test('preview with url only', () => {
		const entry = '[https://nextcloud.com](https://nextcloud.com (preview))'
		expect(markdownThroughEditor(entry)).toBe(entry)
	})

	test('preview with text', () => {
		const entry = '[some other text](https://nextcloud.com (preview))'
		expect(markdownThroughEditor(entry)).toBe(entry)
	})

	test('front matter', () => {
		expect(markdownThroughEditor('---\nhello: world\n---')).toBe('---\nhello: world\n---')
		expect(markdownThroughEditor('---\n---')).toBe('---\n---')
	})

	test('mentions', () => {
		expect(markdownThroughEditor('@[username](mention://user/id)')).toBe('@[username](mention://user/id)')
		expect(markdownThroughEditor('pretext @[username](mention://user/id) posttext')).toBe('pretext @[username](mention://user/id) posttext')
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

	test('table', () => {
		expect(markdownThroughEditorHtml('<table><tbody><tr><th>greetings</th></tr><tr><td>hello</td></tr></tbody></table>')).toBe('| greetings |\n|-----------|\n| hello     |\n')
	})

	test('table cell escaping', () => {
		// while '|' has no special meaning in commonmark is has to be escaped for GFM tables
		expect(markdownThroughEditorHtml('<table><tr><th>greetings</th></tr><tr><td>hello | hallo</td></tr></table>')).toBe('| greetings      |\n|----------------|\n| hello \\| hallo |\n')
	})

	test('table pastes (#2708)', () => {
		// while '|' has no special meaning in commonmark is has to be escaped for GFM tables
		expect(markdownFromPaste('<table><tbody><tr><th>greetings</th></tr><tr><td>hello</td></tr></tbody></table>')).toBe('| greetings |\n|-----------|\n| hello     |\n')
	})

	test('front matter', () => {
		expect(markdownThroughEditorHtml('<pre id="frontmatter"><code>some: value</code></pre><h1>Heading</h1>')).toBe('---\nsome: value\n---\n\n# Heading')
		// Test --- within front matter is allowed
		expect(markdownThroughEditorHtml('<pre id="frontmatter"><code>---</code></pre><h1>Heading</h1>')).toBe('----\n---\n----\n\n# Heading')
	})

	test('mentions', () => {
		expect(markdownThroughEditorHtml('<span class="mention" data-label="username" data-type="user" data-id="id">username</span>')).toBe('@[username](mention://user/id)')
		expect(markdownThroughEditorHtml('<span class="mention" data-label="whitespace user" data-type="user" data-id="whitespace user">whitespace user</span>')).toBe('@[whitespace user](mention://user/whitespace%20user)')
		expect(markdownThroughEditorHtml('pretext <span class="mention" data-label="username" data-type="user" data-id="id">username</span> posttext')).toBe('pretext @[username](mention://user/id) posttext')
	})
})

describe('Trailing nodes', () => {
	test('No extra transaction is added after loading', () => {
		const source = "# My heading\n\n* test\n* test2"
		const tiptap = createEditor({
			enableRichEditing: true,
		})
		tiptap.commands.setContent(markdownit.render(source))

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

/**
 * SPDX-FileCopyrightText: 2021-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Markdown } from './../../extensions/index.js'
import { createMarkdownSerializer } from './../../extensions/Markdown.js'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import Image from './../../nodes/Image.js'
import ImageInline from './../../nodes/ImageInline.js'
import TaskList from './../../nodes/TaskList.js'
import TaskItem from './../../nodes/TaskItem.js'
import { Italic, Strong, Underline, Link} from './../../marks/index.js'
import TiptapImage from '@tiptap/extension-image'
import { getExtensionField } from '@tiptap/core'
import { __serializeForClipboard as serializeForClipboard } from '@tiptap/pm/view'
import { createCustomEditor } from '../helpers.js'

describe('Markdown extension unit', () => {
	it('has a config', () => {
		expect(Markdown.config.name).toBe('markdown')
	})

	it('exposes toMarkdown function in Prosemirror', () => {
		const extend = getExtensionField(Markdown, 'extendMarkSchema', Markdown)
		expect(extend(Underline).toMarkdown).toBeDefined()
	})

	it('makes toMarkdown available in prose mirror schema', () => {
		const editor = createCustomEditor({
			extensions: [Markdown, Underline],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		const underline = serializer.serializer.marks.underline
		expect(underline).toEqual(Underline.config.toMarkdown)
		const listItem = serializer.serializer.nodes.listItem
		expect(typeof listItem).toBe('function')
	})
})

describe('Markdown extension integrated in the editor', () => {
	it('serializes marks according to their spec', () => {
		const editor = createCustomEditor({
			content: '<p><u>Test</u></p>',
			extensions: [Markdown, Underline],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('__Test__')
	})

	it('serializes nodes according to their spec', () => {
		const editor = createCustomEditor({
			content: '<p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></p>',
			extensions: [Markdown, TaskList, TaskItem],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('\n- [ ] Hello')
	})

	it('serializes images with the default prosemirror way', () => {
		const editor = createCustomEditor({
			content: '<p><img alt="Hello" src="test"></p>',
			extensions: [Markdown, TiptapImage.configure({ inline: true })],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('![Hello](test)')
	})

	it('serializes block images with the default prosemirror way', () => {
		const editor = createCustomEditor({
			content: '<figure><img alt="Hello" src="test"></figure><p>hello</p>',
			extensions: [Markdown, Image, ImageInline],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('![Hello](test)\n\nhello')
	})

	it('serializes inline images with the default prosemirror way', () => {
		const editor = createCustomEditor({
			content: '<p>inline image <img alt="Hello" src="test"> inside text</p>',
			extensions: [Markdown, Image, ImageInline],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('inline image ![Hello](test) inside text')
	})

	it('copies task lists to plaintext like markdown', () => {
		const editor = createCustomEditor({
			content: '<p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></p>',
			extensions: [Markdown, TaskList, TaskItem],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('\n- [ ] Hello')
	})

	it('copies code block content to plaintext according to their spec', () => {
		const editor = createCustomEditor({
			content: '<pre><code>Hello</code></pre>',
			extensions: [Markdown, CodeBlock],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello')
	})

	it('copies nested task list nodes to markdown like syntax', () => {
		const editor = createCustomEditor({
			content: '<blockquote><p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></blockquote>',
			extensions: [Markdown, Blockquote, TaskList, TaskItem],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('\n- [ ] Hello')
	})

	it('copies address from blockquote to markdown', () => {
		const editor = createCustomEditor({
		content: '<blockquote><p>Hermannsreute 44A</p></blockquote>',
			extensions: [Markdown, Blockquote],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('Hermannsreute 44A')
	})

	it('copy version number without escape character', () => {
		const editor = createCustomEditor({
		content: '<p>Hello</p><p>28.0.4</p>',
			extensions: [Markdown],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello\n\n28.0.4')
	})

	it('strips bold, italic, and other marks from paragraph', () => {
		const editor = createCustomEditor({
		content: '<p><strong>Hello</strong></p><p><span style="text-decoration: underline;">lonely </span><em>world</em></p>',
			extensions: [Markdown, Italic, Strong, Underline],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello\n\nlonely world')
	})

	it('strips href and link formatting from email address', () => {
		const editor = createCustomEditor({
		content: '<p>Hello</p><p><a href="mailto:example@example.com">example@example.com</a></p>',
			extensions: [Markdown, Link],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello\n\nexample@example.com')
	})

})

function copyEditorContent(editor) {
	editor.commands.selectAll()
	const slice = editor.state.selection.content()
	const { text } = serializeForClipboard(editor.view, slice)
	return text
}

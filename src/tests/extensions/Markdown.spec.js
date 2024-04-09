import { Markdown } from './../../extensions/index.js'
import { createMarkdownSerializer } from './../../extensions/Markdown.js'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import Image from './../../nodes/Image.js'
import ImageInline from './../../nodes/ImageInline.js'
import TaskList from './../../nodes/TaskList.js'
import TaskItem from './../../nodes/TaskItem.js'
import Underline from './../../marks/Underline.js'
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
		editor.commands.selectAll()
		const slice = editor.state.selection.content()
		const { text } = serializeForClipboard(editor.view, slice)
		expect(text).toBe('\n- [ ] Hello')
	})

	it('copies code block content to plaintext according to their spec', () => {
		const editor = createCustomEditor({
			content: '<pre><code>Hello</code></pre>',
			extensions: [Markdown, CodeBlock],
		})
		editor.commands.selectAll()
		const slice = editor.state.selection.content()
		const { text } = serializeForClipboard(editor.view, slice)
		expect(text).toBe('Hello')
	})

	it('copies nested task list nodes to markdown like syntax', () => {
		const editor = createCustomEditor({
			content: '<blockquote><p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></blockquote>',
			extensions: [Markdown, Blockquote, TaskList, TaskItem],
		})
		editor.commands.selectAll()
		const slice = editor.state.selection.content()
		const { text } = serializeForClipboard(editor.view, slice)
		expect(text).toBe('\n- [ ] Hello')
	})

})

import { Markdown } from './../../extensions/index.js'
import { createMarkdownSerializer } from './../../extensions/Markdown.js'
import Image from './../../nodes/Image.js'
import ImageInline from './../../nodes/ImageInline.js'
import TaskList from './../../nodes/TaskList.js'
import TaskItem from './../../nodes/TaskItem.js'
import Underline from './../../marks/Underline.js'
import TiptapImage from '@tiptap/extension-image'
import { getExtensionField } from '@tiptap/core'
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

})

import { Serializer } from './../../extensions/index.js'
import {
	_createMarkdownSerializer,
	serializeEditorContent
} from './../../extensions/Serializer.js'
import Image from './../../nodes/Image.js'
import ImageInline from './../../nodes/ImageInline.js'
import TaskList from './../../nodes/TaskList.js'
import TaskItem from './../../nodes/TaskItem.js'
import { Underline } from './../../marks/index.js'
import TiptapImage from '@tiptap/extension-image'
import { getExtensionField } from '@tiptap/core'
import { createCustomEditor } from '../helpers.js'

describe('Serializer extension unit', () => {
	it('has a config', () => {
		expect(Serializer.config.name).toBe('serializer')
	})

	it('exposes toMarkdown function in Prosemirror', () => {
		const extend = getExtensionField(Serializer, 'extendMarkSchema', Serializer)
		expect(extend(Underline).toMarkdown).toBeDefined()
	})

	it('makes toMarkdown available in prose mirror schema', () => {
		const editor = createCustomEditor({
			extensions: [Serializer, Underline],
		})
		const serializer = _createMarkdownSerializer(editor.schema)
		const underline = serializer.marks.underline
		expect(underline).toEqual(Underline.config.toMarkdown)
		const listItem = serializer.nodes.listItem
		expect(typeof listItem).toBe('function')
	})
})

describe('Markdown extension integrated in the editor', () => {
	it('serializes marks according to their spec', () => {
		const editor = createCustomEditor({
			content: '<p><u>Test</u></p>',
			extensions: [Serializer, Underline],
		})
		expect(serializeEditorContent(editor)).toBe('__Test__')
	})

	it('serializes nodes according to their spec', () => {
		const editor = createCustomEditor({
			content: '<p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></p>',
			extensions: [Serializer, TaskList, TaskItem],
		})
		expect(serializeEditorContent(editor))
			.toBe('\n- [ ] Hello')
	})

	it('serializes images with the default prosemirror way', () => {
		const editor = createCustomEditor({
			content: '<p><img alt="Hello" src="test"></p>',
			extensions: [Serializer, TiptapImage.configure({ inline: true })],
		})
		expect(serializeEditorContent(editor))
			.toBe('![Hello](test)')
	})

	it('serializes block images with the default prosemirror way', () => {
		const editor = createCustomEditor({
			content: '<figure><img alt="Hello" src="test"></figure><p>hello</p>',
			extensions: [Serializer, Image, ImageInline],
		})
		expect(serializeEditorContent(editor))
			.toBe('![Hello](test)\n\nhello')
	})

	it('serializes inline images with the default prosemirror way', () => {
		const editor = createCustomEditor({
			content: '<p>inline image <img alt="Hello" src="test"> inside text</p>',
			extensions: [Serializer, Image, ImageInline],
		})
		expect(serializeEditorContent(editor))
			.toBe('inline image ![Hello](test) inside text')
	})
})

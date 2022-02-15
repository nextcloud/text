import { Markdown } from './../../extensions';
import { createMarkdownSerializer } from './../../extensions/Markdown';
import Underline from './../../marks/Underline';
import { TaskList, TaskItem } from './../../nodes'
import Image from '@tiptap/extension-image'
import { getExtensionField } from '@tiptap/core'
import createEditor from './../createEditor'

describe('Markdown extension unit', () => {
	it('has a config', () => {
		expect(Markdown.config.name).toBe('markdown')
	})

	it('exposes toMarkdown function in Prosemirror', () => {
		const extend = getExtensionField(Markdown, 'extendMarkSchema', Markdown)
		expect(extend(Underline).toMarkdown).toBeDefined()
	})

	it('makes toMarkdown available in prose mirror schema', () => {
		const editor = createEditor({
			extensions: [Markdown, Underline]
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
		const editor = createEditor({
			content: '<p><u>Test</u></p>',
			extensions: [Markdown, Underline],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('__Test__')
	})

	it('serializes nodes according to their spec', () => {
		const editor = createEditor({
			content: '<p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></p>',
			extensions: [Markdown, TaskList, TaskItem],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('\n* [ ] Hello')
	})

	it('serializes nodes with the default prosemirror way', () => {
		const editor = createEditor({
			content: `<p><img alt="Hello" src="test" /></p>`,
			extensions: [Markdown, Image.configure({inline: true})],
		})
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('![Hello](test)')
	})

})

/**
 * SPDX-FileCopyrightText: 2021-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getExtensionField } from '@tiptap/core'
import { Blockquote } from '@tiptap/extension-blockquote'
import { CodeBlock } from '@tiptap/extension-code-block'
import TiptapImage from '@tiptap/extension-image'
import { ListItem } from '@tiptap/extension-list'
import { Markdown } from '../../extensions/index.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import { Italic, Link, Strong, Underline } from '../../marks/index.js'
import Image from '../../nodes/Image.js'
import OrderedList from '../../nodes/OrderedList.js'
import Table from '../../nodes/Table.js'
import TaskItem from '../../nodes/TaskItem.js'
import TaskList from '../../nodes/TaskList.js'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'
import ImageInline from './../../nodes/ImageInline.js'

describe('Markdown extension unit', () => {
	it('has a config', () => {
		expect(Markdown.config.name).toBe('markdown')
	})

	it('exposes toMarkdown function in Prosemirror', () => {
		const extend = getExtensionField(Markdown, 'extendMarkSchema', Markdown)
		expect(extend(Underline).toMarkdown).toBeDefined()
	})

	it('makes toMarkdown available in prose mirror schema', () => {
		const editor = createCustomEditor('', [Markdown, Underline])
		const serializer = createMarkdownSerializer(editor.schema)
		const underline = serializer.serializer.marks.underline
		expect(underline).toEqual(Underline.config.toMarkdown)
		const listItem = serializer.serializer.nodes.listItem
		expect(typeof listItem).toBe('function')
		editor.destroy()
	})
})

describe('Markdown extension integrated in the editor', () => {
	it('serializes marks according to their spec', () => {
		const editor = createCustomEditor('<p><u>Test</u></p>', [
			Markdown,
			Underline,
		])
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('__Test__')
		editor.destroy()
	})

	it('serializes nodes according to their spec', () => {
		const editor = createCustomEditor(
			'<p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></p>',
			[Markdown, TaskList, TaskItem],
		)
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('\n- [ ] Hello')
		editor.destroy()
	})

	it('serializes images with the default prosemirror way', () => {
		const editor = createCustomEditor('<p><img alt="Hello" src="test"></p>', [
			Markdown,
			TiptapImage.configure({ inline: true }),
		])
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe('![Hello](test)')
		editor.destroy()
	})

	it('serializes block images with the default prosemirror way', () => {
		const editor = createCustomEditor(
			'<figure><img alt="Hello" src="test"></figure><p>hello</p>',
			[Markdown, Image, ImageInline],
		)
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe(
			'![Hello](test)\n\nhello',
		)
		editor.destroy()
	})

	it('serializes inline images with the default prosemirror way', () => {
		const editor = createCustomEditor(
			'<p>inline image <img alt="Hello" src="test"> inside text</p>',
			[Markdown, Image, ImageInline],
		)
		const serializer = createMarkdownSerializer(editor.schema)
		expect(serializer.serialize(editor.state.doc)).toBe(
			'inline image ![Hello](test) inside text',
		)
		editor.destroy()
	})

	it('copies markdown syntax for task list if selected together with a paragraph', () => {
		const editor = createCustomEditor(
			'<p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></p>',
			[Markdown, TaskList, TaskItem],
		)
		const text = copyEditorContent(editor)
		expect(text).toBe('\n- [ ] Hello')
		editor.destroy()
	})

	it('copies just the content of a block node', () => {
		const editor = createCustomEditor('<pre><code>Hello</code></pre>', [
			Markdown,
			CodeBlock,
		])
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello')
		editor.destroy()
	})

	it('copies just the content of a single list item', () => {
		const editor = createCustomEditor(
			'<p>paragraph1</p><ol><li><p>first</p></li></ol><p>paragraph2</p>',
			[Markdown, ListItem, OrderedList],
		)
		const text = copyEditorContent(editor, editor.schema.nodes.orderedList)
		expect(text).toBe('first')
		editor.destroy()
	})

	it('copies markdown syntax for multiple list items', () => {
		const editor = createCustomEditor(
			'<p>paragraph1</p><ol><li><p>first</p></li><li><p>second</p></li></ol><p>paragraph2</p>',
			[Markdown, ListItem, OrderedList],
		)
		const text = copyEditorContent(editor, editor.schema.nodes.orderedList)
		expect(text).toBe('1. first\n2. second')
		editor.destroy()
	})

	it('copies just the content of a single nested task list item', () => {
		const editor = createCustomEditor(
			'<blockquote><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></blockquote>',
			[Markdown, Blockquote, TaskList, TaskItem],
		)
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello')
		editor.destroy()
	})

	it('copies markdown syntax for multiple nested task list items', () => {
		const editor = createCustomEditor(
			'<blockquote><ul class="contains-task-list"><li><input type="checkbox">Hello</li><li><input type="checkbox">World</li></ul></blockquote>',
			[Markdown, Blockquote, TaskList, TaskItem],
		)
		const text = copyEditorContent(editor)
		expect(text).toBe('- [ ] Hello\n- [ ] World')
		editor.destroy()
	})

	it('copies address from blockquote to markdown', () => {
		const editor = createCustomEditor(
			'<blockquote><p>Hermannsreute 44A</p></blockquote>',
			[Markdown, Blockquote],
		)
		const text = copyEditorContent(editor)
		expect(text).toBe('Hermannsreute 44A')
		editor.destroy()
	})

	it('copies version number without escape character', () => {
		const editor = createCustomEditor('<p>Hello</p><p>28.0.4</p>', [Markdown])
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello\n\n28.0.4')
		editor.destroy()
	})

	it('copies just content for table cell', () => {
		const editor = createCustomEditor(
			'<p>paragraph</p><table><tr><th>headercell</th></tr><tr><td>contentcell</td></tr></table>',
			[Markdown, Table],
		)
		const text = copyEditorContent(editor, editor.schema.nodes.tableCell)
		expect(text).toBe('contentcell')
		editor.destroy()
	})

	it('copies markdown syntax for full table', () => {
		const editor = createCustomEditor(
			'<p>paragraph</p><table><tr><th>headercell</th></tr><tr><td>contentcell</td></tr></table>',
			[Markdown, Table],
		)
		const text = copyEditorContent(editor, editor.schema.nodes.table)
		expect(text).toBe('| headercell  |\n|-------------|\n| contentcell |\n')
		editor.destroy()
	})

	it('strips bold, italic, and other marks from paragraph', () => {
		const editor = createCustomEditor(
			'<p><strong>Hello</strong></p><p><span style="text-decoration: underline;">lonely </span><em>world</em></p>',
			[Markdown, Italic, Strong, Underline],
		)
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello\n\nlonely world')
		editor.destroy()
	})

	it('strips href and link formatting from email address', () => {
		const editor = createCustomEditor(
			'<p>Hello</p><p><a href="mailto:example@example.com">example@example.com</a></p>',
			[Markdown, Link],
		)
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello\n\nexample@example.com')
		editor.destroy()
	})
})

const copyEditorContent = (editor, nodeType = null) => {
	if (nodeType) {
		editor.state.doc.descendants((node, pos) => {
			if (node.type === nodeType) {
				editor.commands.setNodeSelection(pos)
			}
		})
	} else {
		editor.commands.selectAll()
	}

	const slice = editor.state.selection.content()
	const { text } = editor.view.serializeForClipboard(slice)
	return text
}

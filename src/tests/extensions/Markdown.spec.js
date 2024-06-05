/**
 * SPDX-FileCopyrightText: 2024 Max <max@nextcloud.com>
 * SPDX-License-Identifier: @license AGPL-3.0-or-later
 *
 */

import { Serializer, Markdown } from './../../extensions/index.js'
import TaskList from './../../nodes/TaskList.js'
import TaskItem from './../../nodes/TaskItem.js'
import CodeBlock from '@tiptap/extension-code-block'
import Blockquote from '@tiptap/extension-blockquote'
import { Italic, Strong, Underline, Link} from './../../marks/index.js'
import { __serializeForClipboard as serializeForClipboard } from '@tiptap/pm/view'
import { createCustomEditor } from '../helpers.js'

describe('Markdown extension integrated in the editor', () => {
	it('copies task lists to plaintext like markdown', () => {
		const editor = createCustomEditor({
			content: '<p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></p>',
			extensions: [Markdown, Serializer, TaskList, TaskItem],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('\n- [ ] Hello')
	})

	it('copies code block content to plaintext according to their spec', () => {
		const editor = createCustomEditor({
			content: '<pre><code>Hello</code></pre>',
			extensions: [Markdown, Serializer, CodeBlock],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello')
	})

	it('copies nested task list nodes to markdown like syntax', () => {
		const editor = createCustomEditor({
			content: '<blockquote><p><ul class="contains-task-list"><li><input type="checkbox">Hello</li></ul></blockquote>',
			extensions: [Markdown, Serializer, Blockquote, TaskList, TaskItem],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('\n- [ ] Hello')
	})

	it('copies address from blockquote to markdown', () => {
		const editor = createCustomEditor({
		content: '<blockquote><p>Hermannsreute 44A</p></blockquote>',
			extensions: [Markdown, Serializer, Blockquote],
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
			extensions: [Markdown, Serializer, Italic, Strong, Underline],
		})
		const text = copyEditorContent(editor)
		expect(text).toBe('Hello\n\nlonely world')
	})

	it('strips href and link formatting from email address', () => {
		const editor = createCustomEditor({
		content: '<p>Hello</p><p><a href="mailto:example@example.com">example@example.com</a></p>',
			extensions: [Markdown, Serializer, Link],
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

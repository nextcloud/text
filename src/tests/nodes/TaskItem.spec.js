/**
 * SPDX-FileCopyrightText: 2021-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getExtensionField } from '@tiptap/core'
import EditableTable from '../../nodes/EditableTable.ts'
import markdownit from './../../markdownit/index.ts'
import testEditor from '../testHelpers/testEditor.js'
import RichText from './../../extensions/RichText.js'
import TaskItem from './../../nodes/TaskItem.ts'

const test = testEditor.override('allExtensions', [
	RichText.configure({
		editing: false, // disable the Placeholder which needs a real browser
		extensions: [EditableTable],
	}),
])

describe('TaskItem extension', () => {
	test('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(TaskItem, 'toMarkdown', TaskItem)
		expect(typeof toMarkdown).toEqual('function')
	})

	test('exposes the toMarkdown function in the prosemirror schema', ({ editor }) => {
		const taskItem = editor.schema.nodes.taskItem
		expect(taskItem.spec.toMarkdown).toBeDefined()
	})

	test('markdown syntax is preserved through editor', ({ markdownThroughEditor }) => {
		// Invalid ones but should be syntactical unchanged
		expect(markdownThroughEditor('- [F] asd')).toBe('- [F] asd')
		expect(markdownThroughEditor('- [ [asd](sdf)')).toBe('- [ [asd](sdf)')
		// Valid, whitespace is allowed inside the checkbox
		expect(markdownThroughEditor('- [\t] asd')).toBe('- [ ] asd')
		expect(markdownThroughEditor('- [ ] asd')).toBe('- [ ] asd')
		// Valid ones
		expect(markdownThroughEditor('* [ ] [asd](sdf)')).toBe('* [ ] [asd](sdf)')
		expect(markdownThroughEditor('- [ ] [asd](sdf)')).toBe('- [ ] [asd](sdf)')
		expect(markdownThroughEditor('- [x] [asd](sdf)')).toBe('- [x] [asd](sdf)')
		expect(markdownThroughEditor('- [ ] foo\n- [x] bar')).toBe('- [ ] foo\n- [x] bar')
		expect(markdownThroughEditor('- [x] foo\n  - [ ] bar\n  - [x] baz\n- [ ] bim')).toBe('- [x] foo\n  - [ ] bar\n  - [x] baz\n- [ ] bim')
		expect(markdownThroughEditor('- [X] asd')).toBe('- [x] asd')
		expect(markdownThroughEditor('-   [X] asd')).toBe('- [x] asd')
	})

	test('serializes HTML to markdown', ({ markdownThroughEditorHtml }) => {
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><label>foo</label></li></ul>')).toBe('- [x] foo')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" /><label>test</label></li></ul>')).toBe('- [ ] test')
		// First text node becomes first paragraph in taskItem
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked />test<h2>Headline</h2><p><strong>content</strong></p></li></ul>')).toBe('- [x] test\n\n  ## Headline\n\n  **content**')
		// Second block element stays indented (stays part of taskItem)
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><p>Test</p><h1>Block level headline</h1></li></ul>')).toBe('- [x] Test\n\n  # Block level headline')
	})
})

describe('splitting a task item with Enter', () => {
	/**
	 * @param {object} test context providing editor
	 * @param {string} text text of the paragraph to place the cursor in
	 */
	const setCursorAtStartOfParagraph = ({ editor }, text) => {
		let pos = -1
		editor.state.doc.descendants((node, nodePos) => {
			if (pos === -1 && node.type.name === 'paragraph' && node.textContent === text) {
				pos = nodePos + 1
			}
		})
		editor.commands.setTextSelection(pos)
	}

	/**
	 * Simulate pressing Enter the same way the browser does: the keydown event
	 * is passed through the editor's handleKeyDown prop chain.
	 *
	 * @param {object} test context providing editor
	 */
	const pressEnter = ({ editor }) => {
		const { view } = editor
		view.someProp('handleKeyDown', (handleKeyDown) => handleKeyDown(view, new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })))
	}

	test('Enter at the start of a checked item inserts an unchecked item and preserves the checked states', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent(markdownit.render('- [x] one\n- [x] two\n'))
		setCursorAtStartOfParagraph({ editor }, 'one')
		pressEnter({ editor })
		expect(serializeMarkdown()).toBe('- [ ] \n- [x] one\n- [x] two')
	})

	test('Enter at the start of a nested checked item inserts an unchecked item', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent(markdownit.render('- [x] outer\n  - [x] inner\n'))
		setCursorAtStartOfParagraph({ editor }, 'inner')
		pressEnter({ editor })
		expect(serializeMarkdown()).toBe('- [x] outer\n  - [ ] \n  - [x] inner')
	})

	test('Enter in the middle of a checked item keeps the item checked', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent(markdownit.render('- [x] ab\n'))
		let pos = -1
		editor.state.doc.descendants((node, nodePos) => {
			if (node.type.name === 'text' && node.text === 'ab') {
				pos = nodePos + 1
			}
		})
		editor.commands.setTextSelection(pos)
		pressEnter({ editor })
		expect(serializeMarkdown()).toBe('- [x] a\n- [ ] b')
	})

	test('Enter at the end of a checked item inserts an unchecked item', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent(markdownit.render('- [x] one\n- [x] two\n'))
		let pos = -1
		editor.state.doc.descendants((node, nodePos) => {
			if (node.type.name === 'paragraph' && node.textContent === 'one') {
				pos = nodePos + 1 + node.content.size
			}
		})
		editor.commands.setTextSelection(pos)
		pressEnter({ editor })
		expect(serializeMarkdown()).toBe('- [x] one\n- [ ] \n- [x] two')
	})
})

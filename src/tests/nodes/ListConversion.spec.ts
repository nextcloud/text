/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ListItem } from '@tiptap/extension-list'
import { describe, expect } from 'vitest'
import markdownit from '../../markdownit/index.js'
import BulletList from '../../nodes/BulletList.ts'
import OrderedList from '../../nodes/OrderedList.ts'
import TaskItem from '../../nodes/TaskItem.ts'
import TaskList from '../../nodes/TaskList.ts'
import testEditor from '../testHelpers/testEditor.ts'

const test = testEditor.override('extensions', [
	BulletList,
	ListItem,
	OrderedList,
	TaskItem,
	TaskList,
])

describe('List type conversion', () => {
	describe('editor.can() — menubar enabled state', () => {
		test('toggleTaskList() returns true when cursor is inside a bulletList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('- item\n'))
			editor.commands.focus('start')
			expect(editor.can().toggleTaskList()).to.equal(true)
		})
		test('toggleTaskList() returns true when cursor is inside an orderedList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('1. item\n'))
			editor.commands.focus('start')
			expect(editor.can().toggleTaskList()).to.equal(true)
		})
		test('toggleBulletList() returns true when cursor is inside a taskList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('- [ ] item\n'))
			editor.commands.focus('start')
			expect(editor.can().toggleBulletList()).to.equal(true)
		})
		test('toggleOrderedList() returns true when cursor is inside a taskList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('- [ ] item\n'))
			editor.commands.focus('start')
			expect(editor.can().toggleOrderedList()).to.equal(true)
		})
	})
	describe('conversion at top level', () => {
		test('converts all items when toggling bulletList → taskList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('- item 1\n- item 2\n'))
			editor.commands.focus('start')
			editor.commands.toggleTaskList()
			const list = editor.state.doc.firstChild!
			expect(list.type.name).to.equal('taskList')
			expect(list.childCount).to.equal(2)
			expect(list.child(0).type.name).to.equal('taskItem')
			expect(list.child(0).attrs.checked).to.equal(false)
			expect(list.child(0).firstChild!.textContent).to.equal('item 1')
			expect(list.child(1).firstChild!.textContent).to.equal('item 2')
		})
		test('converts all items when toggling taskList → bulletList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('- [ ] item 1\n- [x] item 2\n'))
			editor.commands.focus('start')
			editor.commands.toggleBulletList()
			const list = editor.state.doc.firstChild!
			expect(list.type.name).to.equal('bulletList')
			expect(list.child(0).type.name).to.equal('listItem')
			expect(list.child(0).firstChild!.textContent).to.equal('item 1')
			expect(list.child(1).firstChild!.textContent).to.equal('item 2')
		})
		test('converts all items when toggling orderedList → taskList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('1. item 1\n2. item 2\n'))
			editor.commands.focus('start')
			editor.commands.toggleTaskList()
			const list = editor.state.doc.firstChild!
			expect(list.type.name).to.equal('taskList')
			expect(list.child(0).type.name).to.equal('taskItem')
		})
	})
	describe('conversion at nested level', () => {
		test('converts only the innermost list when cursor is in a nested item', ({ editor }) => {
			editor.commands.setContent(markdownit.render('- outer\n  - inner\n'))
			// Position cursor inside the nested "inner" paragraph
			let innerPos = -1
			editor.state.doc.descendants((node, pos) => {
				if (node.type.name === 'paragraph' && node.textContent === 'inner') {
					innerPos = pos + 1
				}
			})
			editor.commands.setTextSelection(innerPos)
			editor.commands.toggleTaskList()
			const outerList = editor.state.doc.firstChild!
			expect(outerList.type.name).to.equal('bulletList') // outer unchanged
			const outerItem = outerList.firstChild!
			const innerList = outerItem.lastChild!
			expect(innerList.type.name).to.equal('taskList') // inner converted
			expect(innerList.firstChild!.type.name).to.equal('taskItem')
			expect(innerList.firstChild!.firstChild!.textContent).to.equal('inner')
		})
		test('can().toggleTaskList() returns true for a nested item inside a bulletList', ({ editor }) => {
			editor.commands.setContent(markdownit.render('- outer\n  - inner\n'))
			let innerPos = -1
			editor.state.doc.descendants((node, pos) => {
				if (node.type.name === 'paragraph' && node.textContent === 'inner') {
					innerPos = pos + 1
				}
			})
			editor.commands.setTextSelection(innerPos)
			expect(editor.can().toggleTaskList()).to.equal(true)
		})
	})
	test('preserves cursor position when converting bulletList → taskList', ({ editor }) => {
		editor.commands.setContent(markdownit.render('- item 1\n- item 2\n'))
		editor.commands.focus('start')
		const posBefore = editor.state.selection.from
		editor.commands.toggleTaskList()
		expect(editor.state.selection.from).to.equal(posBefore)
	})
})

describe('markdown serialization of mixed list types', () => {
	// Pure round-trips — no conversion involved
	test('preserves bullet list with nested task list through editor', ({ markdownThroughEditor }) => {
		expect(markdownThroughEditor('- outer\n  - [ ] inner')).to.equal('- outer\n  - [ ] inner')
	})
	test('preserves task list with nested bullet list through editor', ({ markdownThroughEditor }) => {
		expect(markdownThroughEditor('- [ ] outer\n  - inner')).to.equal('- [ ] outer\n  - inner')
	})

	// Post-conversion serialization — verifies convertListType preserves bullet attr
	test('serializes correctly after converting nested bulletList → taskList', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent(markdownit.render('- outer\n  * inner\n'))
		// find inner paragraph
		let innerPos = -1
		editor.state.doc.descendants((node, pos) => {
			if (node.type.name === 'paragraph' && node.textContent === 'inner') {
				innerPos = pos + 1
			}
		})
		editor.commands.setTextSelection(innerPos)
		editor.commands.toggleTaskList()
		expect(serializeMarkdown()).to.equal('- outer\n  * [ ] inner')
	})
})

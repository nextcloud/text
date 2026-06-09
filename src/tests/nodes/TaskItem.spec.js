/**
 * SPDX-FileCopyrightText: 2021-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getExtensionField } from '@tiptap/core'
import EditableTable from '../../nodes/EditableTable.js'
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

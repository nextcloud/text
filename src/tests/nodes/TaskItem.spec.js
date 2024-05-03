/**
 * SPDX-FileCopyrightText: 2021-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TaskList from './../../nodes/TaskList'
import TaskItem from './../../nodes/TaskItem'
import Markdown from './../../extensions/Markdown'
import { getExtensionField } from '@tiptap/core'
import { createCustomEditor, markdownThroughEditor, markdownThroughEditorHtml } from '../helpers'

describe('TaskItem extension', () => {
	it('exposes toMarkdown function', () => {
		const toMarkdown = getExtensionField(TaskItem, 'toMarkdown', TaskItem)
		expect(typeof toMarkdown).toEqual('function')
	})

	it('exposes the toMarkdown function in the prosemirror schema', () => {
		const editor = createCustomEditor({
			extensions: [Markdown, TaskList, TaskItem]
		})
		const taskItem = editor.schema.nodes.taskItem
		expect(taskItem.spec.toMarkdown).toBeDefined()
	})

	it('markdown syntax is preserved through editor', () => {
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
		expect(markdownThroughEditor('- [x] foo\n' +
			'  - [ ] bar\n' +
			'  - [x] baz\n' +
			'- [ ] bim')).toBe('- [x] foo\n' +
				'  - [ ] bar\n' +
				'  - [x] baz\n' +
				'- [ ] bim')
		expect(markdownThroughEditor('- [X] asd')).toBe('- [x] asd')
		expect(markdownThroughEditor('-   [X] asd')).toBe('- [x] asd')
	})

	it('serializes HTML to markdown', () => {
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><label>foo</label></li></ul>')).toBe('- [x] foo')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" /><label>test</label></li></ul>')).toBe('- [ ] test')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><div><h2>Test</h2><p><strong>content</strong></p></div></li></ul>')).toBe('- [x] Test\n\n  **content**')
		expect(markdownThroughEditorHtml('<ul class="contains-task-list"><li><input type="checkbox" checked /><p>Test</p><h1>Block level headline</h1></li></ul>')).toBe('- [x] Test\n\n  # Block level headline')
	})

})

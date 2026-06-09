/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import RichText from '../extensions/RichText.js'
import markdownit from '../markdownit/index.js'
import EditableTable from '../nodes/EditableTable.js'
import testEditor from './testHelpers/testEditor.js'

const test = testEditor.override('allExtensions', [
	RichText.configure({
		editing: false, // disable the Placeholder which needs a real browser
		extensions: [EditableTable],
	}),
]).extend({
	renderedHTML: async ({ editor }, use) => {
		await use((markdown) => {
			editor.commands.setContent(markdownit.render(markdown))
			// Remove TrailingNode
			return editor.getHTML().replace(/<p><\/p>$/, '')
		})
	},
})

describe('TipTap', () => {
	test('render softbreaks', ({ renderedHTML }) => {
		const markdown = 'This\nis\none\nparagraph'
		expect(renderedHTML(markdown)).toEqual(`<p dir="ltr">${markdown}</p>`)
	})

	test('render hardbreak', ({ renderedHTML }) => {
		const markdown = 'Hard line break  \nNext Paragraph'
		expect(renderedHTML(markdown)).toEqual('<p dir="ltr">Hard line break<br>Next Paragraph</p>')
	})

	test('render taskList', ({ renderedHTML }) => {
		const markdown = '* [ ] item 1\n'
		expect(renderedHTML(markdown)).toEqual('<ul class="contains-task-list"><li dir="ltr" data-checked="false" class="task-list-item checkbox-item"><input type="checkbox" class="" contenteditable="false"><div class="task-item-content"><p dir="ltr">item 1</p></div></li></ul>')
	})
})

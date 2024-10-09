/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createRichEditor } from '../EditorFactory.js'
import markdownit from '../markdownit/index.js'

const renderedHTML = (markdown) => {
	const editor = createRichEditor()
	editor.commands.setContent(markdownit.render(markdown))
	// Remove TrailingNode
	return editor.getHTML().replace(/<p><\/p>$/, '')
}

describe('TipTap', () => {
	it('render softbreaks', () => {
		const markdown = 'This\nis\none\nparagraph'
		expect(renderedHTML(markdown)).toEqual(`<p>${markdown}</p>`)
	})

	it('render hardbreak', () => {
		const markdown = 'Hard line break  \nNext Paragraph'
		expect(renderedHTML(markdown)).toEqual('<p>Hard line break<br>Next Paragraph</p>')
	})

	it('render taskList', () => {
		const markdown = '* [ ] item 1\n'
		expect(renderedHTML(markdown)).toEqual('<ul class="contains-task-list"><li data-checked="false" class="task-list-item checkbox-item"><input type="checkbox" class="" contenteditable="false"><label><p>item 1</p></label></li></ul>')
	})
})

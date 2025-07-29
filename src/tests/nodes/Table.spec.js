/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createRichEditor } from '../../EditorFactory.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'

import markdownit from '../../markdownit/index.js'

// Eslint does not know about ?raw suffix it seems.
/* eslint-disable import/no-unresolved */
import input from '../fixtures/tables/basic/table.md?raw'
import output from '../fixtures/tables/basic/table.html?raw'
import otherStructure from '../fixtures/tables/basic/table.structure.html?raw'
import handbook from '../fixtures/tables/handbook/handbook.html?raw'
import handbookOut from '../fixtures/tables/handbook/handbook.out.html?raw'
/* eslint-enable import/no-unresolved */

import { br, table, td, th, thead, tr, expectDocument } from '../testHelpers/builders.js'

describe('Table', () => {
	it('Markdown-IT renders tables', () => {
		const rendered = markdownit.render(input)
		expect(rendered).toBe(output)
	})

	test('Load into editor', () => {
		const tiptap = editorWithContent(markdownit.render(input))

		expectDocument(tiptap.state.doc,
			table(
				thead(
					th({ dir: 'ltr', textAlign: 'center' }, 'heading'),
					th({ dir: 'ltr', textAlign: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td({ dir: 'ltr', textAlign: 'center' }, 'center'),
					td({ dir: 'ltr', textAlign: 'right' }, 'right'),
					td(
						{ dir: 'ltr' },
						'left cell ',
						br({ syntax: 'html' }),
						'with line break',
					),
				),
			),
		)
	})

	test('load html table with other structure', () => {
		const tiptap = editorWithContent(otherStructure.replace(/\n\s*/g, ''))

		expectDocument(tiptap.state.doc,
			table(
				thead(
					th({ dir: 'ltr', textAlign: 'center' }, 'heading'),
					th({ dir: 'ltr', textAlign: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td({ dir: 'ltr', textAlign: 'center' }, 'center'),
					td({ dir: 'ltr', textAlign: 'right' }, 'right'),
					td(
						{ dir: 'ltr' },
						'left cell ',
						br({ syntax: '  ' }),
						'with line break',
					),
				),
			),
		)
	})

	test('handle html table from handbook', () => {
		const tiptap = editorWithContent(handbook.replace(/\n\s*/g, ''))
		expect(formatHTML(tiptap.getHTML())).toBe(formatHTML(handbookOut))
	})

	test('serialize from editor', () => {
		const tiptap = editorWithContent(markdownit.render(input))
		const serializer = createMarkdownSerializer(tiptap.schema)

		expect(serializer.serialize(tiptap.state.doc)).toBe(input)
	})
})

const editorWithContent = (content) => {
	const editor = createRichEditor()
	editor.commands.setContent(content)
	return editor
}

const formatHTML = (html) => {
	return html.replaceAll('><', '>\n<').replace(/\n$/, '')
}

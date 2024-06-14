/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createEditor } from '../../EditorFactory'
import { createMarkdownSerializer } from '../../extensions/Markdown'
import { builders } from 'prosemirror-test-builder'

import markdownit from '../../markdownit'

import input from '../fixtures/tables/basic/table.md'
import output from '../fixtures/tables/basic/table.html'
import otherStructure from '../fixtures/tables/basic/table.structure.html'

import handbook from '../fixtures/tables/handbook/handbook.html'
import handbookOut from '../fixtures/tables/handbook/handbook.out.html'
import { br, table, td, th, thead, tr, expectDocument } from '../builders'

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
					th({ textAlign: 'center' }, 'heading'),
					th({ textAlign: 'right' }, 'heading 2'),
					th('heading 3')
				),
				tr(
					td({ textAlign: 'center' }, 'center'),
					td({ textAlign: 'right' }, 'right'),
					td('left cell ', br({ syntax: 'html' }), 'with line break')
				)
			)
		)
	})

	test('load html table with other structure', () => {
		const tiptap = editorWithContent(otherStructure.replace(/\n\s*/g, ''))

		expectDocument(tiptap.state.doc,
			table(
				thead(
					th({ textAlign: 'center' }, 'heading'),
					th({ textAlign: 'right' }, 'heading 2'),
					th('heading 3')
				),
				tr(
					td({ textAlign: 'center' }, 'center'),
					td({ textAlign: 'right' }, 'right'),
					td('left cell ', br({ syntax: '  ' }), 'with line break')
				)
			)
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

function editorWithContent(content) {
	const editor = createEditor({
		enableRichEditing: true,
	})
	editor.commands.setContent(content)
	return editor
}

function formatHTML(html) {
	return html.replaceAll('><', '>\n<').replace(/\n$/, '')
}

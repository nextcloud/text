/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as baseTest } from 'vitest'
import { createRichEditor } from '../../EditorFactory.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'

import markdownit from '../../markdownit/index.js'

// Eslint does not know about ?raw suffix it seems.
/* eslint-disable import/no-unresolved */
import output from '../fixtures/tables/basic/table.html?raw'
import input from '../fixtures/tables/basic/table.md?raw'
import otherStructure from '../fixtures/tables/basic/table.structure.html?raw'
import handbook from '../fixtures/tables/handbook/handbook.html?raw'
import handbookOut from '../fixtures/tables/handbook/handbook.out.html?raw'
/* eslint-enable import/no-unresolved */

import {
	br,
	expectDocument,
	table,
	td,
	th,
	thead,
	tr,
} from '../testHelpers/builders.js'

const test = baseTest.extend({
	editor: async ({ task: _ }, use) => {
		const editor = createRichEditor()
		await use(editor)
		editor.destroy()
	},
})

describe('Table', () => {
	test('Markdown-IT renders tables', () => {
		const rendered = markdownit.render(input)
		expect(rendered).toBe(output)
	})

	test('Load into editor', ({ editor }) => {
		editor.commands.setContent(markdownit.render(input))

		expectDocument(
			editor.state.doc,
			table(
				thead(
					th({ textAlign: 'center' }, 'heading'),
					th({ textAlign: 'right' }, 'heading 2'),
					th('heading 3'),
				),
				tr(
					td({ textAlign: 'center' }, 'center'),
					td({ textAlign: 'right' }, 'right'),
					td('left cell ', br({ syntax: 'html' }), 'with line break'),
				),
			),
		)
	})

	test('load html table with other structure', ({ editor }) => {
		editor.commands.setContent(otherStructure.replace(/\n\s*/g, ''))

		expectDocument(
			editor.state.doc,
			table(
				thead(
					th({ textAlign: 'center' }, 'heading'),
					th({ textAlign: 'right' }, 'heading 2'),
					th('heading 3'),
				),
				tr(
					td({ textAlign: 'center' }, 'center'),
					td({ textAlign: 'right' }, 'right'),
					td('left cell ', br({ syntax: '  ' }), 'with line break'),
				),
			),
		)
	})

	test('handle html table from handbook', ({ editor }) => {
		editor.commands.setContent(handbook.replace(/\n\s*/g, ''))
		expect(formatHTML(editor.getHTML())).toBe(formatHTML(handbookOut))
	})

	test('serialize from editor', ({ editor }) => {
		editor.commands.setContent(markdownit.render(input))
		const serializer = createMarkdownSerializer(editor.schema)

		expect(serializer.serialize(editor.state.doc)).toBe(input)
	})
})

const formatHTML = (html) => {
	return html.replaceAll('><', '>\n<').replace(/\n$/, '')
}

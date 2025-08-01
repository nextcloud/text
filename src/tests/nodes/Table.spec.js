/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as baseTest } from 'vitest'
import { createRichEditor } from '../../EditorFactory.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import { markdownThroughEditor } from '../testHelpers/markdown.js'

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
	p,
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

describe('Table extension', () => {
	test('Markdown-IT renders tables', () => {
		const rendered = markdownit.render(input)
		expect(rendered).toBe(output)
	})

	it('markdown table is preserved through editor', () => {
		expect(markdownThroughEditor('a|b\n-|-\n1|2\n')).toBe(
			'| a | b |\n|---|---|\n| 1 | 2 |\n',
		)

		const complexTable = `
|  #| header1           | header2       |
|--:|-------------------|---------------|
|  1| list:             | code:         | \\
|   |                   |               | \\
|   | * item1           | \`\`\`js         | \\
|   | * item2           | const x = '1' | \\
|   |                   | \`\`\`           | \\
|   | ![alt](/test.png) |               |
|  2| cell3             | cell4         |
|  3|                   | cell5         |
`
		expect(markdownThroughEditor(complexTable)).toBe(complexTable)
	})

	test('Load into editor', ({ editor }) => {
		editor.commands.setContent(markdownit.render(input))

		expectDocument(
			editor.state.doc,
			table(
				thead(
					th({ dir: 'ltr', textAlign: 'center' }, 'heading'),
					th({ dir: 'ltr', textAlign: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td(
						{ dir: 'ltr', textAlign: 'center' },
						p({ dir: 'ltr' }, 'center'),
					),
					td(
						{ dir: 'ltr', textAlign: 'right' },
						p({ dir: 'ltr' }, 'right'),
					),
					td(
						{ dir: 'ltr' },
						p(
							{ dir: 'ltr' },
							'left cell ',
							br({ syntax: 'html' }),
							'with line break',
						),
					),
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
					th({ dir: 'ltr', textAlign: 'center' }, 'heading'),
					th({ dir: 'ltr', textAlign: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td(
						{ dir: 'ltr', textAlign: 'center' },
						p({ dir: 'ltr' }, 'center'),
					),
					td(
						{ dir: 'ltr', textAlign: 'right' },
						p({ dir: 'ltr' }, 'right'),
					),
					td(
						{ dir: 'ltr' },
						p(
							{ dir: 'ltr' },
							'left cell ',
							br({ syntax: '  ' }),
							'with line break',
						),
					),
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

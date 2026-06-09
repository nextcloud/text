/* eslint-disable @stylistic/function-paren-newline */
/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { builders } from 'prosemirror-test-builder'
import RichText from '../../extensions/RichText.js'
import markdownit from '../../markdownit/index.js'
import EditableTable from '../../nodes/EditableTable.js'
import output from '../fixtures/tables/basic/table.html?raw'
import input from '../fixtures/tables/basic/table.md?raw'
import otherStructure from '../fixtures/tables/basic/table.structure.html?raw'
import handbook from '../fixtures/tables/handbook/handbook.html?raw'
import handbookOut from '../fixtures/tables/handbook/handbook.out.html?raw'
import testEditor from '../testHelpers/testEditor.js'

const test = testEditor.override('allExtensions', [
	RichText.configure({
		editing: false, // disable the Placeholder which needs a real browser
		extensions: [EditableTable],
	}),
])

describe('Table extension', () => {
	test('Markdown-IT renders tables', () => {
		const rendered = markdownit.render(input)
		expect(rendered).toBe(output)
	})

	test('simple md table is preserved through editor', ({ markdownThroughEditor }) => {
		expect(markdownThroughEditor('a|b\n-|-\n1|2\n')).toBe('| a | b |\n|---|---|\n| 1 | 2 |\n')
	})

	test('md table with single-line block node in body cell is preserved through editor', ({ markdownThroughEditor }) => {
		const table = `
| header 1 | header 2 |
|----------|----------|
| > quote  | - list   | \\
|          |          |
`.trimStart()

		expect(markdownThroughEditor(table)).toBe(table)
	})

	test('complex md table with alignment, nested list, image and code block is preserved through editor', ({ markdownThroughEditor }) => {
		const table = `
| # |           header1 | header2       |
|--:|------------------:|---------------|
| 1 | list:             | code:         | \\
|   |                   |               | \\
|   | * item1           | \`\`\`js         | \\
|   |   * item2         | const x = '1' | \\
|   |                   | \`\`\`           | \\
|   | ![alt](/test.png) |               |
| 2 |             cell3 | cell4         |
| 3 |                   | cell5         |
`.trimStart()

		expect(markdownThroughEditor(table)).toBe(table)
	})

	test('complex md table with callout, hr, blockquote and details in nested list is preserved through editor', ({ markdownThroughEditor }) => {
		const table = `
| nested list1          | nested list 2                    |
|-----------------------|----------------------------------|
| 1. first with callout | 1. first with blockquote         | \\
|                       |                                  | \\
|    ::: info           |    > - quoted list item1         | \\
|    info               |    > - quoted list item2         | \\
|                       |    1. with image                 | \\
|    :::                |                                  | \\
|    1. item2           |       ![a](i.png)                | \\
| 2. second             |    2. summary                    | \\
|                       |                                  | \\
| ---                   |       <details>                  | \\
|                       |       <summary>summary</summary> | \\
| ::: warn              |       > * quoted list item       | \\
| warn                  |                                  | \\
|                       |       </details>                 | \\
| :::                   |                                  |
| * [ ] task list item1 |                                  | \\
| * [x] task list item2 |                                  |
| abc                   |                                  | \\
|                       |                                  | \\
| > quote               |                                  |
`.trimStart()

		expect(markdownThroughEditor(table)).toBe(table)
	})

	test('Load into editor', ({ editor, expectDocument }) => {
		editor.commands.setContent(markdownit.render(input))

		const {
			br,
			p,
			table,
			td,
			th,
			thead,
			tr,
		} = builders(editor.schema, {
			tr: { nodeType: 'tableRow' },
			td: { nodeType: 'tableCell' },
			th: { nodeType: 'tableHeader' },
			em: { markType: 'italic' },
			thead: { nodeType: 'tableHeadRow' },
			br: { nodeType: 'hardBreak' },
			p: { nodeType: 'paragraph' },
		})

		expectDocument(
			table(
				thead(
					th({ dir: 'ltr', align: 'center' }, 'heading'),
					th({ dir: 'ltr', align: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td({ dir: 'ltr', align: 'center' }, p({ dir: 'ltr' }, 'center')),
					td({ dir: 'ltr', align: 'right' }, p({ dir: 'ltr' }, 'right')),
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

	test('load html table with other structure', ({ editor, expectDocument }) => {
		editor.commands.setContent(otherStructure.replace(/\n\s*/g, ''))

		const {
			br,
			p,
			table,
			td,
			th,
			thead,
			tr,
		} = builders(editor.schema, {
			tr: { nodeType: 'tableRow' },
			td: { nodeType: 'tableCell' },
			th: { nodeType: 'tableHeader' },
			em: { markType: 'italic' },
			thead: { nodeType: 'tableHeadRow' },
			br: { nodeType: 'hardBreak' },
			p: { nodeType: 'paragraph' },
		})

		expectDocument(
			table(
				thead(
					th({ dir: 'ltr', align: 'center' }, 'heading'),
					th({ dir: 'ltr', align: 'right' }, 'heading 2'),
					th({ dir: 'ltr' }, 'heading 3'),
				),
				tr(
					td({ dir: 'ltr', align: 'center' }, p({ dir: 'ltr' }, 'center')),
					td({ dir: 'ltr', align: 'right' }, p({ dir: 'ltr' }, 'right')),
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

	test('serialize from editor', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent(markdownit.render(input))
		expect(serializeMarkdown()).toBe(input)
	})

	test('serialize from editor without thead and tbody', ({ editor, serializeMarkdown }) => {
		const markdownitHtml = output.replaceAll(/<\/?t(head|body)>\n/g, '')
		editor.commands.setContent(markdownitHtml)
		expect(serializeMarkdown()).toBe(input)
	})

	test('parse from HTML: only one row always regarded as header row (required in markdown tables)', ({
		editor,
	}) => {
		const editorHtml
			= '<div class="table-wrapper" style="overflow-x: auto;"><table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></table></div><p></p>'
		const tables = [
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></thead></table>',
			'<table><thead><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></thead></table>',
			'<table><tbody><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></tbody></table>',
			'<table><tbody><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></tbody></table>',
			'<table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></table>',
			'<table><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></table>',
		]
		for (const tableHtml of tables) {
			editor.commands.setContent(tableHtml)
			expect(editor.getHTML()).toBe(editorHtml)
		}
	})

	// Make sure
	test('parse from HTML: first row is header, second is body row with several thead/tbody and th/td combinations', ({
		editor,
	}) => {
		const editorHtml
			= '<div class="table-wrapper" style="overflow-x: auto;"><table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td dir="ltr"><p dir="ltr">a</p></td><td dir="ltr"><p dir="ltr">b</p></td></tr></table></div><p></p>'
		const tables = [
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></thead><tbody><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></tbody></table>',
			'<table><thead><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr></thead><tbody><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></tbody></table>',
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr></thead><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></table>',
			'<table><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></table>',
			'<table><thead><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></thead></table>',
			'<table><thead><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></thead></table>',
			'<table><tbody><tr><th dir="ltr">first</th><th dir="ltr">second</th></tr><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></tbody></table>',
			'<table><tbody><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></tbody></table>',
			'<table><tr><td dir="ltr">first</td><td dir="ltr">second</td></tr><tr><td><p dir="ltr">a</p></td><td><p dir="ltr">b</p></td></tr></table>',
		]
		for (const tableHtml of tables) {
			editor.commands.setContent(tableHtml)
			expect(editor.getHTML()).toBe(editorHtml)
		}
	})

	test('sorts table body rows in ascending order by selected column', ({
		editor,
	}) => {
		editor.commands.setContent(markdownit.render('| col0 | col1 |\n|---|---|\n| 2 | b |\n| 10 | a |\n| 1 | c |\n'))

		let cell
		cell = getHeaderCell(editor, 0)
		expect(editor.commands.sortColumn('asc', cell)).toBe(true)

		expect(getBodyColumnValues(editor, 0)).toEqual(['1', '2', '10'])
		expect(getBodyColumnValues(editor, 1)).toEqual(['c', 'b', 'a'])

		cell = getHeaderCell(editor, 1)
		expect(editor.commands.sortColumn('asc', cell)).toBe(true)

		expect(getBodyColumnValues(editor, 0)).toEqual(['10', '2', '1'])
		expect(getBodyColumnValues(editor, 1)).toEqual(['a', 'b', 'c'])
	})

	test('sorts table body rows in descending order by selected column', ({
		editor,
	}) => {
		editor.commands.setContent(markdownit.render('| col0 | col1 |\n|---|---|\n| 2 | b |\n| 10 | a |\n| 1 | c |\n'))

		let cell
		cell = getHeaderCell(editor, 0)
		expect(editor.commands.sortColumn('desc', cell)).toBe(true)

		expect(getBodyColumnValues(editor, 0)).toEqual(['10', '2', '1'])
		expect(getBodyColumnValues(editor, 1)).toEqual(['a', 'b', 'c'])

		cell = getHeaderCell(editor, 1)
		expect(editor.commands.sortColumn('desc', cell)).toBe(true)

		expect(getBodyColumnValues(editor, 0)).toEqual(['1', '2', '10'])
		expect(getBodyColumnValues(editor, 1)).toEqual(['c', 'b', 'a'])
	})
})

function getHeaderCell(editor, targetIndex = 0) {
	let cell
	editor.state.doc.descendants((node) => {
		if (!['tableHeadRow', 'tableRow'].includes(node.type.name)) {
			return true
		}
		if (targetIndex >= node.childCount) {
			return false
		}

		cell = node.child(targetIndex)
		return false
	})
	return cell
}

function getBodyColumnValues(editor, columnIndex) {
	const values = []
	editor.state.doc.descendants((node) => {
		if (node.type.name !== 'tableRow') {
			return true
		}
		if (columnIndex < node.childCount) {
			values.push(node.child(columnIndex).textContent.trim())
		}
		return true
	})
	return values
}

function formatHTML(html) {
	return html.replaceAll('><', '>\n<').replace(/\n$/, '')
}

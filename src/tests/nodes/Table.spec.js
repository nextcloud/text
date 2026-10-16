/* eslint-disable @stylistic/function-paren-newline */
/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { showWarning } from '@nextcloud/dialogs'
import { TextSelection } from '@tiptap/pm/state'
import { CellSelection } from '@tiptap/pm/tables'
import { builders } from 'prosemirror-test-builder'
import { vi } from 'vitest'
import RichText from '../../extensions/RichText.js'
import markdownit from '../../markdownit/index.ts'
import EditableTable from '../../nodes/EditableTable.ts'
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

	test('md table with marks in header cells is preserved through editor', ({ markdownThroughEditor }) => {
		const table = `
| **bold** | *italic* | ~~strike~~ | \`code\` | [link](https://example.org) |
|----------|----------|------------|--------|-----------------------------|
| 1        | 2        | 3          | 4      | 5                           |
`.trimStart()

		expect(markdownThroughEditor(table)).toBe(table)
	})

	test('md table with block syntax at start of header cells is preserved through editor', ({ markdownThroughEditor }) => {
		const table = `
| # | - item | 1. item | > quote |
|---|--------|---------|---------|
| 1 | 2      | 3       | 4       |
`.trimStart()

		expect(markdownThroughEditor(table)).toBe(table)
	})

	test('md table with multiple pipes in cells is preserved through editor', ({ markdownThroughEditor }) => {
		const table = `
| a \\| b \\| c | d |
|-------------|---|
| 1 \\| 2 \\| 3 | 4 |
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

	test('multiline text pasted into header cell is flattened to single line', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent('<table><tr><th>X</th><th>b</th></tr><tr><td>1</td><td>2</td></tr></table>')
		editor.view.dispatch(editor.state.tr.setSelection(TextSelection.create(editor.state.doc, 4)))
		editor.view.pasteText('Street 1\nCity\n\nCountry')
		expect(serializeMarkdown()).toBe('| XStreet 1 City Country | b |\n|------------------------|---|\n| 1                      | 2 |\n')
	})

	test('blocks and hard breaks pasted into header cell are flattened keeping marks', ({ editor, serializeMarkdown }) => {
		editor.commands.setContent('<table><tr><th>X</th></tr><tr><td>1</td></tr></table>')
		editor.view.dispatch(editor.state.tr.setSelection(TextSelection.create(editor.state.doc, 4)))
		editor.view.pasteHTML('<p>one <strong>bold</strong></p><ul><li>item</li></ul><p>a<br>b</p>')
		expect(serializeMarkdown()).toBe('| Xone **bold** item a b |\n|------------------------|\n| 1                      |\n')
	})

	test('multiline header cell in markdown is loaded as single line', ({ markdownThroughEditor }) => {
		const table = '| a | b | \\\n| c |   |\n|---|---|\n| 1 | 2 |\n'
		expect(markdownThroughEditor(table)).toBe('| a c | b |\n|-----|---|\n| 1   | 2 |\n')
	})

	describe('pasting cells into a table', () => {
		const table = '<table><tr><th>H1</th><th>H2</th></tr>'
			+ '<tr><td><p>a1</p></td><td><p>a2</p></td></tr>'
			+ '<tr><td><p>b1</p><ul><li><p>item</p></li></ul></td><td><p>b2</p></td></tr></table>'

		test('single copied cell is pasted as content of the target cell', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			const html = copyCells(editor, 4, 4)
			placeCursorInCell(editor, 3)
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2     |\n|--------|--------|\n| a1     | b1     | \\\n|        |        | \\\n|        | - item | \\\n|        |        | \\\n|        | a2     |\n| b1     | b2     | \\\n|        |        | \\\n| - item |        |\n')
		})

		test('single copied cell starting with a list keeps the list', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent('<table><tr><th>H1</th><th>H2</th></tr>'
				+ '<tr><td><ul><li><p>item</p></li></ul><p>a1</p></td><td><p>xy</p></td></tr></table>')
			const html = copyCells(editor, 2, 2)
			const pos = findText(editor, 'xy') + 1
			editor.view.dispatch(editor.state.tr.setSelection(TextSelection.create(editor.state.doc, pos)))
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2     |\n|--------|--------|\n| - item | x      | \\\n|        |        | \\\n| a1     | - item | \\\n|        |        | \\\n|        | a1y    |\n')
		})

		test('copied block of cells overwrites target cells and adds rows', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			const html = copyCells(editor, 2, 5)
			placeCursorInCell(editor, 4)
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2 |\n|--------|----|\n| a1     | a2 |\n| a1     | a2 |\n| b1     | b2 | \\\n|        |    | \\\n| - item |    |\n')
		})

		test('copied row of cells adds columns', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			const html = copyCells(editor, 2, 3)
			placeCursorInCell(editor, 5)
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2 |    |\n|--------|----|----|\n| a1     | a2 |    |\n| b1     | a1 | a2 | \\\n|        |    |    | \\\n| - item |    |    |\n')
		})

		test('copied header cell is pasted as body cell content', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			const html = copyCells(editor, 0, 2)
			placeCursorInCell(editor, 5)
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2 |\n|--------|----|\n| a1     | a2 |\n| b1     | H1 | \\\n|        |    | \\\n| - item |    |\n|        | a1 |\n')
		})

		test('table from a spreadsheet app is pasted cell by cell', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			placeCursorInCell(editor, 2)
			editor.view.pasteHTML('<table><colgroup><col width="85"></colgroup>'
				+ '<tr><td>x1</td><td>y1</td></tr>'
				+ '<tr><td>x2</td><td><b>y2</b></td></tr></table>')
			expect(serializeMarkdown()).toBe('| H1 | H2     |\n|----|--------|\n| x1 | y1     |\n| x2 | **y2** |\n')
		})

		test('table with other content is rejected as nested table', ({ editor, serializeMarkdown }) => {
			vi.mocked(showWarning).mockClear()
			editor.commands.setContent(table)
			placeCursorInCell(editor, 2)
			editor.view.pasteHTML('<p>text</p><table><tr><td>x1</td></tr><tr><td>x2</td></tr></table>')
			expect(showWarning).toHaveBeenCalledOnce()
			expect(serializeMarkdown()).toBe('| H1     | H2 |\n|--------|----|\n| a1     | a2 |\n| b1     | b2 | \\\n|        |    | \\\n| - item |    |\n')
		})

		test('text copied inside a cell is pasted as text', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			const html = copyText(editor, 'a1', 'a1')
			placeCursorInCell(editor, 5)
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2   |\n|--------|------|\n| a1     | a2   |\n| b1     | a1b2 | \\\n|        |      | \\\n| - item |      |\n')
		})

		test('blocks copied inside a cell are pasted as blocks', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			const html = copyText(editor, 'b1', 'item')
			placeCursorInCell(editor, 3)
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2       |\n|--------|----------|\n| a1     | b1       | \\\n|        |          | \\\n|        | - itema2 |\n| b1     | b2       | \\\n|        |          | \\\n| - item |          |\n')
		})

		test('text copied inside a header cell is pasted as text', ({ editor, serializeMarkdown }) => {
			editor.commands.setContent(table)
			const html = copyText(editor, 'H1', 'H1')
			placeCursorInCell(editor, 5)
			editor.view.pasteHTML(html)
			expect(serializeMarkdown()).toBe('| H1     | H2   |\n|--------|------|\n| a1     | a2   |\n| b1     | H1b2 | \\\n|        |      | \\\n| - item |      |\n')
		})
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

/**
 * Positions of all table cells in document order
 *
 * @param {object} editor - the tiptap editor
 */
function getCellPositions(editor) {
	const positions = []
	editor.state.doc.descendants((node, pos) => {
		if (['tableHeader', 'tableCell'].includes(node.type.name)) {
			positions.push(pos)
		}
	})
	return positions
}

/**
 * Select cells and return the HTML that copying them puts into the clipboard
 *
 * @param {object} editor - the tiptap editor
 * @param {number} anchor - index of the first selected cell
 * @param {number} head - index of the last selected cell
 */
function copyCells(editor, anchor, head) {
	const positions = getCellPositions(editor)
	const selection = CellSelection.create(editor.state.doc, positions[anchor], positions[head])
	editor.view.dispatch(editor.state.tr.setSelection(selection))
	return editor.view.serializeForClipboard(selection.content()).dom.innerHTML
}

/**
 * Select text and return the HTML that copying it puts into the clipboard
 *
 * @param {object} editor - the tiptap editor
 * @param {string} first - text at the start of the selection
 * @param {string} last - text at the end of the selection
 */
function copyText(editor, first, last) {
	const from = findText(editor, first)
	const to = findText(editor, last) + last.length
	const selection = TextSelection.create(editor.state.doc, from, to)
	editor.view.dispatch(editor.state.tr.setSelection(selection))
	return editor.view.serializeForClipboard(selection.content()).dom.innerHTML
}

/**
 * Position of the first occurrence of a text in the document
 *
 * @param {object} editor - the tiptap editor
 * @param {string} text - the text to find
 */
function findText(editor, text) {
	let found
	editor.state.doc.descendants((node, pos) => {
		if (found === undefined && node.isText && node.text.includes(text)) {
			found = pos + node.text.indexOf(text)
		}
		return found === undefined
	})
	return found
}

/**
 * Place the cursor at the start of a body cell
 *
 * @param {object} editor - the tiptap editor
 * @param {number} index - index of the cell
 */
function placeCursorInCell(editor, index) {
	const pos = getCellPositions(editor)[index] + 2
	editor.view.dispatch(editor.state.tr.setSelection(TextSelection.create(editor.state.doc, pos)))
}

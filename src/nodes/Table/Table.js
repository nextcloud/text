/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes } from '@tiptap/core'
import { Table } from '@tiptap/extension-table'
import TableCaption from './TableCaption.js'
import TableCell from './TableCell.js'
import TableHeader from './TableHeader.js'
import TableHeadRow from './TableHeadRow.js'
import TableRow from './TableRow.js'
import { TextSelection } from '@tiptap/pm/state'
import {
	addRowAfter,
	addRowBefore,
	isInTable,
	moveCellForward,
	selectedRect,
	selectionCell,
} from '@tiptap/pm/tables'
import { Node } from '@tiptap/pm/model'

/**
 *
 * @param {object} schema - schema of the editor
 * @param {number} rowsCount - number of rows in the table
 * @param {number} colsCount - number of cols in the table
 * @param {object} cellContent - currently unused
 */
function createTable(schema, rowsCount, colsCount, cellContent) {
	const headerCells = []
	const cells = []
	for (let index = 0; index < colsCount; index += 1) {
		const cell = schema.nodes.tableCell.createAndFill()
		if (cell) {
			cells.push(cell)
		}
		const headerCell = schema.nodes.tableHeader.createAndFill()
		if (headerCell) {
			headerCells.push(headerCell)
		}
	}
	const headRow = schema.nodes.tableHeadRow.createChecked(null, headerCells)
	const rows = []
	for (let index = 1; index < rowsCount; index += 1) {
		rows.push(schema.nodes.tableRow.createChecked(null, cells))
	}
	return schema.nodes.table.createChecked(null, [headRow, ...rows])
}

/**
 *
 * @param {object} $cell - resolved position of the current cell
 */
function findSameCellInNextRow($cell) {
	if ($cell.index(-1) === $cell.node(-1).childCount - 1) {
		return null
	}
	let cellStart = $cell.after()
	const table = $cell.node(-1)
	for (let row = $cell.indexAfter(-1); row < table.childCount; row++) {
		const rowNode = table.child(row)
		if (rowNode.childCount >= $cell.index()) {
			for (let cell = 0; cell < $cell.index(); cell++) {
				const cellNode = rowNode.child(cell)
				cellStart += cellNode.nodeSize
			}
			return cellStart + 1
		}
		cellStart += rowNode.nodeSize
	}
}

/**
 *
 * @param {Node} node - Table node
 */
function getColumns(node) {
	const columns = []

	node.content.forEach((row) => {
		row.content.forEach((cell, offset, columnIndex) => {
			if (!columns[columnIndex]) {
				columns[columnIndex] = []
			}
			columns[columnIndex].push(cell)
		})
	})

	return columns
}

/**
 *
 * @param {Array} columns - Columns of table
 */
function calculateColumnWidths(columns) {
	const widths = []

	columns.forEach((column) => {
		let maxWidth = 0

		column.forEach((cell) => {
			let cellWidth = 0
			cell.content.forEach(node => {
				cellWidth += (node.text?.length || 6)
				if (node.text?.includes('|')) cellWidth += 1
			})
			maxWidth = Math.max(maxWidth, cellWidth)
		})

		widths.push(maxWidth)
	})

	return widths
}

export default Table.extend({
	content: 'tableCaption? tableHeadRow tableRow*',

	addExtensions() {
		return [
			TableCaption,
			TableCell,
			TableHeader,
			TableHeadRow,
			TableRow,
		]
	},

	addCommands() {
		return {
			...this.parent(),
			addRowAfter: () => ({ chain, dispatch }) => {
				return chain()
					.command(({ state }) => addRowAfter(state, dispatch))
					.command(({ state, tr }) => {
						const { tableStart, table, bottom } = selectedRect(state)

						if (dispatch) {
							const lastRow = table.child(bottom - 1)
							const newRow = table.child(bottom)
							let pos = tableStart + 1
							for (let i = 0; i < bottom; i++) { pos += table.child(i).nodeSize }

							for (let i = 0; i < lastRow.childCount; i++) {
								tr.setNodeAttribute(
									pos,
									'textAlign',
									lastRow.child(i).attrs.textAlign,
								)
								pos += newRow.child(i).nodeSize
							}
						}
						return true
					})
					.run()
			},
			addRowBefore: () => ({ chain, dispatch }) =>
				chain()
					.command(({ state }) => addRowBefore(state, dispatch))
					.command(({ state, tr }) => {
						const { tableStart, table, top } = selectedRect(state)
						if (dispatch) {
							const lastRow = table.child(top)
							const newRow = table.child(top - 1)
							let pos = tableStart + 1
							for (let i = 0; i < (top - 1); i++) { pos += table.child(i).nodeSize }

							for (let i = 0; i < lastRow.childCount; i++) {
								tr.setNodeAttribute(
									pos,
									'textAlign',
									lastRow.child(i).attrs.textAlign,
								)
								pos += newRow.child(i).nodeSize
							}
						}
						return true
					})
					.run(),
			insertTable: () => ({ tr, dispatch, editor }) => {
				if (isInTable(tr)) return false
				const node = createTable(editor.schema, 3, 3, true)
				if (dispatch) {
					const offset = tr.selection.anchor + 1
					tr.replaceSelectionWith(node)
						.scrollIntoView()
						.setSelection(TextSelection.near(tr.doc.resolve(offset)))
				}
				return true
			},
			// move to the next node after the table from the last cell
			leaveTable: () => ({ tr, dispatch, editor }) => {
				if (!isInTable(tr)) return false
				const { $head, empty } = tr.selection
				if (!empty) return false
				// the selection can temporarily be inside the table but outside of cells.
				const tableDepth = $head.depth < 3 ? 1 : $head.depth - 2
				if (dispatch) {
					const $next = tr.doc.resolve($head.after(tableDepth) + 1)
					const selection = TextSelection.near($next)
					dispatch(tr.setSelection(selection).scrollIntoView())
				}
				return true
			},
			goToNextRow: () => ({ tr, dispatch, editor }) => {
				if (!isInTable(tr)) return false
				const cell = findSameCellInNextRow(selectionCell(tr))
				if (cell == null) return
				if (dispatch) {
					const $cell = tr.doc.resolve(cell)
					const selection = TextSelection.between($cell, moveCellForward($cell))
					dispatch(tr.setSelection(selection).scrollIntoView())
				}
				return true
			},
		}
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'div',
			{ class: 'table-wrapper', style: 'overflow-x: auto;' },
			['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0],
		]
	},

	toMarkdown(state, node) {
		const columns = getColumns(node)
		state.options.columnWidths = calculateColumnWidths(columns)
		state.options.currentHeaderIndex = 0
		state.renderContent(node)
		state.closeBlock(node)
	},

	addKeyboardShortcuts() {
		return {
			...this.parent(),
			Tab: () => this.editor.commands.goToNextCell() || this.editor.commands.leaveTable(),
			Enter: ({ editor }) => {
				const { selection } = editor.state
				if (!selection.$from.parent.type.name.startsWith('table')) return false

				if (selection.$from.nodeBefore?.type.name === 'hardBreak') {
					if (editor.can().goToNextRow() || editor.can().addRowAfter()) {
						// Remove previous hard break and move to next row instead
						editor.chain()
							.setTextSelection({ from: selection.from - 1, to: selection.from })
							.deleteSelection()
							.run()
						if (editor.commands.goToNextRow()) return true
						return editor.chain().addRowAfter().goToNextRow().run()
					}
					return false
				} else {
					return editor.chain()
						.insertContent('<br data-syntax="html" />')
						.focus()
						.run()
				}
			},
		}
	},

})

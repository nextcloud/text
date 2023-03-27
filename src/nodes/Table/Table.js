import { mergeAttributes } from '@tiptap/core'
import { Table } from '@tiptap/extension-table'
import TableCaption from './TableCaption.js'
import TableCell from './TableCell.js'
import TableHeader from './TableHeader.js'
import TableHeadRow from './TableHeadRow.js'
import TableRow from './TableRow.js'
import { TextSelection } from 'prosemirror-state'
import { isInTable, moveCellForward, selectionCell } from '@tiptap/prosemirror-tables'

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
		state.renderContent(node)
		state.closeBlock(node)
	},

	addKeyboardShortcuts() {
		return {
			...this.parent(),
			Tab: () => this.editor.commands.goToNextCell() || this.editor.commands.leaveTable(),
			Enter: () => {
				if (this.editor.commands.goToNextRow()) {
					return true
				}

				if (!this.editor.can().addRowAfter()) {
					return false
				}

				return this.editor
					.chain()
					.addRowAfter()
					.goToNextRow()
					.run()
			},
		}
	},

})

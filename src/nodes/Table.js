import { Table } from '@tiptap/extension-table'
import { Node, mergeAttributes } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state'

/*
 * Markdown tables do not include captions.
 * We still need to parse them though
 * because otherwise tiptap will try to insert their text content
 * and put it in the top row of the table.
 */
const tableCaption = Node.create({
	name: 'tableCaption',
	content: 'inline*',
	addAttributes() {
		return {}
	},

	renderHTML() {
		return ['caption']
	},

	toMarkdown(state, node) {
	},

	parseHTML() {
		return [
			{ tag: 'table caption', priority: 90 },
		]
	},

})

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

export default Table.extend({
	content: 'tableCaption? tableHeadRow tableRow*',

	addExtensions() {
		return [
			tableCaption,
		]
	},

	addCommands() {
		return {
			...this.parent(),
			insertTable: () => ({ tr, dispatch, editor }) => {
				const node = createTable(editor.schema, 3, 3, true)
				if (dispatch) {
					const offset = tr.selection.anchor + 1
					tr.replaceSelectionWith(node)
						.scrollIntoView()
						.setSelection(TextSelection.near(tr.doc.resolve(offset)))
				}
				return true
			},
		}
	},

	renderHTML({ HTMLAttributes }) {
		return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
		state.closeBlock(node)
	},

})

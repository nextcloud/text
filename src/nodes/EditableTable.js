import Table from './Table.js'
import TableCaption from './TableCaption.js'
import TableCell from './TableCell.js'
import TableHeader from './TableHeader.js'
import TableHeadRow from './TableHeadRow.js'
import TableRow from './TableRow.js'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TableView from './TableView.vue'
import TableCellView from './TableCellView.vue'
import TableHeaderView from './TableHeaderView.vue'

/**
 * Add the node view to the node.
 * The node views include buttons to enable editing the table.
 *
 * @param {object} node - the node to add the view to.
 * @param {object} view - the node view to add to the node.
 */
function extendNodeWithView(node, view) {
	return node.extend({
		addNodeView() {
			return VueNodeViewRenderer(view)
		},
	})
}

export default Table.extend({

	addNodeView() {
		return VueNodeViewRenderer(TableView)
	},

	addExtensions() {
		return [
			TableCaption,
			extendNodeWithView(TableCell, TableCellView),
			extendNodeWithView(TableHeader, TableHeaderView),
			TableHeadRow,
			TableRow,
		]
	},
})

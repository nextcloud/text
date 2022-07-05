import { TableCell } from '@tiptap/extension-table-cell'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TableCellView from './TableCellView.vue'

export default TableCell.extend({
	content: 'inline*',

	toMarkdown(state, node) {
		state.write(' ')
		state.renderInline(node)
		state.write(' |')
	},

	parseHTML() {
		return [
			{ tag: 'td' },
			{ tag: 'th' },
			{ tag: 'table thead ~ tbody th', priority: 70 },
			{ tag: 'table thead ~ tbody td', priority: 70 },
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(TableCellView)
	},

})

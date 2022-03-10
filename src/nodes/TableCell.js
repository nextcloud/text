import { TableCell } from '@tiptap/extension-table-cell'

export default TableCell.extend({
	content: 'inline*',

	addAttributes() {
		return {}
	},

	toMarkdown(state, node) {
		state.write(' ')
		state.renderInline(node)
		state.write(' |')
	},

})

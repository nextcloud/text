import { TableRow } from '@tiptap/extension-table-row'

export default TableRow.extend({
	content: 'tableCell*',
	addAttributes() {
		return {}
	},

	toMarkdown(state, node) {
		state.write('|')
		state.renderInline(node)
	},

	parseHTML() {
		return [
			{ tag: 'tr', priority: 80 },
		]
	},
})

import { TableRow } from '@tiptap/extension-table-row'

export default TableRow.extend({
	content: 'tableCell*',

	toMarkdown(state, node) {
		state.write('|')
		state.renderInline(node)
		state.ensureNewLine()
	},

	parseHTML() {
		return [
			{ tag: 'tr', priority: 80 },
		]
	},
})

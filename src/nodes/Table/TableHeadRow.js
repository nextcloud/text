import TableRow from './TableRow.js'

export default TableRow.extend({
	name: 'tableHeadRow',
	content: 'tableHeader*',

	toMarkdown(state, node) {
		state.write('|')
		state.renderInline(node)
		state.ensureNewLine()
		state.write('|')
		node.forEach(cell => {
			state.write(state.repeat('-', cell.textContent.length + 2))
			state.write('|')
		})
		state.ensureNewLine()
	},

	parseHTML() {
		return [
			{ tag: 'tr', priority: 70 },
		]
	},
})

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
			let row = state.repeat('-', cell.textContent.length + 2)
			const align = cell.attrs?.textAlign
			if (align === 'center' || align === 'left') row = ':' + row.slice(1)
			if (align === 'center' || align === 'right') row = row.slice(0, -1) + ':'
			state.write(row)
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

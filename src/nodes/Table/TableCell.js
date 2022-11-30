import { TableCell } from '@tiptap/extension-table-cell'

export default TableCell.extend({
	content: 'inline*',

	toMarkdown(state, node) {
		state.write(' ')
		const backup = state.options?.escapeExtraCharacters
		state.options.escapeExtraCharacters = /\|/
		state.renderInline(node)
		state.options.escapeExtraCharacters = backup
		state.write(' |')
	},

	parseHTML() {
		return [
			{ tag: 'td', preserveWhitespace: true },
			{ tag: 'th', preserveWhitespace: true },
			{ tag: 'table thead ~ tbody th', priority: 70, preserveWhitespace: true },
			{ tag: 'table thead ~ tbody td', priority: 70, preserveWhitespace: true },
		]
	},

})

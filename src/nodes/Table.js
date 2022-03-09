import { Table } from '@tiptap/extension-table'
import { mergeAttributes } from '@tiptap/core'

export default Table.extend({
	content: 'tableHead tableBody',

	renderHTML({ HTMLAttributes }) {
		return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown(state, node) {
		const widths = []
		const head = node.child(0)
		const body = node.child(1)
		head.forEach(row => {
			state.write('|')
			row.forEach(cell => {
				widths.push(cell.textContent.length)
				state.renderInline(cell)
				state.write('|')
			})
		})
		state.ensureNewLine()
		state.write('|')
		widths.forEach(width => {
			state.write(state.repeat('-', width))
			state.write('|')
		})
		body.forEach(row => {
			state.ensureNewLine()
			state.write('|')
			row.forEach((cell, _, i) => {
				state.renderInline(cell)
				state.write(state.repeat(' ', widths[i] - cell.textContent.length))
				state.write('|')
			})
		})
		state.closeBlock(node)
	},

})

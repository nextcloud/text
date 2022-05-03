import { Node, mergeAttributes } from '@tiptap/core'
import TableHeadRow from './TableHeadRow.js'

export default Node.create({
	name: 'tableHead',
	content: 'tableHeadRow',
	tableRole: 'head',

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	addExtensions() {
		return [
			TableHeadRow,
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['thead', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
		const row = node.child(0)
		state.write('|')
		row.forEach(cell => {
			state.write(state.repeat('-', cell.textContent.length + 2))
			state.write('|')
		})
		state.ensureNewLine()
	},

})

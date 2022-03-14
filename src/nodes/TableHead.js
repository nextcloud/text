import { Node, mergeAttributes } from '@tiptap/core'

const tableHeadRow = Node.create({
	name: 'tableHeadRow',
	content: 'tableHeader*',
	tableRole: 'headRow',

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	parseHTML() {
		return [
			{ tag: 'tr' },
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['tr', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown(state, node) {
		state.write('|')
		state.renderInline(node)
		state.ensureNewLine()
	},

})

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
			tableHeadRow,
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

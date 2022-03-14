import { Table } from '@tiptap/extension-table'
import { Node, mergeAttributes } from '@tiptap/core'

/*
 * Markdown tables do not include captions.
 * We still need to parse them though
 * because otherwise tiptap will try to insert their text content
 * and put it in the top row of the table.
 */
const tableCaption = Node.create({
	name: 'tableCaption',
	content: 'inline*',
	addAttributes() {
		return {}
	},

	renderHTML() {
		return ['caption']
	},

	toMarkdown(state, node) {
	},

	parseHTML() {
		return [
			{ tag: 'table caption', priority: 90 },
		]
	},
})

export default Table.extend({
	content: 'tableCaption? tableHead tableBody',

	addExtensions() {
		return [
			tableCaption,
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
	},

})

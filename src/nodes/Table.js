import { Table } from '@tiptap/extension-table'
import { mergeAttributes } from '@tiptap/core'

export default Table.extend({
	content: 'tableHead tableBody',

	renderHTML({ HTMLAttributes }) {
		return ['table', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
	},

})

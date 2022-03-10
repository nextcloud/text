import { TableHeader } from '@tiptap/extension-table-header'

export default TableHeader.extend({
	content: 'inline*',

	addAttributes() {
		return {}
	},

	toMarkdown(state, node) {
		state.write(' ')
		state.renderInline(node)
		state.write(' |')
	},

})

import { TableHeader } from '@tiptap/extension-table-header'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import TableHeaderView from './TableHeaderView.vue'

export default TableHeader.extend({
	content: 'inline*',

	toMarkdown(state, node) {
		state.write(' ')
		state.renderInline(node)
		state.write(' |')
	},

	parseHTML() {
		return [
			{ tag: 'table thead:empty ~ tbody :first-child th', priority: 80 },
			{ tag: 'table thead:empty ~ tbody :first-child td', priority: 80 },
			{ tag: 'table thead :first-child th', priority: 60 },
			{ tag: 'table thead :first-child td', priority: 60 },
			{ tag: 'table tbody :first-child th', priority: 60 },
			{ tag: 'table tbody :first-child td', priority: 60 },
			{ tag: 'table > :first-child > th', priority: 60 },
			{ tag: 'table > :first-child > td', priority: 60 },
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(TableHeaderView)
	},

})

import { Node, mergeAttributes } from '@tiptap/core'

const tableHeadRow = Node.create({
	name: 'tableHeadRow',
	content: 'tableHeader*',

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

})

export default Node.create({
	name: 'tableHead',
	content: 'tableHeadRow',

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	addExtensions() {
		return [tableHeadRow]
	},

	parseHTML() {
		return [
			{ tag: 'thead' },
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['thead', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

})

import { Node, mergeAttributes } from '@tiptap/core'

export default Node.create({
	name: 'tableBody',
	content: 'tableRow',

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	parseHTML() {
		return [
			{ tag: 'tbody' },
		]
	},

	renderHTML({ HTMLAttributes }) {
		return ['tbody', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

})

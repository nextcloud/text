import { Node, mergeAttributes } from '@tiptap/core'

export default Node.create({
	name: 'tableBody',
	content: 'tableRow*',
	tableRole: 'body',

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	renderHTML({ HTMLAttributes }) {
		return ['tbody', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
	},

})

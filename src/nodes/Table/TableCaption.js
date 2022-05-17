import { Node } from '@tiptap/core'

/*
 * Markdown tables do not include captions.
 * We still need to parse them though
 * because otherwise tiptap will try to insert their text content
 * and put it in the top row of the table.
 */
export default Node.create({
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

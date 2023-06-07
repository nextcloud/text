import TiptapParagraph from '@tiptap/extension-paragraph'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import ParagraphView from './ParagraphView.vue'

const Paragraph = TiptapParagraph.extend({

	addNodeView() {
		return VueNodeViewRenderer(ParagraphView)
	},

	parseHTML() {
		return this.parent().map(rule => Object.assign(rule, { preserveWhitespace: 'full' }))
	},

	addKeyboardShortcuts() {
		return {
			Backspace: () => {
				// Check that cursor is at beginning of text
				const selection = this.editor.state.selection
				if (selection.$from.parentOffset !== 0) return false

				const node = selection.$from.parent
				const index = selection.$from.index(selection.$from.depth - 1)
				// Check there is a leading sibling
				if (index === 0) return false

				const parent = selection.$from.node(selection.$from.depth - 1)
				const previousNode = parent.child(index - 1)
				// Check this and the previous sibling are paragraphs
				if (node.type.name === this.name
					&& previousNode.type.name === this.name) {
					return this.editor.chain().joinBackward().setHardBreak().run()
				}
				return false
			},
		}
	},
})

export default Paragraph

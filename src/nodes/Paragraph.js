import TiptapParagraph from '@tiptap/extension-paragraph'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import { isMobile } from '../helpers/platform.js'
import ParagraphView from './ParagraphView.vue'

const Paragraph = TiptapParagraph.extend({

	addNodeView() {
		return VueNodeViewRenderer(ParagraphView)
	},

	parseHTML() {
		return this.parent().map(rule => Object.assign(rule, { preserveWhitespace: 'full' }))
	},

	// Allow hard breaks to be inserted on mobile devices
	addKeyboardShortcuts() {
		return {
			...this.parent?.(),
			Enter: ({ editor }) => {
				if (!isMobile()) return false

				const { selection } = editor.state
				const atBeginning = selection.$from.parentOffset === 0
				if (selection.$from.parent.type !== this.type || atBeginning) return false

				if (selection.$from.nodeBefore.type.name === 'hardBreak') {
					// Remove previous hard break and split paragraph
					editor.chain()
						.setTextSelection(selection.from - 1)
						.deleteNode()
						.splitBlock({ keepMarks: true })
						.run()
				} else {
					editor.commands.setHardBreak()
				}
				return true
			},
		}
	},
})

export default Paragraph

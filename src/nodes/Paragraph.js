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

})

export default Paragraph

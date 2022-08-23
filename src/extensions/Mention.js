import TipTapMention from '@tiptap/extension-mention'
import Mention from './Mention.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

export default TipTapMention.extend({
	parseHTML() {
		return [
			{
				tag: 'span[data-type="user"]',
				getAttrs: element => ((element.getAttribute('data-type') === 'user')
					&& (element.getAttribute('class') === 'mention')
					&& null),
				priority: 100,
			},
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(Mention)
	},

	toMarkdown(state, node) {
		state.write(' ')
		state.write(`@[${node.attrs.id}](mention://user/${node.attrs.label})`)
		state.write(' ')
	},
})

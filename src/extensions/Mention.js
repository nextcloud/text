import TipTapMention from '@tiptap/extension-mention'
import Mention from './Mention.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

export default TipTapMention.extend({

	parseHTML() {
		return [
			{
				tag: 'span[data-type="user"]',
				getAttrs: element => {
					return {
						id: element.getAttribute('data-id'),
						label: element.innerText ?? element.getAttribute('data-id'),
					}
				},
				priority: 100,
			},
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(Mention)
	},

	toMarkdown(state, node) {
		state.write(' ')
		state.write(`@[${node.attrs.label}](mention://user/${node.attrs.id})`)
		state.write(' ')
	},
})

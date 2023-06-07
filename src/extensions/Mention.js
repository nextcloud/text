import TipTapMention from '@tiptap/extension-mention'
import Mention from './Mention.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import { mergeAttributes } from '@tiptap/core'

export default TipTapMention.extend({
	parseHTML() {
		return [
			{
				tag: 'span[data-type="user"]',
				getAttrs: element => {
					return {
						id: element.getAttribute('data-id'),
						label: element.innerText || element.textContent || element.getAttribute('data-label'),
					}
				},
				priority: 100,
			},
		]
	},

	renderHTML({ node, HTMLAttributes }) {
		return [
			'span',
			mergeAttributes({ 'data-type': 'user', class: 'mention' }, this.options.HTMLAttributes, HTMLAttributes),
			this.options.renderLabel({
				options: this.options,
				node,
			}),
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

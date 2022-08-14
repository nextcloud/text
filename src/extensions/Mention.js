import { mergeAttributes } from '@tiptap/core'
import TipTapMention from '@tiptap/extension-mention'
import { generateUrl } from '@nextcloud/router'
import Mention from './Mention.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

const getAvatarUrl = (user, size) => {
	return generateUrl('/avatar/{user}/{size}', {
		user,
		size,
	})
}

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

	renderHTML({ node, HTMLAttributes }) {
		const avatarUrl = getAvatarUrl(node.attrs.id, 44)

		return [
			'span',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				'data-type': this.name,
				class: 'mention-bubble mention-bubble--primary',
				contenteditable: false,
			}),
			[
				'span',
				{
					class: 'mention-bubble__wrapper',
				},
				[
					'span',
					{
						class: 'mention-bubble__content',
					},
					[
						'span',
						{
							class: 'mention-bubble__icon mention-bubble__icon--with-avatar',
							style: avatarUrl ? `background-image: url('${avatarUrl}')` : '',
						},
					],
					[
						'span',
						{
							role: 'heading',
							class: 'mention-bubble__title',
							title: node.attrs.id,
						},
					],
				],
			],
		]
	},

	toMarkdown(state, node) {
		state.write(' ')
		state.write(`@[${node.attrs.id}](mention://user/${node.attrs.id})`)
		state.write(' ')
	},
})

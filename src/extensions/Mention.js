import { mergeAttributes } from '@tiptap/core'
import TipTapMention from '@tiptap/extension-mention'
import { generateUrl } from '@nextcloud/router'

const getAvatarUrl = (user, size) => {
	return generateUrl('/avatar/{user}/{size}', {
		user,
		size,
	})
};

export default TipTapMention.extend({
	parseHTML() {
		return [
			{
				tag: `span[data-type="${this.name}"]`,
				getAttrs: element => ((element.getAttribute('data-type') === this.name) && null),
				priority: 100,
			},
		]
	},
    
	renderHTML({ node, HTMLAttributes }) {
		const avatarUrl = getAvatarUrl(node.attrs.id, 44)

		return [
			'span',
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				'data-type': this.name,
				'class': 'mention-bubble mention-bubble--primary',
				'contenteditable': false,
			}),
			[
				'span',
				{
					'class': 'mention-bubble__wrapper',
				},
				[
					'span',
					{
						class: 'mention-bubble__content',
					},
					[
						'span',
						{
							'class': `mention-bubble__icon mention-bubble__icon--with-avatar`,
							'style': avatarUrl ? `background-image: url('${avatarUrl}')` : '',
						},
					],
					[
						'span',
						{
							'role': 'heading',
							'class': 'mention-bubble__title',
							'title': node.attrs.id,
						},
					],
				],
			],
		]
	},

	toMarkdown(state, node) {
		state.write('@')
		state.write(node.attrs.id)
		state.write(' ')
	},
});
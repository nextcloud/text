/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

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
						id: decodeURIComponent(element.getAttribute('data-id')),
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
			this.options.renderHTML({
				options: this.options,
				node,
			}),
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(Mention)
	},

	toMarkdown(state, node) {
		state.write(`@[${node.attrs.label}](mention://user/${encodeURIComponent(node.attrs.id)})`)
	},
})

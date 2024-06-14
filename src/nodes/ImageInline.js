/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TiptapImage from '@tiptap/extension-image'
import ImageView from './ImageView.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import { defaultMarkdownSerializer } from '@tiptap/pm/markdown'

// Inline image extension. Needed if markdown contains inline images.
// Not supported to be created from our UI (we default to block images).
const ImageInline = TiptapImage.extend({
	name: 'image-inline',

	// Lower priority than (block) Image extension
	priority: 99,

	selectable: false,

	parseHTML() {
		return [
			{
				tag: this.options.allowBase64
					? 'img[src]'
					: 'img[src]:not([src^="data:"])',
			},
		]
	},

	addOptions() {
		return {
			...this.parent?.(),
			inline: true,
		}
	},

	// Empty commands, we want only those from (block) Image extension
	addCommands() {
		return {}
	},

	// Empty input rules, we want only those from (block) Image extension
	addInputRules() {
		return []
	},

	addNodeView() {
		return VueNodeViewRenderer(ImageView)
	},

	toMarkdown(state, node, parent, index) {
		return defaultMarkdownSerializer.nodes.image(state, node, parent, index)
	},
})

export default ImageInline

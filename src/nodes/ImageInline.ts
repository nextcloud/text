/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { ImageOptions as TiptapImageOptions } from '@tiptap/extension-image'

import TiptapImage from '@tiptap/extension-image'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { defaultMarkdownSerializer } from 'prosemirror-markdown'
import ImageView from './ImageView.vue'

interface ImageOptions extends TiptapImageOptions {
	noLazyImages: boolean
}

// Inline image extension. Needed if markdown contains inline images.
// Not supported to be created from our UI (we default to block images).
const ImageInline = TiptapImage.extend<ImageOptions>({
	name: 'imageInline',

	// Lower priority than (block) Image extension
	priority: 99,

	selectable: false,

	addAttributes() {
		return {
			...this.parent?.(),
			isWikiLink: {
				default: false,
				parseHTML: (element) => element.getAttribute('data-wiki-image') === 'true',
				renderHTML: (attrs) => attrs.isWikiLink ? { 'data-wiki-image': 'true' } : {},
			},
		}
	},

	parseHTML() {
		if (!this.options.allowBase64) {
			return [{ tag: 'img[src]:not([src^="data:"])' }]
		}
		// With base64 parsing on, admit a data: URI only when its mime type is an
		// image one. A data:text/html src then never becomes a node, so the parse
		// rule does not have to rely on the content security policy alone.
		return [
			{ tag: 'img[src]:not([src^="data:"])' },
			{ tag: 'img[src^="data:image/"]' },
		]
	},

	addOptions() {
		return {
			...this.parent?.() as ImageOptions,
			noLazyImages: false,
			inline: true,
			// See Image.ts: data: URI images must survive an edit round-trip
			// instead of being dropped on save (issue #9108).
			allowBase64: true,
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
		if (node.attrs.isWikiLink) {
			state.write(`![[${node.attrs.src}]]`)
		} else {
			return defaultMarkdownSerializer.nodes.image(state, node, parent, index)
		}
	},
})

export default ImageInline

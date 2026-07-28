/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { ImageOptions as TiptapImageOptions } from '@tiptap/extension-image'
import type { Node } from '@tiptap/pm/model'
import type { MarkdownSerializerState } from 'prosemirror-markdown'

import { emit } from '@nextcloud/event-bus'
import TiptapImage from '@tiptap/extension-image'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImageView from './ImageView.vue'
import extractAttachmentSrcs from '../plugins/extractAttachmentSrcs.js'

const imageFileDropPluginKey = new PluginKey('imageFileDrop')
const imageExtractAttachmentsKey = new PluginKey('imageExtractAttachments')

interface ImageOptions extends TiptapImageOptions {
	noLazyImages: boolean
}

const Image = TiptapImage.extend<ImageOptions>({
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
		return [
			{
				tag: this.options.allowBase64
					? 'figure img[src]'
					: 'figure img[src]:not([src^="data:"])',
			},
		]
	},

	renderHTML() {
		// Avoid the prosemirror node creation to trigger image loading as we use a custom node view anyways
		// Otherwise it would attempt to load the image from the current location before the node view is even initialized
		return ['img']
	},

	addOptions() {
		return {
			...this.parent?.() as ImageOptions,
			noLazyImages: false,
		}
	},

	addNodeView() {
		return VueNodeViewRenderer(ImageView)
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: imageFileDropPluginKey,
				props: {
					handleDrop: (view, event) => {
						// only catch the drop if it contains files
						if (
							event.target
							&& event.dataTransfer?.files
							&& event.dataTransfer.files.length > 0
						) {
							const coordinates = view.posAtCoords({
								left: event.clientX,
								top: event.clientY,
							})
							const customEvent = new CustomEvent('file-drop', {
								bubbles: true,
								detail: {
									files: event.dataTransfer.files,
									position: coordinates?.pos,
								},
							})
							event.target.dispatchEvent(customEvent)
							return true
						}
					},
					handlePaste: (view, event) => {
						const data = event.clipboardData
						if (!data) {
							return false
						}

						// Check if the pasted content contains a table, either in HTML or TSV-like format. If so, let the regular paste pipeline handle it.
						const html = data.getData('text/html') || ''
						const text = data.getData('text/plain') || ''

						const hasHtmlTable = /<table[\s>]/i.test(html)
						const hasTsvLikeTable = text.includes('\t') && text.includes('\n')

						if (hasHtmlTable || hasTsvLikeTable) {
							// Let regular paste pipeline parse table content
							return false
						}

						// only catch the paste if it contains files
						if (event.target && data.files && data.files.length > 0) {
							const customEvent = new CustomEvent('image-paste', {
								bubbles: true,
								detail: { files: data.files },
							})
							event.target.dispatchEvent(customEvent)
							return true
						}

						return false
					},
				},
			}),
			new Plugin({
				key: imageExtractAttachmentsKey,
				state: {
					init(_, { doc }) {
						const attachmentSrcs = extractAttachmentSrcs(doc)
						emit('text:editor:attachments:updated', { attachmentSrcs })
						return { attachmentSrcs }
					},
					apply(tr, value, _oldState, newState) {
						if (!tr.docChanged) {
							return value
						}
						const attachmentSrcs = extractAttachmentSrcs(newState.doc)
						if (
							JSON.stringify(attachmentSrcs)
							=== JSON.stringify(value?.attachmentSrcs)
						) {
							return value
						}

						emit('text:editor:attachments:updated', { attachmentSrcs })
						return { attachmentSrcs }
					},
				},
			}),
		]
	},

	/* Serializes an image node as a block image, so it ensures an image is always a block by itself */
	toMarkdown(state: MarkdownSerializerState, node: Node) {
		if (node.attrs.isWikiLink) {
			state.write(`![[${node.attrs.src}]]`)
		} else {
			const alt = node.attrs.alt?.toString() || ''
			// same as in prosemirror-markdown, only with alt changes as above.
			state.write('![' + state.esc(alt) + ']('
				+ node.attrs.src.replace(/[()]/g, '\\$&')
				+ (node.attrs.title ? ' "' + node.attrs.title.replace(/"/g, '\\"') + '"' : '')
				+ ')')
		}
		state.closeBlock(node)
	},
})

export default Image

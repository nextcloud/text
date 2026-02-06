/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { emit } from '@nextcloud/event-bus'
import TiptapImage from '@tiptap/extension-image'
import { defaultMarkdownSerializer } from '@tiptap/pm/markdown'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import extractAttachmentSrcs from '../plugins/extractAttachmentSrcs.ts'
import ImageView from './ImageView.vue'

const imageFileDropPluginKey = new PluginKey('imageFileDrop')
const imageExtractAttachmentsKey = new PluginKey('imageExtractAttachments')

const Image = TiptapImage.extend({
	selectable: false,

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
			...this.parent?.(),
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
					handleDrop: (view, event, slice) => {
						// only catch the drop if it contains files
						if (
							event.dataTransfer.files
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
									position: coordinates.pos,
								},
							})
							event.target.dispatchEvent(customEvent)
							return true
						}
					},
					handlePaste: (view, event, slice) => {
						// only catch the paste if it contains files
						if (
							event.clipboardData.files
							&& event.clipboardData.files.length > 0
						) {
							// let the editor wrapper catch this custom event
							const customEvent = new CustomEvent('image-paste', {
								bubbles: true,
								detail: {
									files: event.clipboardData.files,
								},
							})
							event.target.dispatchEvent(customEvent)
							return true
						}
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
	toMarkdown(state, node, parent, index) {
		node.attrs.alt = node.attrs.alt.toString()
		defaultMarkdownSerializer.nodes.image(state, node, parent, index)
		state.closeBlock(node)
	},
})

export default Image

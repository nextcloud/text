/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import TiptapImage from '@tiptap/extension-image'
import { Plugin } from '@tiptap/pm/state'
import ImageView from './ImageView.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import { defaultMarkdownSerializer } from '@tiptap/pm/markdown'

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
				props: {
					handleDrop: (view, event, slice) => {
						// only catch the drop if it contains files
						if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
							const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
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
						if (event.clipboardData.files && event.clipboardData.files.length > 0) {
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

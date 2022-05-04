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
import { Plugin } from 'prosemirror-state'
import ImageView from './ImageView.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

const Image = TiptapImage.extend({

	selectable: false,

	addOptions() {
		return {
			...this.parent?.(),
			currentDirectory: undefined,
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
							const customEvent = new CustomEvent('image-drop', {
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

})

export default Image

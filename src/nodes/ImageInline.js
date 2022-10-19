/*
 * @copyright Copyright (c) 2022 Jonas <jonas@freesources.org>
 *
 * @author Jonas <jonas@freesources.org>
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
import ImageView from './ImageView.vue'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

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

	toMarkdown(state, node) {
		state.write('![' + state.esc(node.attrs.alt || '') + '](' + node.attrs.src.replace(/[()]/g, '\\$&')
			+ (node.attrs.title ? ' "' + node.attrs.title.replace(/"/g, '\\"') + '"' : '') + ')')
	},
})

export default ImageInline

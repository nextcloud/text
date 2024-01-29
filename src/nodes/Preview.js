/*
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
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

import { Node, isNodeActive } from '@tiptap/core'
import { domHref, parseHref } from './../helpers/links.js'
import { VueNodeViewRenderer } from '@tiptap/vue-2'

import Preview from './Preview.vue'

export default Node.create({

	name: 'preview',

	group: 'block',

	content: 'text?',

	defining: true,

	addOptions() {
		return {
			relativePath: null,
		}
	},

	addAttributes() {
		return {
			href: { parseHTML: parseHref },
			title: { parseHTML: el => el.getAttribute('title') },
		}
	},

	parseHTML() {
		return [
			{
				tag: 'a[title="preview"]',
				priority: 1001,
			},
		]
	},

	renderHTML({ node }) {
		return ['a', {
			...node.attrs,
			href: domHref(node, this.options.relativePath),
			rel: 'noopener noreferrer nofollow',
		}, 0]
	},

	addNodeView() {
		return VueNodeViewRenderer(Preview)
	},

	toMarkdown: (state, node) => {
		state.write(`[`)
		state.text(node.textContent, false)
		state.write(`](${node.attrs.href} (${node.attrs.title}))`)
	},

	addCommands() {
		return {
			setPreview: attrs => ({ commands }) => {
				const attributes = { ...attrs, title: 'preview' }
				return commands.setNode(this.name, attributes)
			},
			togglePreview: attrs => ({ commands }) => {
				const attributes = { ...attrs, title: 'preview' }
				return commands.toggleNode(this.name, 'paragraph', attributes)
			},
		}
	},
})

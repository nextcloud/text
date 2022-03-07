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

import { Node, mergeAttributes } from '@tiptap/core'
import { typesAvailable } from '../markdownit/containers'

export default Node.create({

	name: 'customContainer',

	content: 'block+',

	group: 'block',

	defining: true,

	addOptions() {
		return {
			types: typesAvailable,
			HTMLAttributes: {
				class: 'custom-container',
			},
		}
	},

	addAttributes() {
		return {
			type: {
				default: 'info',
				rendered: false,
				parseHTML: element => element.getAttribute('data-container'),
				renderHTML: attributes => {
					return {
						'data-container': attributes.type,
						class: attributes.type,
					}
				},
			},
		}
	},

	parseHTML() {
		return [
			{
				tag: 'div',
			},
		]
	},

	renderHTML({ node, HTMLAttributes }) {
		const { class: classy } = this.options.HTMLAttributes

		const attributes = {
			...this.options.HTMLAttributes,
			class: `${classy} ${classy}-${node.attrs.type}`,
		}

		return ['div', mergeAttributes(attributes, HTMLAttributes), 0]
	},

	toMarkdown: (state, node) => {
		state.write('::: ' + (node.attrs.type || 'info') + '\n')
		state.renderContent(node)
		state.ensureNewLine()
		state.write(':::')
		state.closeBlock(node)
	},

	addCommands() {
		return {
			setCustomContainer: attributes => ({ commands }) => {
				return commands.wrapIn(this.name, attributes)
			},
			toggleCustomContainer: attributes => ({ commands }) => {
				return commands.toggleWrap(this.name, attributes)
			},
			unsetCustomContainer: () => ({ commands }) => {
				return commands.lift(this.name)
			},
		}
	},
})

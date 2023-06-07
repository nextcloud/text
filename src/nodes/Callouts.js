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

import { Node, isNodeActive, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import { typesAvailable } from './../markdownit/callouts.js'

import Callout from './Callout.vue'

export default Node.create({

	name: 'callout',

	content: 'paragraph+',

	group: 'block',

	defining: true,

	addOptions() {
		return {
			types: typesAvailable,
			HTMLAttributes: {
				class: 'callout',
			},
		}
	},

	addAttributes() {
		return {
			type: {
				default: 'info',
				rendered: false,
				parseHTML: element => {
					return element.getAttribute('data-callout')
						|| typesAvailable.find((type) => element.classList.contains(type))
						|| (element.classList.contains('warning') && 'warn')
				},
				renderHTML: attributes => {
					return {
						'data-callout': attributes.type,
						class: `callout-${attributes.type}`,
					}
				},
			},
		}
	},

	parseHTML() {
		return [
			{
				tag: 'div.callout',
			},
			{
				tag: 'p.callout',
				priority: 1001,
			},
		]
	},

	renderHTML({ node, HTMLAttributes }) {
		const { class: classy } = this.options.HTMLAttributes

		const attributes = {
			...this.options.HTMLAttributes,
			'data-callout': node.attrs.type,
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

	addNodeView() {
		return VueNodeViewRenderer(Callout)
	},

	addCommands() {
		return {
			setCallout: attributes => ({ commands }) => {
				return commands.wrapIn(this.name, attributes)
			},
			toggleCallout: attributes => ({ commands, state }) => {
				if (!isNodeActive(state, this.name)) {
					return commands.setCallout(attributes)
				}

				if (!isNodeActive(state, this.name, attributes)) {
					return commands.updateAttributes(this.name, attributes)
				}

				return commands.unsetCallout()
			},
			unsetCallout: () => ({ commands }) => {
				return commands.lift(this.name)
			},
		}
	},
})

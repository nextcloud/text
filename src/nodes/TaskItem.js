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

import TipTapTaskItem from '@tiptap/extension-task-item'
import { wrappingInputRule, mergeAttributes } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { findParentNodeClosestToPos } from './../helpers/prosemirrorUtils.js'

const TaskItem = TipTapTaskItem.extend({

	addOptions() {
		return {
			nested: true,
			HTMLAttributes: {},
		}
	},

	draggable: false,

	content: 'paragraph block*',

	addAttributes() {
		const adjust = { ...this.parent() }
		adjust.checked.parseHTML = el => {
			return el.querySelector('input[type=checkbox]')?.checked
		}
		return adjust
	},

	parseHTML: [
		{
			priority: 101,
			tag: 'li',
			getAttrs: el => {
				const checkbox = el.querySelector('input[type=checkbox]')
				return checkbox
			},
			context: 'taskList/',
		},
	],

	renderHTML({ node, HTMLAttributes }) {
		const listAttributes = { class: 'task-list-item checkbox-item' }
		const checkboxAttributes = { type: 'checkbox', class: '', contenteditable: false }
		if (node.attrs.checked) {
			checkboxAttributes.checked = true
			listAttributes.class += ' checked'
		}
		return [
			'li',
			mergeAttributes(HTMLAttributes, listAttributes),
			[
				'input',
				checkboxAttributes,
			],
			[
				'label',
				0,
			],
		]
	},

	// overwrite the parent node view so renderHTML gets used
	addNodeView: false,

	toMarkdown: (state, node) => {
		state.write(`[${node.attrs.checked ? 'x' : ' '}] `)
		state.renderContent(node)
	},

	addInputRules() {
		return [
			...this.parent(),
			wrappingInputRule({
				find: /^\s*([-+*])\s(\[(x|X|\s)?\])\s$/,
				type: this.type,
				getAttributes: match => ({
					checked: 'xX'.includes(match[match.length - 1]),
				}),
			}),
		]
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					handleClick: (view, pos, event) => {
						const state = view.state
						const schema = state.schema

						const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY })
						const position = state.doc.resolve(coordinates.pos)
						const parentList = findParentNodeClosestToPos(position, function(node) {
							return node.type === schema.nodes.taskItem
								|| node.type === schema.nodes.listItem
						})
						const isListClicked = event.target.tagName.toLowerCase() === 'li'
						if (!isListClicked
							|| !parentList
							|| parentList.node.type !== schema.nodes.taskItem
						    || !view.editable) {
							return
						}
						const tr = state.tr
						tr.setNodeMarkup(parentList.pos, schema.nodes.taskItem, { checked: !parentList.node.attrs.checked })
						view.dispatch(tr)
					},
				},
			}),
		]
	},

})

export default TaskItem

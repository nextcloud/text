/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { MarkdownSerializerState } from 'prosemirror-markdown'

import { mergeAttributes, wrappingInputRule } from '@tiptap/core'
import { TaskItem as TipTapTaskItem } from '@tiptap/extension-list'
import { Plugin } from '@tiptap/pm/state'
import { findParentNodeClosestToPos } from './../helpers/prosemirrorUtils.js'

const TaskItem = TipTapTaskItem.extend({
	addOptions() {
		return {
			nested: true,
			HTMLAttributes: {},
			taskListTypeName: 'taskList',
		}
	},

	draggable: false,

	content: 'paragraph block*',

	addAttributes() {
		const adjust = { ...this.parent?.() }
		adjust.checked.parseHTML = (el) => {
			return (el.querySelector('input[type=checkbox]') as HTMLInputElement)
				?.checked
		}
		return adjust
	},

	parseHTML() {
		return [
			{
				priority: 101,
				tag: 'li',
				getAttrs: (el) => {
					const checkbox = el.querySelector('input[type=checkbox]')
					return checkbox
				},
				context: 'taskList/',
			},
		]
	},

	renderHTML({ node, HTMLAttributes }) {
		const listAttributes = {
			class: `task-list-item checkbox-item${node.attrs.checked ? ' checked' : ''}`,
		} as const
		const checkboxAttributes = {
			type: 'checkbox',
			class: '',
			contenteditable: false,
			...(node.attrs.checked ? { checked: true } : {}),
		} as const

		return [
			'li',
			mergeAttributes(HTMLAttributes, listAttributes),
			['input', checkboxAttributes],
			['div', { class: 'task-item-content' }, 0],
		]
	},

	// overwrite the parent node view so renderHTML gets used
	addNodeView: () => null,

	// @ts-expect-error - toMarkdown is a custom field not part of the official Tiptap API
	toMarkdown: (state: MarkdownSerializerState, node: Node) => {
		state.write(`[${node.attrs.checked ? 'x' : ' '}] `)
		state.renderContent(node)
	},

	addInputRules() {
		return [
			...(this.parent?.() || []),
			wrappingInputRule({
				find: /^\s*([-+*])\s(\[(x|X|\s)?\])\s$/,
				type: this.type,
				getAttributes: (match) => ({
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

						const coordinates = view.posAtCoords({
							left: event.clientX,
							top: event.clientY,
						})
						if (!coordinates) {
							return
						}
						const position = state.doc.resolve(coordinates.pos)
						const parentList = findParentNodeClosestToPos(
							position,
							function (node: Node) {
								return (
									node.type === schema.nodes.taskItem
									|| node.type === schema.nodes.listItem
								)
							},
						)
						const isListClicked =
							event.target instanceof Element
							&& event.target.tagName.toLowerCase() === 'li'
						if (
							!isListClicked
							|| !parentList
							|| parentList.node.type !== schema.nodes.taskItem
							|| !view.editable
						) {
							return
						}
						const tr = state.tr
						tr.setNodeMarkup(parentList.pos, schema.nodes.taskItem, {
							checked: !parentList.node.attrs.checked,
						})
						view.dispatch(tr)
					},
				},
			}),
		]
	},
})

export default TaskItem

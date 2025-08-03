/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes } from '@tiptap/core'
import { TableCell } from '@tiptap/extension-table'
import { Fragment } from '@tiptap/pm/model'
import { Plugin } from '@tiptap/pm/state'

export default TableCell.extend({
	content: '(paragraph|list|codeBlock|image)+',

	toMarkdown() {},

	parseHTML() {
		return [
			{ tag: 'td', preserveWhitespace: true },
			{ tag: 'th', preserveWhitespace: true },
			{
				tag: 'table thead ~ tbody th',
				priority: 70,
				preserveWhitespace: true,
			},
			{
				tag: 'table thead ~ tbody td',
				priority: 70,
				preserveWhitespace: true,
			},
		]
	},

	addAttributes() {
		return {
			...this.parent?.(),
			textAlign: {
				rendered: false,
				parseHTML: (element) => element.style.textAlign || null,
			},
		}
	},

	renderHTML({ HTMLAttributes }) {
		const attributes = mergeAttributes(
			this.options.HTMLAttributes,
			HTMLAttributes,
		)
		if (attributes.colspan === 1) {
			delete attributes.colspan
		}
		if (attributes.rowspan === 1) {
			delete attributes.rowspan
		}
		return ['td', attributes, 0]
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					// Only paste (marked) text into table cells to prevent jumping out of cell
					handlePaste: (view, event, slice) => {
						if (!this.editor.isActive(this.type.name)) {
							return false
						}

						const { state } = view
						const { schema } = state
						const childNodes = []
						slice.content.descendants((node, pos) => {
							if (node.isText) {
								childNodes.push(
									schema.text(node.textContent, node.marks),
								)
							} else if (
								childNodes.length !== 0
								&& node.type === schema.nodes.hardBreak
							) {
								childNodes.push(node)
							}
						})

						const newNode = schema.node('paragraph', [], childNodes)
						slice.content = Fragment.empty.addToStart(newNode)
					},
				},
			}),
		]
	},
})

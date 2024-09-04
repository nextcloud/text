/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { TableCell } from '@tiptap/extension-table-cell'
import { Plugin } from '@tiptap/pm/state'
import { Fragment } from '@tiptap/pm/model'

export default TableCell.extend({
	content: 'inline*',

	toMarkdown(state, node) {
		state.write(' ')
		const backup = state.options?.escapeExtraCharacters
		const columnIndex = state.options.currentColumnIndex
		state.options.escapeExtraCharacters = /\|/

		let cellRenderedContentLength = 0
		node.content.forEach((childNode, offset, index) => {
			cellRenderedContentLength += (childNode.text?.length || 6)
			if (childNode.text?.includes('|')) cellRenderedContentLength += 1
			if (childNode.attrs.syntax === '  ') node.child(index).attrs.syntax = 'html'
		})
		const columnWidth = state.options.columnWidths[columnIndex]
		const align = node.attrs?.textAlign || 'left'
		const space = columnWidth - cellRenderedContentLength
		const leftPadding = Math.floor(space / 2)
		const rightPadding = Math.ceil(space / 2)

		if (align === 'center') state.write(' '.repeat(leftPadding))
		if (align === 'right') state.write(' '.repeat(space))
		state.renderInline(node)
		if (align === 'center') state.write(' '.repeat(rightPadding))
		if (align === 'left') state.write(' '.repeat(space))

		state.options.escapeExtraCharacters = backup
		state.write(' |')
		state.options.currentColumnIndex++
	},

	parseHTML() {
		return [
			{ tag: 'td', preserveWhitespace: true },
			{ tag: 'th', preserveWhitespace: true },
			{ tag: 'table thead ~ tbody th', priority: 70, preserveWhitespace: true },
			{ tag: 'table thead ~ tbody td', priority: 70, preserveWhitespace: true },
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
								childNodes.push(schema.text(node.textContent, node.marks))
							} else if (childNodes.length !== 0 && node.type === schema.nodes.hardBreak) {
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

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { TableHeader } from '@tiptap/extension-table-header'

export default TableHeader.extend({
	content: 'inline*',

	toMarkdown(state, node) {
		const headerIndex = state.options.currentHeaderIndex
		const columnWidth = state.options.columnWidths[headerIndex]
		const align = node.attrs?.textAlign || 'left'
		const space = columnWidth - node.content.size
		const leftPadding = Math.floor(space / 2)
		const rightPadding = Math.ceil(space / 2)

		state.write(' ')
		if (align === 'center') state.write(' '.repeat(leftPadding))
		if (align === 'right') state.write(' '.repeat(space))
		state.renderInline(node)
		if (align === 'center') state.write(' '.repeat(rightPadding))
		if (align === 'left') state.write(' '.repeat(space))
		state.write(' |')
		state.options.currentHeaderIndex++
	},

	parseHTML() {
		return [
			{ tag: 'table thead:empty ~ tbody :first-child th', priority: 80 },
			{ tag: 'table thead:empty ~ tbody :first-child td', priority: 80 },
			{ tag: 'table thead :first-child th', priority: 60 },
			{ tag: 'table thead :first-child td', priority: 60 },
			{ tag: 'table tbody :first-child th', priority: 60 },
			{ tag: 'table tbody :first-child td', priority: 60 },
			{ tag: 'table > :first-child > th', priority: 60 },
			{ tag: 'table > :first-child > td', priority: 60 },
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
})

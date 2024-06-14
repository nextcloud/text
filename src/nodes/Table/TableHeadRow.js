/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TableRow from './TableRow.js'

export default TableRow.extend({
	name: 'tableHeadRow',
	content: 'tableHeader+',
	allowGapCursor: false,

	toMarkdown(state, node) {
		state.write('|')
		state.renderInline(node)
		state.ensureNewLine()
		state.write('|')
		node.forEach((cell, offset, index) => {
			let row = state.repeat('-', state.options.columnWidths[index] + 2)
			const align = cell.attrs?.textAlign
			if (align === 'center' || align === 'left') row = ':' + row.slice(1)
			if (align === 'center' || align === 'right') row = row.slice(0, -1) + ':'
			state.write(row)
			state.write('|')
		})
		state.ensureNewLine()
	},

	parseHTML() {
		return [
			{ tag: 'tr:first-of-type', priority: 80 },
		]
	},
})

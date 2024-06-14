/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { TableRow } from '@tiptap/extension-table-row'

export default TableRow.extend({
	content: 'tableCell*',
	allowGapCursor: false,

	toMarkdown(state, node) {
		state.write('|')
		state.options.currentColumnIndex = 0
		state.renderInline(node)
		state.ensureNewLine()
	},

	parseHTML() {
		return [
			{ tag: 'tr', priority: 70 },
		]
	},
})

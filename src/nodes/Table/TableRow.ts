/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { TableRow } from '@tiptap/extension-table'

export default TableRow.extend({
	content: 'tableCell*',
	allowGapCursor: false,

	toMarkdown() {},

	parseHTML() {
		return [
			{ tag: 'tr', priority: 70 },
			{
				tag: 'tr',
				priority: 90,
				// Body rows copied from a ProseMirror editor stay body rows, even as first row
				getAttrs: (el) => (el.closest('table[data-pm-slice]') && el.querySelector(':scope > td') ? null : false),
			},
		]
	},
})

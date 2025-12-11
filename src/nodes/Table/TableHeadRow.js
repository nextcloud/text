/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TableRow from './TableRow.js'

export default TableRow.extend({
	name: 'tableHeadRow',
	content: 'tableHeader+',
	allowGapCursor: false,

	toMarkdown() {},

	parseHTML() {
		return [
			{ tag: 'table thead:empty ~ tbody tr:first-of-type', priority: 80 },
			{ tag: 'table thead tr:first-of-type', priority: 80 },
			{
				tag: 'table:not(:has(> thead:not(:empty))) tbody tr:first-of-type',
				priority: 80,
			},
			{ tag: 'table > tr:first-of-type', priority: 80 },
		]
	},
})

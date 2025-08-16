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
		return [{ tag: 'tr:first-of-type', priority: 80 }]
	},
})

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
		return [{ tag: 'tr', priority: 70 }]
	},
})

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes } from '@tiptap/core'
import { TableHeader } from '@tiptap/extension-table'

export default TableHeader.extend({
	content: 'inline*',

	toMarkdown() {},

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
		return ['th', attributes, 0]
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

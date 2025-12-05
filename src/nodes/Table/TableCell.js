/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import { mergeAttributes } from '@tiptap/core'
import { TableCell } from '@tiptap/extension-table'
import { Fragment, Slice } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export default TableCell.extend({
	content: 'block+',

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
				key: new PluginKey('preventNestedTables'),
				// Prevent nested table (low level protection): filter out transactions that lead to nested table
				filterTransaction: (transaction) => {
					if (!transaction.docChanged) {
						return true
					}

					let hasNestedTable = false
					transaction.doc.descendants((node, pos) => {
						if (node.type.name.startsWith('table')) {
							const $pos = transaction.doc.resolve(pos)
							for (let depth = $pos.depth; depth >= 0; depth--) {
								const ancestor = $pos.node(depth)
								if (ancestor.type.name === 'tableCell') {
									console.warn(
										'Detected nested table, filtering out transaction',
									)
									hasNestedTable = true
								}
							}
						}
					})

					return !hasNestedTable
				},
				props: {
					// Prevent nested table when pasting to a table cell
					transformPasted: (slice) => {
						if (!this.editor.isActive(this.type.name)) {
							return slice
						}

						let tablePaste = false
						slice.content.descendants((node) => {
							if (node.type.name.startsWith('table')) {
								tablePaste = true
							}
						})

						if (!tablePaste) {
							return slice
						}

						if (
							slice.content.childCount === 1
							&& slice.content.firstChild?.type.name === 'table'
						) {
							const tableChild = slice.content.firstChild.firstChild
							if (
								(tableChild.childCount === 1
									&& tableChild.type.name === 'tableRow')
								|| tableChild.type.name === 'tableHeadRow'
							) {
								const rowChild = tableChild.firstChild
								if (
									(rowChild.childCount === 1
										&& rowChild.type.name === 'tableCell')
									|| rowChild.type.name === 'tableHeader'
								) {
									return new Slice(rowChild.content, 0, 0)
								}
							}
						}

						console.warn('Nested tables are not supported')
						alert(
							t(
								'text',
								'A table was pasted into a table. Nested tables are not supported.',
							),
						)

						const newSlice = new Slice(Fragment.empty, 0, 0)
						return newSlice
					},
				},
			}),
		]
	},
})

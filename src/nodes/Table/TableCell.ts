/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node as PMNode, Schema } from '@tiptap/pm/model'

import { showWarning } from '@nextcloud/dialogs'
import { t } from '@nextcloud/l10n'
import { mergeAttributes } from '@tiptap/core'
import { TableCell } from '@tiptap/extension-table'
import { Fragment, Slice } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { __pastedCells as pastedCells } from '@tiptap/pm/tables'

export default TableCell.extend({
	content: 'block+',

	toMarkdown() {},

	parseHTML() {
		return [
			{ tag: 'td', preserveWhitespace: true },
			{ tag: 'th', preserveWhitespace: true },
			{
				// Cells copied from a ProseMirror editor keep their type, even in the first row
				tag: 'td',
				priority: 90,
				preserveWhitespace: true,
				getAttrs: (el) => (el.closest('table[data-pm-slice]') ? null : false),
			},
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
									// eslint-disable-next-line no-console
									console.warn('Detected nested table, filtering out transaction')
									hasNestedTable = true
								}
							}
						}
					})

					return !hasNestedTable
				},
				props: {
					// Prevent nested table when pasting to a table cell
					transformPasted: (slice, view) => {
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

						const bodySlice = new Slice(
							toBodyCells(slice.content, view.state.schema),
							slice.openStart,
							slice.openEnd,
						)
						const cells = pastedCells(bodySlice)
						if (cells?.width === 1 && cells.height === 1) {
							return Slice.maxOpen(cells.rows[0].firstChild!.content)
						}
						if (cells) {
							// Inserted into the target cells by the paste handler of prosemirror-tables
							return bodySlice
						}

						// eslint-disable-next-line no-console
						console.warn('Nested tables are not supported')
						showWarning(t(
							'text',
							'A table was pasted into a table. Nested tables are not supported.',
						))

						const newSlice = new Slice(Fragment.empty, 0, 0)
						return newSlice
					},
				},
			}),
		]
	},
})

/**
 * Convert header rows and cells to body rows and cells and drop captions,
 * so that pasted cells fit into body rows.
 *
 * @param fragment - content of a pasted slice or of one of its table nodes
 * @param schema - the editor schema
 */
function toBodyCells(fragment: Fragment, schema: Schema): Fragment {
	const nodes: PMNode[] = []
	fragment.forEach((node) => {
		switch (node.type.name) {
			case 'tableCaption':
				return
			case 'tableHeader':
				nodes.push(schema.nodes.tableCell.create(node.attrs, schema.nodes.paragraph.create(null, node.content)))
				return
			case 'tableHeadRow':
				nodes.push(schema.nodes.tableRow.create(node.attrs, toBodyCells(node.content, schema)))
				return
			case 'table':
			case 'tableRow':
				nodes.push(node.copy(toBodyCells(node.content, schema)))
				return
			default:
				nodes.push(node)
		}
	})
	return Fragment.from(nodes)
}

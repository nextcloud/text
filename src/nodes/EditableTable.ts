/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node, NodeViewProps } from '@tiptap/vue-3'
import type { Component } from 'vue'

import { VueNodeViewRenderer } from '@tiptap/vue-3'
import TableHeaderView from './Table/TableHeaderView.vue'
import TableRowView from './Table/TableRowView.vue'
import TableView from './Table/TableView.vue'
import Table from './Table/Table.ts'
import TableCaption from './Table/TableCaption.ts'
import TableCell from './Table/TableCell.ts'
import TableHeader from './Table/TableHeader.ts'
import TableHeadRow from './Table/TableHeadRow.ts'
import TableRow from './Table/TableRow.ts'

/**
 *
 * @param node - the node to add the view to.
 * @param view - the node view to add to the node.
 */
function extendNodeWithView(node: Node, view: Component<NodeViewProps>) {
	return node.extend({
		addNodeView() {
			return VueNodeViewRenderer(view)
		},
	})
}

export default Table.extend({
	addNodeView() {
		return VueNodeViewRenderer(TableView)
	},

	addExtensions() {
		return [
			TableCaption,
			TableCell,
			extendNodeWithView(TableHeader, TableHeaderView),
			TableHeadRow,
			extendNodeWithView(TableRow, TableRowView),
		]
	},
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { CommandProps } from '@tiptap/core'
import type { Node, NodeType } from '@tiptap/pm/model'
import type { Transaction } from '@tiptap/pm/state'

import { findParentNode, isList } from '@tiptap/core'
import { TextSelection } from '@tiptap/pm/state'

type ParentList = {
	pos: number
	node: Node
}

/**
 * Rebuild a list node with a new list type and item type, preserving all item content.
 *
 * Used for cross-silo list conversion (bulletList/orderedList ↔ taskList) where a simple
 * setNodeMarkup is not sufficient because the child item types also differ
 * (listItem vs taskItem).
 *
 * Only the direct children of the list are retyped; nested sub-lists are preserved as-is.
 * When converting to taskItem the item receives checked: false.
 * When converting away from taskItem the checked attribute is simply dropped.
 *
 * @param parentList - the parent list node
 * @param targetListType - the target list type
 * @param targetItemType - the target item type
 * @param tr - the ProseMirror transaction
 */
function convertListType(
	parentList: ParentList,
	targetListType: NodeType,
	targetItemType: NodeType,
	tr: Transaction,
): void {
	const newItems: Node[] = []
	parentList.node.forEach((item) => {
		const attrs = targetItemType.name === 'taskItem' ? { checked: false } : {}
		newItems.push(targetItemType.create(attrs, item.content))
	})
	const newList = targetListType.create(parentList.node.attrs, newItems)
	tr.replaceWith(
		parentList.pos,
		parentList.pos + parentList.node.nodeSize,
		newList,
	)
}

/**
 * Returns a Tiptap command that toggles a given list type.
 * To be used by BulletList, OrderedList and TaskList nodes.
 *
 * Handles cross-type conversion (e.g. bulletList → taskList) that
 * `toggleList` cannot handle due to incompatible item types.
 *
 * @param listTypeName - the target list type
 * @param itemTypeName - the target item type
 */
export function toggleListCommand(listTypeName: string, itemTypeName: string) {
	return () =>
		({ editor, state, tr, dispatch, commands }: CommandProps): boolean => {
			const { extensions } = editor.extensionManager

			const parentList = findParentNode((node) =>
				isList(node.type.name, extensions),
			)(state.selection)

			const listType = state.schema.nodes[listTypeName]!
			const itemType = state.schema.nodes[itemTypeName]!

			if (
				parentList
				&& parentList.node.type !== listType
				&& !listType.validContent(parentList.node.content)
			) {
				if (!dispatch) {
					return true
				}
				const { from, to } = state.selection
				convertListType(parentList, listType, itemType, tr)
				tr.setSelection(TextSelection.create(tr.doc, from, to))
				dispatch(tr)
				return true
			}

			return commands.toggleList(listType, itemType)
		}
}

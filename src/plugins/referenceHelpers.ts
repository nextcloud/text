/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { EditorState } from '@tiptap/pm/state'

/**
 * Check if selection is inside a node type
 *
 * @param state the editor state
 * @param nodeTypeName the node type name
 */
function isInside(state: EditorState, nodeTypeName: string): boolean {
	const { $from } = state.selection
	for (let d = $from.depth; d > 0; d--) {
		if ($from.node(d).type.name === nodeTypeName) {
			return true
		}
	}
	return false
}

/**
 * Check if selection is inside a comment
 *
 * @param state the editor state
 */
export function isInsideComment(state: EditorState): boolean {
	return isInside(state, 'comment')
}

/**
 * Check if selection is inside a footnote
 *
 * @param state the editor state
 */
export function isInsideFootnote(state: EditorState): boolean {
	return isInside(state, 'footnote')
}

/**
 * Check if selection is inside a comment or footnote
 *
 * @param state the editor state
 */
export function isInsideCommentOrFootnote(state: EditorState): boolean {
	return isInsideComment(state) || isInsideFootnote(state)
}

/**
 * Get first unused numeric id
 *
 * @param doc the document node
 * @param type comment or footnote
 */
export function generateReferenceId(doc: Node, type: 'comment' | 'footnote'): string {
	const existing = new Set<string>()
	doc.descendants((node) => {
		if (node.type.name === type + 'Reference' || node.type.name === type) {
			const id = node.attrs.referenceId
			if (id) {
				existing.add(String(id))
			}
		}
	})
	for (let i = 1; i < 10_000; i++) {
		const candidate = type === 'comment' ? 'comment-' + String(i) : String(i)
		if (!existing.has(candidate)) {
			return candidate
		}
	}
	return ''
}

/**
 * Check if footnote with reference id exists
 *
 * @param doc - the ProseMirror node
 * @param id - the searched reference id
 */
export function footnoteExists(doc: Node, id: string): boolean {
	let found = false
	doc.descendants((node) => {
		if (found) {
			return false
		}
		if (node.type.name === 'footnote' && node.attrs.referenceId === id) {
			found = true
			return false
		}
	})
	return found
}

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { EditorState } from '@tiptap/pm/state'

/**
 * Check if selection is inside a footnote
 *
 * @param state the editor state
 */
export function isInsideFootnote(state: EditorState): boolean {
	const { $from } = state.selection
	for (let d = $from.depth; d > 0; d--) {
		if ($from.node(d).type.name === 'footnote') {
			return true
		}
	}
	return false
}

/**
 * Get first unused numeric footnote id
 *
 * @param doc the document node
 */
export function generateFootnoteId(doc: Node): string {
	const existing = new Set<string>()
	doc.descendants((node) => {
		if (node.type.name === 'footnoteReference' || node.type.name === 'footnote') {
			const id = node.attrs.referenceId
			if (id) {
				existing.add(String(id))
			}
		}
	})
	for (let i = 1; i < 10_000; i++) {
		const candidate = String(i)
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

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import Comment from './Comment.ts'
import CommentItem from './CommentItem.ts'
import CommentReference from './CommentReference.ts'

const Comments = Node.create({
	name: 'comments',
	content: 'comment+',
	defining: true,
	isolating: true,
	allowGapCursor: false,

	addExtensions() {
		return [Comment, CommentItem, CommentReference]
	},

	parseHTML() {
		return [{ tag: 'section[data-type="comments"]' }]
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'section',
			mergeAttributes(HTMLAttributes, { 'data-type': 'comments' }),
			0,
		]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey('commentsCleanup'),
				appendTransaction(transactions, _oldState, newState) {
					if (!transactions.some((tr) => tr.docChanged)) {
						return null
					}

					const deletions: { pos: number, size: number }[] = []
					newState.doc.forEach((child, offset) => {
						if (child.type.name !== 'comments') {
							return
						}

						const referencedLabels = new Set<string>()
						newState.doc.descendants((node) => {
							if (node.type.name === 'commentReference') {
								referencedLabels.add(node.attrs.referenceId)
							}
						})

						const containerPos = offset
						const orphans: { pos: number, size: number }[] = []
						let remainingNodeCount = 0
						let inner = 0

						child.forEach((node) => {
							if (node.type.name !== 'comment') {
								return
							}
							if (!referencedLabels.has(node.attrs.referenceId)) {
								orphans.push({ pos: containerPos + 1 + inner, size: node.nodeSize })
							} else {
								remainingNodeCount++
							}
							inner += node.nodeSize
						})

						if (orphans.length === 0) {
							return
						}

						if (remainingNodeCount === 0) {
							deletions.push({ pos: containerPos, size: child.nodeSize })
						} else {
							deletions.push(...orphans)
						}
					})

					if (deletions.length === 0) {
						return null
					}

					// Delete right-to-left so earlier positions remain valid
					deletions.sort((a, b) => b.pos - a.pos)
					const tr = newState.tr
					for (const del of deletions) {
						tr.delete(del.pos, del.pos + del.size)
					}
					tr.setMeta('addToHistory', false)
					return tr
				},
			}),
		]
	},
})

export default Comments

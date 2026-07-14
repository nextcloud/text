/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import Footnote from './Footnote.ts'
import FootnoteReference from './FootnoteReference.ts'

const Footnotes = Node.create({
	name: 'footnotes',
	content: 'footnote+',
	defining: true,
	isolating: true,
	allowGapCursor: false,

	addExtensions() {
		return [Footnote, FootnoteReference]
	},

	parseHTML() {
		return [{ tag: 'section[data-type="footnotes"]' }]
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'section',
			mergeAttributes(HTMLAttributes, { 'data-type': 'footnotes' }),
			0,
		]
	},

	toMarkdown(state, node) {
		state.renderContent(node)
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey('footnoteOrdinals'),
				appendTransaction(transactions, _oldState, newState) {
					if (!transactions.some((tr) => tr.docChanged)) {
						return null
					}

					// Compute ordinals
					const ordinals = new Map<string, number>()
					newState.doc.descendants((node) => {
						if (node.type.name === 'footnoteReference') {
							const id = node.attrs.referenceId
							if (id && !ordinals.has(id)) {
								ordinals.set(id, ordinals.size + 1)
							}
						}
					})

					const tr = newState.tr
					let hasChange = false
					newState.doc.descendants((node, pos) => {
						if (node.type.name !== 'footnoteReference' && node.type.name !== 'footnote') {
							return
						}

						const targetOrdinal = ordinals.get(node.attrs.referenceId) ?? 0
						if (node.attrs.ordinal !== targetOrdinal) {
							tr.setNodeAttribute(pos, 'ordinal', targetOrdinal)
							hasChange = true
						}
					})

					if (!hasChange) {
						return null
					}
					tr.setMeta('addToHistory', false)
					return tr
				},
			}),
			new Plugin({
				key: new PluginKey('footnotesCleanup'),
				appendTransaction(transactions, _oldState, newState) {
					if (!transactions.some((tr) => tr.docChanged)) {
						return null
					}

					let hasFootnotes = false
					for (let i = 0; i < newState.doc.childCount; i++) {
						if (newState.doc.child(i).type.name === 'footnotes') {
							hasFootnotes = true
							break
						}
					}
					if (!hasFootnotes) {
						return null
					}

					const referencedLabels = new Set<string>()
					newState.doc.descendants((node) => {
						if (node.type.name === 'footnoteReference') {
							referencedLabels.add(node.attrs.referenceId)
						}
					})

					const deletions: { pos: number, size: number }[] = []
					newState.doc.forEach((child, offset) => {
						if (child.type.name !== 'footnotes') {
							return
						}

						const containerPos = offset

						const orphans: { pos: number, size: number }[] = []
						let remainingNodeCount = 0
						let inner = 0

						child.forEach((node) => {
							if (node.type.name !== 'footnote') {
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
							// Delete the whole footnotes container
							deletions.push({ pos: containerPos, size: child.nodeSize })
						} else {
							// Delete only orphaned footnotes
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
					return tr
				},
			}),
		]
	},
})

export default Footnotes

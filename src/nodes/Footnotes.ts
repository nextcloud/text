/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node as PMNode } from '@tiptap/pm/model'

import { mergeAttributes, Node } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
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
				state: {
					init: (_, { doc }) => footnoteOrdinals(doc),
					apply: (tr, value) => (tr.docChanged ? footnoteOrdinals(tr.doc) : value),
				},
				props: {
					decorations(state) {
						return this.getState(state)
					},
				},
			}),
			new Plugin({
				key: new PluginKey('footnotesCleanup'),
				appendTransaction(transactions, _oldState, newState) {
					if (!transactions.some((tr) => tr.docChanged)) {
						return null
					}

					const deletions: { pos: number, size: number }[] = []
					newState.doc.forEach((child, offset) => {
						if (child.type.name !== 'footnotes') {
							return
						}

						const referencedLabels = new Set<string>()
						newState.doc.descendants((node) => {
							if (node.type.name === 'footnoteReference') {
								referencedLabels.add(node.attrs.referenceId)
							}
						})

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

/**
 * Number footnotes by first reference and expose the number as a CSS variable
 *
 * @param doc the document node
 */
function footnoteOrdinals(doc: PMNode): DecorationSet {
	const ordinals = new Map<string, number>()
	const nodes: { node: PMNode, pos: number }[] = []
	doc.descendants((node, pos) => {
		if (node.type.name === 'footnoteReference') {
			const id = node.attrs.referenceId
			if (id && !ordinals.has(id)) {
				ordinals.set(id, ordinals.size + 1)
			}
			nodes.push({ node, pos })
		} else if (node.type.name === 'footnote') {
			nodes.push({ node, pos })
		}
	})

	const decorations = []
	for (const { node, pos } of nodes) {
		const ordinal = ordinals.get(node.attrs.referenceId)
		if (!ordinal) {
			continue
		}
		const style = node.type.name === 'footnote'
			? `order: ${ordinal}; --footnote-ordinal: ${ordinal}`
			: `--footnote-ordinal: ${ordinal}`
		decorations.push(Decoration.node(pos, pos + node.nodeSize, { style }))
	}
	return DecorationSet.create(doc, decorations)
}

export default Footnotes

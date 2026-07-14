/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node as ProseMirrorNode } from '@tiptap/pm/model'
import type { EditorState } from '@tiptap/pm/state'

import { InputRule, mergeAttributes, Node } from '@tiptap/core'
import { Plugin, TextSelection } from '@tiptap/pm/state'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		footnoteReference: {
			/**
			 * Insert a new footnote at the current selection and
			 * create a matching definition in the trailing footnotes
			 * block.
			 */
			insertFootnote: (options?: { referenceId?: string }) => ReturnType
		}
	}
}

const FootnoteReference = Node.create({
	name: 'footnoteReference',
	group: 'inline',
	inline: true,
	atom: true,

	addAttributes() {
		return {
			referenceId: {
				default: '',
				parseHTML: (el) => el.getAttribute('data-reference-id') ?? '',
				renderHTML: (attrs) => ({
					'data-reference-id': attrs.referenceId,
				}),
			},
			ordinal: {
				default: 0,
				rendered: false,
			},
		}
	},

	parseHTML() {
		return [{ tag: 'sup[data-type="footnote-reference"]' }]
	},

	renderHTML({ node, HTMLAttributes }) {
		const id = node.attrs.referenceId
		const ordinal = node.attrs.ordinal
		return [
			'sup',
			mergeAttributes(HTMLAttributes, {
				'data-type': 'footnote-reference',
				id: `fnref-${id}`,
			}),
			[
				'a',
				{ href: `#fn-${id}`, class: 'footnote-ref', role: 'doc-noteref', title: id },
				String(ordinal || ''),
			],
		]
	},

	toMarkdown(state, node) {
		state.write(`[^${node.attrs.referenceId}]`)
	},

	addCommands() {
		return {
			insertFootnote: (options?: { referenceId?: string }) => ({ state, chain }) => {
				if (isInsideFootnote(state)) {
					return false
				}

				const referenceId = options?.referenceId
					? String(options.referenceId)
					: generateFootnoteId(state.doc)
				if (!referenceId) {
					return false
				}

				const existingFootnote = footnoteExists(state.doc, referenceId)

				const footnotesType = state.schema.nodes.footnotes
				const footnoteType = state.schema.nodes.footnote
				const paragraphType = state.schema.nodes.paragraph

				let c = chain()
					.insertContent({ type: 'footnoteReference', attrs: { referenceId } })

				if (!existingFootnote) {
					// Create footnote
					const newFootnote = footnoteType.create({ referenceId }, paragraphType.create())
					const lastChild = state.doc.lastChild
					const hasFootnotesBlock = lastChild?.type === footnotesType

					if (hasFootnotesBlock) {
						// Append footnote inside the existing footnotes container
						const insertPos = state.doc.content.size - 1
						c = c.insertContentAt(insertPos, newFootnote.toJSON())
					} else {
						// Create footnotes container + footnote
						c = c.insertContentAt(state.doc.content.size, {
							type: 'footnotes',
							content: [newFootnote.toJSON()],
						})
					}
				} else {
					// Jump cursor into existing footnote
					c = c.command(({ tr }) => {
						let target: number | null = null
						tr.doc.descendants((node, pos) => {
							if (target !== null) {
								return false
							}
							if (node.type.name === 'footnote' && node.attrs.referenceId === referenceId) {
								target = pos + node.nodeSize - 2
								return false
							}
						})
						if (target !== null) {
							tr.setSelection(TextSelection.near(tr.doc.resolve(target)))
						}
						return true
					})
				}

				return c
					.focus()
					.scrollIntoView()
					.run()
			},
		}
	},

	addKeyboardShortcuts() {
		return {
			'Mod-Shift-f': () => this.editor.commands.insertFootnote(),
		}
	},

	addInputRules() {
		return [
			new InputRule({
				find: /\[\^\]$/,
				handler: ({ state, range, chain }) => {
					if (isInsideFootnote(state)) {
						return null
					}

					chain()
						.deleteRange({ from: range.from, to: range.to })
						.insertFootnote()
						.run()
				},
			}),
		]
	},

	addProseMirrorPlugins() {
		return [
			// Highlight target when navigating between footnote references and footnotes
			new Plugin({
				props: {
					handleClick(view, _pos, event) {
						const link = (event.target as HTMLElement).closest('.footnote-ref, .footnote-backref')
						if (!link) {
							return false
						}

						const href = link.getAttribute('href')
						if (!href?.startsWith('#')) {
							return false
						}

						const target = view.dom.ownerDocument.getElementById(href.slice(1))
						if (!target) {
							return false
						}

						target.classList.add('footnote-highlight')
						setTimeout(() => target.classList.remove('footnote-highlight'), 5000)
						return false
					},
				},
			}),
		]
	},
})

/**
 * Check if selection is inside a footnote
 *
 * @param state the editor state
 */
function isInsideFootnote(state: EditorState): boolean {
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
function generateFootnoteId(doc: ProseMirrorNode): string {
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
function footnoteExists(doc: ProseMirrorNode, id: string): boolean {
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

export default FootnoteReference

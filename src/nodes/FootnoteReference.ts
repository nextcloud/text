/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node as ProseMirrorNode } from '@tiptap/pm/model'

import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'

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
		}
	},

	parseHTML() {
		return [{ tag: 'sup[data-type="footnote-reference"]' }]
	},

	renderHTML({ node, HTMLAttributes }) {
		const id = node.attrs.referenceId
		return [
			'sup',
			mergeAttributes(HTMLAttributes, {
				'data-type': 'footnote-reference',
				id: `fnref-${id}`,
			}),
			[
				'a',
				{ href: `#fn-${id}`, class: 'footnote-ref', role: 'doc-noteref' },
				id,
			],
		]
	},

	toMarkdown(state, node) {
		state.write(`[^${node.attrs.referenceId}]`)
	},

	addCommands() {
		return {
			insertFootnote: (options?: { referenceId?: string }) => ({ state, chain }) => {
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
					const newFootnote = footnoteType.create({ referenceId }, paragraphType.create())
					const lastChild = state.doc.lastChild
					const hasFootnotesBlock = lastChild?.type === footnotesType

					if (hasFootnotesBlock) {
						// Append inside the existing footnotes container
						const insertPos = state.doc.content.size - 1
						c = c.insertContentAt(insertPos, newFootnote.toJSON())
					} else {
						c = c.insertContentAt(state.doc.content.size, {
							type: 'footnotes',
							content: [newFootnote.toJSON()],
						})
					}
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
			nodeInputRule({
				find: /\[\^([^\]\s]+)\]$/,
				type: this.type,
				getAttributes: (match) => ({ referenceId: match[1] }),
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

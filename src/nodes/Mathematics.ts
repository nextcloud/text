/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { InputRule, mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import MathematicsView from './MathematicsView.vue'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		inlineMath: {
			insertInlineMath: (options?: { latex?: string }) => ReturnType
		}
		blockMath: {
			insertBlockMath: (options?: { latex?: string }) => ReturnType
		}
	}
}

const latexAttribute = {
	latex: {
		default: '',
		parseHTML: (element: HTMLElement) => element.getAttribute('data-latex'),
		renderHTML: (attributes: Record<string, string>) => ({ 'data-latex': attributes.latex }),
	},
}

function findInlineMath(text: string) {
	const pattern = /\$\$([^$\n]+?)\$\$(?!\$)/g
	let match = pattern.exec(text)
	while (match !== null) {
		if (match.index === 0 || text[match.index - 1] !== '$') {
			return { index: match.index, text: match[0], data: { latex: match[1] } }
		}
		pattern.lastIndex = match.index + 1
		match = pattern.exec(text)
	}
	return null
}

const MathInline = Node.create({
	name: 'inlineMath',
	group: 'inline',
	inline: true,
	atom: true,

	addAttributes() {
		return latexAttribute
	},

	renderHTML({ HTMLAttributes }) {
		return ['span', mergeAttributes(HTMLAttributes, { 'data-type': 'inline-math' })]
	},

	addInputRules() {
		return [
			new InputRule({
				find: findInlineMath,
				handler: ({ state, range, match }) => {
					const latex = match.data?.latex
					if (typeof latex !== 'string') {
						return null
					}
					state.tr.replaceWith(range.from, range.to, this.type.create({ latex }))
				},
			}),
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(MathematicsView)
	},

	parseHTML() {
		return [
			// Tiptap's default format
			{ tag: 'span[data-type="inline-math"]' },
		]
	},

	addCommands() {
		return {
			insertInlineMath:
				(options?: { latex?: string }) => ({ commands }) => {
					const latex = options?.latex || ''
					return commands.insertContent({
						type: this.name,
						attrs: { latex },
					})
				},
		}
	},

	toMarkdown(state, node) {
		state.write('$' + node.attrs.latex + '$')
	},
})

const MathBlock = Node.create({
	name: 'blockMath',
	group: 'block',
	atom: true,

	addAttributes() {
		return latexAttribute
	},

	renderHTML({ HTMLAttributes }) {
		return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'block-math' })]
	},

	addInputRules() {
		return [
			new InputRule({
				find: /^\$\$\$([^$]+)\$\$\$$/,
				handler: ({ state, range, match }) => {
					const [, latex] = match
					const { tr } = state
					const $from = state.doc.resolve(range.from)
					const node = this.type.create({ latex })
					const replacesParent = $from.depth > 0
						&& $from.parent.isTextblock
						&& range.from === $from.start()
						&& range.to === $from.end()
						&& $from.node(-1).canReplaceWith($from.index(-1), $from.indexAfter(-1), this.type)
					const { from, to } = replacesParent ? { from: $from.before(), to: $from.after() } : range
					tr.replaceWith(from, to, node)
				},
			}),
		]
	},

	addNodeView() {
		return VueNodeViewRenderer(MathematicsView)
	},

	parseHTML() {
		return [
			// Tiptap's default format
			{ tag: 'div[data-type="block-math"]' },
		]
	},

	addCommands() {
		return {
			insertBlockMath:
				(options?: { latex?: string }) => ({ commands }) => {
					const latex = options?.latex || ''
					return commands.insertContent({
						type: this.name,
						attrs: { latex },
					})
				},
		}
	},

	toMarkdown(state, node) {
		state.write('$$\n')
		state.text(node.attrs.latex, false)
		state.ensureNewLine()
		state.write('$$')
		state.closeBlock(node)
	},
})

export { MathBlock, MathInline }
export default MathInline

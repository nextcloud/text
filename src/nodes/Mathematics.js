/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import {
	BlockMath as TiptapBlockMath,
	InlineMath as TiptapInlineMath,
} from '@tiptap/extension-mathematics'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import MathematicsView from './MathematicsView.vue'

const MathInline = TiptapInlineMath.extend({
	addNodeView() {
		return VueNodeViewRenderer(MathematicsView)
	},

	parseHTML() {
		return [
			// Tiptap's default format
			{ tag: 'span[data-type="inline-math"]' },
			// KaTeX HTML from markdown-it
			{
				tag: 'span.katex',
				priority: 50,
				getAttrs: (element) => {
					// Extract LaTeX from annotation tag
					const annotation = element.querySelector('annotation')
					if (annotation) {
						return { latex: annotation.textContent.trim() }
					}
					return false
				},
			},
		]
	},

	addCommands() {
		return {
			insertInlineMath:
				(options) =>
				({ commands }) => {
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

const MathBlock = TiptapBlockMath.extend({
	addNodeView() {
		return VueNodeViewRenderer(MathematicsView)
	},

	parseHTML() {
		return [
			// Tiptap's default format
			{ tag: 'div[data-type="block-math"]' },
			// KaTeX HTML from markdown-it
			{
				tag: 'p.katex-block',
				priority: 100,
				getAttrs: (element) => {
					// Extract LaTeX from annotation tag
					const annotation = element.querySelector('annotation')
					if (annotation) {
						return { latex: annotation.textContent.trim() }
					}
					return false
				},
			},
		]
	},

	addCommands() {
		return {
			insertBlockMath:
				(options) =>
				({ commands }) => {
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

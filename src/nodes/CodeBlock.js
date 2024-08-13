/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TiptapCodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import CodeBlockView from './CodeBlockView.vue'

const CodeBlock = TiptapCodeBlockLowlight.extend({

	parseHTML() {
		return [
			{
				tag: 'pre',
				preserveWhitespace: 'full',
				// Remove trailing newline from code blocks (#2344)
				getContent: (node, schema) => {
					const textContent = node.textContent.replace(/\n$/, '')
					const inner = textContent
						? [schema.text(textContent)]
						: []
					return schema.nodes.codeBlock.create(null, inner)
				},
			},
		]
	},

	toMarkdown(state, node, parent, index) {
		// @tiptap/pm/markdown uses `params` instead of `language` attribute
		node.attrs.params = node.attrs.language

		// After https://github.com/ProseMirror/prosemirror-markdown/pull/90 the upstream markdown serialization
		// is no longer comparible with our extraction stripping the last new line, so we keep a reverted copy
		// to stay consistent with our unit tests

		// Make sure the front matter fences are longer than any dash sequence within it
		const backticks = node.textContent.match(/`{3,}/gm)
		const fence = backticks ? (backticks.sort().slice(-1)[0] + '`') : '```'

		const language = node.attrs.params !== 'plaintext' ? node.attrs.params : ''
		state.write(fence + (language || '') + '\n')
		state.text(node.textContent, false)
		// Add a newline to the current content before adding closing marker
		state.ensureNewLine()
		state.write(fence)
		state.closeBlock(node)
	},

	addNodeView() {
		return VueNodeViewRenderer(CodeBlockView)
	},

	addKeyboardShortcuts() {
		return {
			'Mod-a': () => {
				if (!this.editor.isActive('codeBlock')) {
					return
				}

				const nodeSize = this.editor.state.selection.$from.node().nodeSize
				this.editor.commands.selectParentNode()
				const from = this.editor.state.selection.$from.pos
				const to = from + nodeSize
				this.editor.commands.setTextSelection({ from, to })

				return true
			},
		}
	},

})

export default CodeBlock

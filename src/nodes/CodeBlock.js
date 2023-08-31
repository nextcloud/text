import TiptapCodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { defaultMarkdownSerializer } from '@tiptap/pm/markdown'
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
		return defaultMarkdownSerializer.nodes.code_block(state, node, parent, index)
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

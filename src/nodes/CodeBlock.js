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

})

export default CodeBlock

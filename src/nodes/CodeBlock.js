import TiptapCodeBlock from '@tiptap/extension-code-block'
import { defaultMarkdownSerializer } from 'prosemirror-markdown'

const CodeBlock = TiptapCodeBlock.extend({

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
		// prosemirror-markdown uses `params` instead of `language` attribute
		node.attrs.params = node.attrs.language
		return defaultMarkdownSerializer.nodes.code_block(state, node, parent, index)
	},

})

export default CodeBlock

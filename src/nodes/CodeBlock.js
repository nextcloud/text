import TiptapCodeBlock from '@tiptap/extension-code-block'
import { defaultMarkdownSerializer } from 'prosemirror-markdown'

const CodeBlock = TiptapCodeBlock.extend({

	toMarkdown(state, node, parent, index) {
		// prosemirror-markdown uses `params` instead of `language` attribute
		node.attrs.params = node.attrs.language
		return defaultMarkdownSerializer.nodes.code_block(state, node, parent, index)
	},

})

export default CodeBlock

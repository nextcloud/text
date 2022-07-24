import { mergeAttributes } from '@tiptap/core'
import TiptapCodeBlock from '@tiptap/extension-code-block'

const FrontMatter = TiptapCodeBlock.extend({
	name: 'frontMatter',
	// FrontMatter are only valid at the begin of a document
	draggable: false,

	renderHTML({ node, HTMLAttributes }) {
		return this.parent({
			node,
			HTMLAttributes:
			mergeAttributes(HTMLAttributes, { 'data-title': t('text', 'Front matter'), class: 'frontmatter' }),
		})
	},
	parseHTML: () => {
		return [
			{
				tag: 'pre[id="frontmatter"]',
				preserveWhitespace: 'full',
				priority: 9001,
				attrs: {
					language: 'yaml',
				},
			},
		]
	},
	toMarkdown: (state, node) => {
		if (!state.out.match(/^\s*/)) throw Error('FrontMatter must be the first node of the document!')
		state.write('')
		state.out = ''
		state.write('---\n')
		state.text(node.textContent, false)
		state.ensureNewLine()
		state.write('---')
		state.closeBlock(node)
	},

	// Allow users to add a FrontMatter, but only at the beginning of the document
	addInputRules() {
		return [
			{
				find: /^---$/g,
				handler: ({ state, range, chain }) => {
					if (range.from === 1) {
						if (state.doc.resolve(1).parent.type.name === this.name) return false
						chain()
							.deleteRange(range)
							.insertContentAt(0, {
								type: this.name,
							})
						return true
					}
					return false
				},
			},
		]
	},

	// Override rules from Codeblock
	addCommands() {
		return {}
	},
	addPasteRules: () => [],
	addProseMirrorPlugins: () => [],
})

export default FrontMatter

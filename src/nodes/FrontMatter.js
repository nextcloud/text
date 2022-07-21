import TiptapCodeBlock from '@tiptap/extension-code-block'

const FrontMatter = TiptapCodeBlock.extend({
	name: 'frontMatter',
	addAttributes() {
		return {
			...this.parent?.(),
			class: {
				default: 'frontmatter',
				rendered: true,
			},
		}
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
	// FrontMatter are only valid at the begin of a document
	draggable: false,
	// Override rules from Codeblock
	addCommands() {
		return {}
	},
	addInputRules: () => [],
	addPasteRules: () => [],
	addProseMirrorPlugins: () => [],
})

export default FrontMatter

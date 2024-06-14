/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

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
	parseHTML() {
		return [{
			tag: 'pre#frontmatter',
			preserveWhitespace: 'full',
			priority: 9001,
			attrs: {
				language: 'yaml',
			},
		}]
	},
	toMarkdown: (state, node) => {
		if (!state.out.match(/^\s*/)) throw Error('FrontMatter must be the first node of the document!')
		const text = node.textContent
		// Make sure the front matter fences are longer than any dash sequence within it
		const dashes = text.match(/-{3,}/gm)
		const separator = dashes ? (dashes.sort().slice(-1)[0] + '-') : '---'

		state.write('')
		state.out = ''
		state.write(`${separator}\n`)
		state.text(text, false)
		state.ensureNewLine()
		state.write(separator)
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

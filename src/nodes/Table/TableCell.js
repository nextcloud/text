import { TableCell } from '@tiptap/extension-table-cell'
import { Plugin } from '@tiptap/pm/state'
import { Fragment } from '@tiptap/pm/model'

export default TableCell.extend({
	content: 'inline*',

	toMarkdown(state, node) {
		state.write(' ')
		const backup = state.options?.escapeExtraCharacters
		state.options.escapeExtraCharacters = /\|/
		state.renderInline(node)
		state.options.escapeExtraCharacters = backup
		state.write(' |')
	},

	parseHTML() {
		return [
			{ tag: 'td', preserveWhitespace: true },
			{ tag: 'th', preserveWhitespace: true },
			{ tag: 'table thead ~ tbody th', priority: 70, preserveWhitespace: true },
			{ tag: 'table thead ~ tbody td', priority: 70, preserveWhitespace: true },
		]
	},

	addAttributes() {
		return {
			...this.parent?.(),
			textAlign: {
				rendered: false,
				parseHTML: (element) => element.style.textAlign || null,
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					// Special-treat empty lines in pasted content to prevent jumping out of cell
					handlePaste: (view, event, slice) => {
						if (slice.content.childCount > 1) {
							const state = view.state
							const childCount = slice.content.childCount
							const childNodes = []
							for (let i = 0; i < childCount; i++) {
								if (i === 0) {
									childNodes.push(state.schema.text('\n'))
								}

								// Ignore empty children (i.e. empty lines)
								if (!slice.content.child(i).firstChild) {
									continue
								}

								childNodes.push(state.schema.text(slice.content.child(i).textContent, slice.content.child(i).firstChild.marks))
							}
							const newNode = view.state.schema.node('paragraph', [], childNodes)
							slice.content = Fragment.empty.addToStart(newNode)
						}
					},
				},
			}),
		]
	},
})

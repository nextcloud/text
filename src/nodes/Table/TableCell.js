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
					// Only paste (marked) text into table cells to prevent jumping out of cell
					handlePaste: (view, event, slice) => {
						if (!this.editor.isActive(this.type.name)) {
							return false
						}

						const { state } = view
						const childNodes = []
						let newLineAdded = false
						slice.content.descendants((node, pos) => {
							if (node.isText) {
								childNodes.push(state.schema.text(node.textContent, node.marks))
								newLineAdded = false
							} else if (!newLineAdded) {
								childNodes.push(state.schema.text('\n'))
								newLineAdded = true
							}
						})

						const newNode = state.schema.node('paragraph', [], childNodes)
						slice.content = Fragment.empty.addToStart(newNode)
					},
				},
			}),
		]
	},
})

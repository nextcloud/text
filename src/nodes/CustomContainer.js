import { Node, mergeAttributes } from '@tiptap/core'

export const inputRegex = /^\s*>\s$/

export default Node.create({

	name: 'customContainer',

	content: 'block+',

	group: 'block',

	defining: true,

	addOptions() {
		return {
			types: ['info', 'warn', 'error', 'success'],
			HTMLAttributes: {
				class: 'custom-container',
			},
		}
	},

	addAttributes() {
		return {
			type: {
				default: 'info',
				rendered: false,
				parseHTML: element => element.getAttribute('data-type'),
				renderHTML: attributes => {
					return {
						'data-type': attributes.type,
						class: attributes.type,
					}
				},
			},
		}
	},

	parseHTML() {
		return [
			{
				tag: 'div',
			},
		]
	},

	renderHTML({ node, HTMLAttributes }) {
		const { class: classy } = this.options.HTMLAttributes

		const attributes = {
			...this.options.HTMLAttributes,
			class: `${classy} ${classy}-${node.attrs.type}`,
		}

		return ['div', mergeAttributes(attributes, HTMLAttributes), 0]
	},

	toMarkdown: (state, node) => {
		state.write('::: info' + (node.attrs.params || '') + '\n')
		state.text(node.textContent, false)
		state.ensureNewLine()
		state.write(':::')
		state.closeBlock(node)
	},

	addCommands() {
		return {
			setCustomContainer: attributes => ({ commands }) => {
				return commands.wrapIn(this.name, attributes)
			},
			toggleCustomContainer: attributes => ({ commands }) => {
				return commands.toggleWrap(this.name, attributes)
			},
			unsetCustomContainer: () => ({ commands }) => {
				return commands.lift(this.name)
			},
		}
	},
})

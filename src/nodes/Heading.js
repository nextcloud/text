import TipTapHeading from '@tiptap/extension-heading'

const Heading = TipTapHeading.extend({
	addAttributes() {
		return {
			...this.parent(),
			id: {
				default: undefined,
				rendered: true,
			},
		}
	},
	addKeyboardShortcuts() {
		return this.options.levels.reduce((items, level) => ({
			...items,
			[`Mod-Shift-${level}`]: () => this.editor.commands.toggleHeading({ level }),
		}), {})
	},

})

export default Heading

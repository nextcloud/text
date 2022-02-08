import TipTapHeading from '@tiptap/extension-heading'

const Heading = TipTapHeading.extend({

	addKeyboardShortcuts() {
		return this.options.levels.reduce((items, level) => ({
			...items,
			[`Mod-Shift-${level}`]: () => this.editor.commands.toggleHeading({ level }),
		}), {})
	},

})

export default Heading

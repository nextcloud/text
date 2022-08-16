import TipTapHeading from '@tiptap/extension-heading'
import debounce from 'debounce'
import { setHeadings, extractHeadings } from './extractor.js'

const Heading = TipTapHeading.extend({
	addAttributes() {
		return {
			...this.parent(),
			id: {
				default: undefined,
				rendered: true,
			},
			uuid: {
				default: undefined,
				rendered: false,
			},
		}
	},
	addKeyboardShortcuts() {
		return this.options.levels.reduce((items, level) => ({
			...items,
			[`Mod-Shift-${level}`]: () => this.editor.commands.toggleHeading({ level }),
		}), {})
	},

	onDestroy() {
		setHeadings([])

		if (this.parent) {
			this.parent()
		}
	},

	onUpdate: debounce(function onUpdate({ editor }) {
		extractHeadings(editor)
	}, 900),

})

export default Heading

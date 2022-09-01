import TipTapHeading from '@tiptap/extension-heading'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import debounce from 'debounce'

import HeadingView from './HeadingView.vue'
import { setHeadings, extractHeadings } from './extractor.js'

const Heading = TipTapHeading.extend({
	addOptions() {
		return {
			...this.parent?.(),
			linkSymbol: '#',
		}
	},

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

	addNodeView() {
		return VueNodeViewRenderer(HeadingView)
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

	onCreate() {
		extractHeadings(this.editor)

		if (this.parent) {
			this.parent()
		}
	},

	onUpdate: debounce(function onUpdate({ editor }) {
		extractHeadings(editor)
	}, 900),

})

export default Heading

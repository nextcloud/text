import TipTapHeading from '@tiptap/extension-heading'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import debounce from 'debounce'
import { extractHeadings } from './extractor.js'
import HeaderViewVue from './HeadingView.vue'

const onUpdate = debounce(({ editor }) => {
	if (editor.view && editor.state && !editor.isDestroyed) {
		// Only run if editor still exists (prevent dangling debounced extractHeadings function)
		extractHeadings(editor)
	}
}, 900, { immediate: true })

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

	addOptions() {
		return {
			...this.parent?.(),
			linkSymbol: '#',
		}
	},

	addKeyboardShortcuts() {
		return this.options.levels.reduce((items, level) => ({
			...items,
			[`Mod-Shift-${level}`]: () => this.editor.commands.toggleHeading({ level }),
		}), {})
	},

	addNodeView() {
		return VueNodeViewRenderer(HeaderViewVue, {
			update: ({ oldNode, newNode, updateProps }) => {
				if (newNode.type.name !== this.name) return false
				// Make sure to redraw node as the vue renderer will not show the updated children
				if (newNode.attrs !== oldNode.attrs) return false
				updateProps()
				return true
			},
		})
	},

	onCreate() {
		extractHeadings(this.editor)

		if (this.parent) {
			this.parent()
		}
	},

	onUpdate: (event) => {
		onUpdate(event)
	},

})

export default Heading

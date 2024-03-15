import { Extension } from '@tiptap/core'
import { linkBubble } from '../plugins/links.js'

const LinkBubble = Extension.create({
	name: 'linkViewBubble',

	addOptions() {
		return {
			pluginKey: 'linkViewBubble',
		}
	},

	addProseMirrorPlugins() {
		return [
			linkBubble(this.options.pluginKey, {
				editor: this.editor,
			}),
		]
	},
})

export default LinkBubble

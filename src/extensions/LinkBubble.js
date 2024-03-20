import { Extension } from '@tiptap/core'
import { linkBubble, hideLinkBubble } from '../plugins/links.js'

const LinkBubble = Extension.create({
	name: 'linkViewBubble',

	addCommands() {
		return {
			hideLinkBubble: () => ({ state, dispatch }) => {
				return hideLinkBubble(state, dispatch)
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			linkBubble({
				editor: this.editor,
				parent: this.editor.contentComponent,
			}),
		]
	},
})

export default LinkBubble

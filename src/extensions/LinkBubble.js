import { Extension } from '@tiptap/core'
import { linkBubble } from '../plugins/links.js'

const LinkBubble = Extension.create({
	name: 'linkViewBubble',

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

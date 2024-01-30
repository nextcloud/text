import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import LinkBubblePluginView from './LinkBubblePluginView.js'

const LinkBubble = Extension.create({
	name: 'linkViewBubble',

	addOptions() {
		return {
			pluginKey: 'linkViewBubble',
		}
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey(this.options.pluginKey),
				view: (view) => new LinkBubblePluginView({
					editor: this.editor,
					view,
				}),
			}),
		]
	},
})

export default LinkBubble

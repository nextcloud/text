import { Extension } from '@tiptap/core'
import { Suggestion } from '@tiptap/suggestion'
import { PluginKey } from 'prosemirror-state'
import suggestions from '../components/Suggestion/LinkPicker/suggestions.js'

export const LinkPickerPluginKey = new PluginKey('linkPicker')
export default Extension.create({

	name: 'linkPicker',

	addOptions() {
		return {
			suggestion: {
				char: '/',
				allowedPrefixes: [' '],
				pluginKey: LinkPickerPluginKey,
				...suggestions(),
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			Suggestion({
				editor: this.editor,
				...this.options.suggestion,
			}),
		]
	},
})

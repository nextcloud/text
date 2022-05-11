/*
 * @copyright Copyright (c) 2021 Jonas <jonas@freesources.org>
 *
 * @author Jonas <jonas@freesources.org>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { Node } from '@tiptap/core'
import { PluginKey } from 'prosemirror-state'
import { emojiSearch } from '@nextcloud/vue/dist/Functions/emoji'
import { VueRenderer } from '@tiptap/vue-2'
import EmojiList from './../components/EmojiList.vue'
import tippy from 'tippy.js'
// eslint-disable-next-line import/no-named-as-default
import Suggestion from '@tiptap/suggestion'

export const EmojiPluginKey = new PluginKey('emoji')

const Emoji = Node.create({
	name: 'emoji',

	addOptions() {
		return {
			HTMLAttributes: {},
			suggestion: {
				char: ':',
				pluginKey: EmojiPluginKey,
				command: ({ editor, range, props }) => {
					editor
						.chain()
						.focus()
						.insertContentAt(range, props.native + ' ')
						.run()
				},
				items: ({ query }) => {
					return emojiSearch(query)
				},
				render: () => {
					let component
					let popup

					return {
						onStart: props => {
							component = new VueRenderer(EmojiList, {
								parent: this,
								propsData: props,
							})

							popup = tippy('body', {
								getReferenceClientRect: props.clientRect,
								appendTo: () => document.body,
								content: component.element,
								showOnCreate: true,
								interactive: true,
								trigger: 'manual',
								placement: 'bottom-start',
							})
						},

						onUpdate(props) {
							component.updateProps(props)
							popup[0].setProps({
								getReferenceClientRect: props.clientRect,
							})
						},

						onKeyDown(props) {
							if (props.event.key === 'Escape') {
								popup[0].hide()
								return true
							}
							return component.ref?.onKeyDown(props)
						},

						onExit() {
							popup[0].destroy()
							component.destroy()
						},
					}
				},
			},
		}
	},

	content: 'text*',

	addCommands() {
		return {
			emoji: (emojiObject) => ({ commands }) => {
				return commands.insertContent(emojiObject.native + ' ')
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

export default Emoji

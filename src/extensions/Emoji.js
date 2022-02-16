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
						.insertContentAt(range, props.native)
						.run()
				},
			},
		}
	},

	content: 'text*',

	addCommands() {
		return {
			emoji: (emojiObject) => ({ commands }) => {
				return commands.insertContent(emojiObject.native)
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

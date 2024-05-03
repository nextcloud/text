/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Node } from '@tiptap/core'
import { PluginKey } from '@tiptap/pm/state'
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
				allowedPrefixes: [' '],
				pluginKey: EmojiPluginKey,
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

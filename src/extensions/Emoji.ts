/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { SuggestionOptions } from '@tiptap/suggestion'

import { Node } from '@tiptap/core'
import { PluginKey } from '@tiptap/pm/state'
import Suggestion from '@tiptap/suggestion'

export const EmojiPluginKey = new PluginKey('emoji')

interface EmojiObject {
	native: string
}

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		emoji: {
			/**
			 * Set the text direction attribute
			 */
			emoji: (emojiObject: EmojiObject) => ReturnType
		}
	}
}

interface EmojiOptions {
	HTMLAttributes: object
	suggestion: Omit<SuggestionOptions, 'editor'>
}

const defaultOptions = {
	char: ':',
	allowedPrefixes: [' '],
	pluginKey: EmojiPluginKey,
}

const Emoji = Node.create<EmojiOptions>({
	name: 'emoji',

	addOptions() {
		return {
			HTMLAttributes: {},
			suggestion: defaultOptions,
		}
	},

	content: 'text*',

	addCommands() {
		return {
			emoji:
				(emojiObject) => ({ commands }) => {
					return commands.insertContent(emojiObject.native + ' ')
				},
		}
	},

	addProseMirrorPlugins() {
		return [
			Suggestion({
				editor: this.editor,
				...defaultOptions,
				...this.options.suggestion,
			}),
		]
	},
})

export default Emoji

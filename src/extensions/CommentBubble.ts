/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { CommandProps } from '@tiptap/core'

import { Extension } from '@tiptap/core'
import { commentBubble, hideCommentBubble, openCommentBubble } from '../plugins/commentBubble.ts'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		commentBubble: {
			openCommentBubble: (referenceId: string) => ReturnType
			hideCommentBubble: () => ReturnType
		}
	}
}

const CommentBubble = Extension.create({
	name: 'commentBubble',

	addCommands() {
		return {
			openCommentBubble(referenceId: string) {
				return ({ state, dispatch }: CommandProps) => {
					return openCommentBubble(referenceId)(state, dispatch)
				}
			},
			hideCommentBubble: () => ({ state, dispatch }) => {
				return hideCommentBubble(state, dispatch)
			},
		}
	},

	addProseMirrorPlugins() {
		return [commentBubble({ editor: this.editor })]
	},
})

export default CommentBubble

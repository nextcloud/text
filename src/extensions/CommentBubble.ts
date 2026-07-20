/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { commentBubble, hideCommentBubble, openCommentBubble } from '../plugins/commentBubble.ts'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		commentBubble: {
			openCommentBubble: (referenceId: string, nodeStart: number) => ReturnType
			hideCommentBubble: () => ReturnType
		}
	}
}

const CommentBubble = Extension.create({
	name: 'commentBubble',

	addCommands() {
		return {
			openCommentBubble: (referenceId: string, nodeStart: number) => ({ state, dispatch }) => {
				return openCommentBubble(referenceId, nodeStart)(state, dispatch)
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

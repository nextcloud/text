/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { CommandProps } from '@tiptap/core'

import { Extension } from '@tiptap/core'
import { commentBubble, commentBubbleKey, hideCommentBubble, navigateCommentBubble, openCommentBubble } from '../plugins/commentBubble.ts'

declare module '@tiptap/core' {
	interface Commands<ReturnType> {
		commentBubble: {
			openCommentBubble: (referenceId: string) => ReturnType
			hideCommentBubble: (options?: { refocus?: boolean }) => ReturnType
			navigateCommentBubble: (direction: 'prev' | 'next') => ReturnType
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
			hideCommentBubble: (options?: { refocus?: boolean }) => ({ state, dispatch, chain }) => {
				const pluginState = commentBubbleKey.getState(state)
				const active = pluginState?.active
				const result = hideCommentBubble(state, dispatch)
				if (!result) {
					return result
				}
				if (options?.refocus && active) {
					const node = state.doc.nodeAt(active.nodeStart)
					const cursorPos = active.nodeStart + (node?.nodeSize ?? 1)
					chain().setTextSelection(cursorPos).focus().run()
				}
				return true
			},
			navigateCommentBubble(direction: 'prev' | 'next') {
				return ({ state, dispatch }: CommandProps) => {
					return navigateCommentBubble(direction)(state, dispatch)
				}
			},
		}
	},

	addProseMirrorPlugins() {
		return [commentBubble({ editor: this.editor })]
	},
})

export default CommentBubble

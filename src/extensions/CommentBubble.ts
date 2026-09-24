/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { CommandProps } from '@tiptap/core'

import { getCurrentUser } from '@nextcloud/auth'
import { Extension } from '@tiptap/core'
import { commentBubble, commentBubbleKey, hideCommentBubble, navigateCommentBubble, openCommentBubble } from '../plugins/commentBubble.ts'
import { commentDraftPrefix, findComment, isEmptyComment } from '../plugins/referenceHelpers.ts'

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
			hideCommentBubble: (options?: { refocus?: boolean }) => ({ state, dispatch, chain, commands }) => {
				const pluginState = commentBubbleKey.getState(state)
				const active = pluginState?.active
				const result = hideCommentBubble(state, dispatch)
				if (!result || !active) {
					return result
				}

				const refNode = state.doc.nodeAt(active.nodeStart)
				let cursorPos = active.nodeStart + (refNode?.nodeSize ?? 1)

				// Discard a comment that was created but never submitted
				const comment = findComment(state.doc, active.referenceId)
				const currentUserId = getCurrentUser()?.uid ?? ''
				const hasDraft = !!sessionStorage.getItem(commentDraftPrefix + active.referenceId)
				if (comment && isEmptyComment(comment) && comment.firstChild!.attrs.author === currentUserId && !hasDraft) {
					commands.deleteCommentReply(comment, 0)
					cursorPos = active.nodeStart
				}

				if (options?.refocus) {
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

	addKeyboardShortcuts() {
		return {
			'Mod-Alt-ArrowLeft': () => this.editor.commands.navigateCommentBubble('prev'),
			'Mod-Alt-ArrowRight': () => this.editor.commands.navigateCommentBubble('next'),
		}
	},

	addProseMirrorPlugins() {
		return [commentBubble({ editor: this.editor })]
	},
})

export default CommentBubble

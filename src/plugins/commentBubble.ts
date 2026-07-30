/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { Command } from '@tiptap/pm/state'

import { Plugin, PluginKey } from '@tiptap/pm/state'
import CommentBubblePluginView from './CommentBubblePluginView.ts'

export const commentBubbleKey = new PluginKey('commentBubble')

export const hideCommentBubble: Command = (state, dispatch) => {
	const pluginState = commentBubbleKey.getState(state)
	if (!pluginState?.active) {
		return false
	}
	if (dispatch) {
		dispatch(state.tr.setMeta(commentBubbleKey, { active: null }))
	}
	return true
}

/**
 * Open the bubble for a comment
 *
 * @param referenceId - the comment reference ID
 */
export function openCommentBubble(referenceId: string): Command {
	return (state, dispatch) => {
		let nodeStart = -1
		state.doc.descendants((node, pos) => {
			if (nodeStart !== -1) {
				return false
			}
			if (node.type.name === 'commentReference' && node.attrs.referenceId === referenceId) {
				nodeStart = pos
				return false
			}
		})
		if (nodeStart === -1) {
			return false
		}
		if (dispatch) {
			dispatch(state.tr.setMeta(commentBubbleKey, { active: { referenceId, nodeStart } }))
		}
		return true
	}
}

/**
 * Navigate to prev or next comment
 *
 * @param direction - the navigation direction
 */
export function navigateCommentBubble(direction: 'prev' | 'next'): Command {
	return (state, dispatch) => {
		const pluginState = commentBubbleKey.getState(state)
		if (!pluginState?.active) {
			return false
		}

		const refs: { referenceId: string, nodeStart: number }[] = []
		state.doc.descendants((node, pos) => {
			if (node.type.name === 'commentReference') {
				refs.push({ referenceId: node.attrs.referenceId, nodeStart: pos })
			}
		})

		if (refs.length <= 1) {
			return false
		}

		const currentIndex = refs.findIndex((ref) => ref.referenceId === pluginState.active.referenceId)
		if (currentIndex === -1) {
			return false
		}

		const nextIndex = direction === 'next'
			? (currentIndex + 1) % refs.length
			: (currentIndex - 1 + refs.length) % refs.length

		if (dispatch) {
			dispatch(state.tr.setMeta(commentBubbleKey, { active: refs[nextIndex] }))
		}
		return true
	}
}

/**
 * Comment plugin function
 *
 * @param options - the plugin options object
 * @param options.editor - the editor object
 */
export function commentBubble(options: { editor: Editor }) {
	const plugin: Plugin = new Plugin({
		key: commentBubbleKey,

		state: {
			init: () => ({ active: null }),
			apply: (tr, cur) => {
				const meta = tr.getMeta(commentBubbleKey)
				if (meta) {
					return { ...cur, active: meta.active }
				}
				return cur
			},
		},

		appendTransaction: (transactions, _oldState, state) => {
			if (!transactions.some((tr) => tr.docChanged)) {
				return null
			}

			const pluginState = commentBubbleKey.getState(state)
			if (!pluginState?.active) {
				return null
			}

			const { referenceId, nodeStart } = pluginState.active

			// If reference node no longer exists at the stored position, close the bubble
			const node = state.doc.nodeAt(nodeStart)
			if (node?.type.name !== 'commentReference' || node.attrs.referenceId !== referenceId) {
				return state.tr.setMeta(commentBubbleKey, { active: null })
			}

			return null
		},

		view: (view) => new CommentBubblePluginView({ view, options, plugin }),

		props: {
			handleDOMEvents: {
				keydown: (view, event) => {
					if (event.key === 'Enter') {
						const focused = document.activeElement
						if (focused?.classList.contains('comment-ref')) {
							event.preventDefault()
							;(focused as HTMLElement).click()
							return true
						}
					}
					return false
				},
			},
		},
	})
	return plugin
}

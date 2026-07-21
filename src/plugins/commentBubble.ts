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

		view: (view) => new CommentBubblePluginView({ view, options, plugin }),

		props: {
			handleClickOn: (view, _pos, _node, _nodePos, event) => {
				const link = (event.target as HTMLElement).closest('.comment-ref')
				if (!link) {
					return false
				}
				const sup = link.closest('sup[data-type="comment-reference"]')
				if (!sup) {
					return false
				}
				const referenceId = (sup as HTMLElement).dataset.referenceId ?? ''
				if (!referenceId) {
					return false
				}
				// Find the node position
				let nodeStart = -1
				view.state.doc.descendants((node, pos) => {
					if (node.type.name === 'commentReference' && node.attrs.referenceId === referenceId) {
						nodeStart = pos
						return false
					}
				})
				if (nodeStart === -1) {
					return false
				}
				event.preventDefault()
				openCommentBubble(referenceId)(view.state, view.dispatch)
				return true
			},

			handleDOMEvents: {
				keydown: (view, event) => {
					if (event.key === 'Escape') {
						return hideCommentBubble(view.state, view.dispatch)
					}
				},
			},
		},
	})
	return plugin
}

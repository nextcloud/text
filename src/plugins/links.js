/**
 * @copyright Copyright (c) 2024 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
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

import { Plugin, PluginKey } from '@tiptap/pm/state'
import LinkBubblePluginView from './LinkBubblePluginView.js'
import { activeLinkFromSelection } from './linkHelpers.js'
import { isLinkToSelfWithHash } from '../helpers/links.js'

// Commands

/* Set resolved to be the active element (if it has a link mark)
 *
 * @params {ResolvedPos} resolved position of the action
 */
export const setActiveLink = (resolved) => (state, dispatch) => {
	const mark = resolved.marks()
		.find(m => m.type.name === 'link')
	if (!mark) {
		return false
	}
	const nodeStart = resolved.pos - resolved.textOffset
	const active = { mark, nodeStart }
	if (dispatch) {
		dispatch(state.tr.setMeta(linkBubbleKey, { active }))
	}
	return true
}

/* Hide the link bubble by setting active state to null
 *
 */
export const hideLinkBubble = (state, dispatch) => {
	const pluginState = linkBubbleKey.getState(state)
	if (!pluginState?.active) {
		return false
	}
	if (dispatch) {
		dispatch(state.tr.setMeta(linkBubbleKey, { active: null }))
	}
	return true
}

export const linkBubbleKey = new PluginKey('linkBubble')
/**
 * Prosemirror link bubble plugin
 * @param {object} options - options for the link bubble plugin view
 */
export function linkBubble(options) {
	const linkBubblePlugin = new Plugin({
		key: linkBubbleKey,
		state: {
			init: () => ({ active: null }),
			apply: (tr, cur) => {
				const meta = tr.getMeta(linkBubbleKey)
				if (meta) {
					return { ...cur, active: meta.active }
				} else {
					return cur
				}
			},
		},

		view: (view) => new LinkBubblePluginView({
			view,
			options,
			plugin: linkBubblePlugin,
		}),

		appendTransaction: (transactions, oldState, state) => {
			// Don't open bubble at editor initialisation
			if (oldState?.doc.content.size === 2) {
				return
			}

			// Don't open bubble if neither selection nor doc changed
			const sameSelection = oldState?.selection.eq(state.selection)
			const sameDoc = oldState?.doc.eq(state.doc)
			// Don't open bubble on changes by other session members
			const noHistory = transactions.every(tr => tr.meta.addToHistory === false)
			if (sameSelection && (noHistory || sameDoc)) {
				return
			}
			const active = activeLinkFromSelection(state)
			return state.tr.setMeta(linkBubbleKey, { active })
		},

		props: {
			// Required for read-only mode on Firefox.
			// For some reason, editor selection doesn't get updated
			// when clicking a link in read-only mode on Firefox.
			handleClickOn: (view, pos, _node, _nodePos, event, direct) => {
				// Only regard left clicks without Ctrl/Meta
				if (!direct
					|| event.button !== 0
					|| event.ctrlKey
					|| event.metaKey) {
					return false
				}
				const { state, dispatch } = view
				const resolved = state.doc.resolve(pos)
				return setActiveLink(resolved)(state, dispatch)
			},

			handleDOMEvents: {
				// Handled here because `handleKeyDown` does not work in read only editor.
				keydown: (view, event) => {
					const { state, dispatch } = view
					if (event.key === 'Escape') {
						return hideLinkBubble(state, dispatch)
					}
				},
			},

		},

	})
	return linkBubblePlugin
}

export const linkClickingKey = new PluginKey('textHandleClickLink')

/**
 * Prosemirror plugin for special handling for clicks on links
 *
 * - Open link in new tab on middle click rather than pasting.
 * - Only open link on ctrl/cmd + left click.
 *   We use the link bubble otherwise.
 */
export function linkClicking() {
	return new Plugin({
		key: linkClickingKey,
		props: {
			handleDOMEvents: {
				// Open link in new tab on middle click
				auxclick: (view, event) => {
					if (event.target.closest('a') && event.button === 1 && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
						event.preventDefault()
						event.stopImmediatePropagation()

						const linkElement = event.target.closest('a')
						window.open(linkElement.href, '_blank')
					}
				},
				// Prevent paste into links
				// On Linux, middle click pastes, which breaks "open in new tab" on middle click
				// Pasting into links will break the link anyway, so just disable it altogether.
				paste: (view, event) => {
					if (event.target.closest('a')) {
						event.stopPropagation()
						event.preventDefault()
						event.stopImmediatePropagation()
					}
				},
				// Prevent open link (except anchor links) on left click (required for read-only mode)
				// Open link in new tab on Ctrl/Cmd + left click
				click: (view, event) => {
					const linkEl = event.target.closest('a')
					if (event.button === 0 && linkEl) {
						// No special handling in mermaid diagrams to not break links there
						if (linkEl.closest('svg[id^="mermaid-view"]')) {
							return false
						}

						event.preventDefault()
						if (isLinkToSelfWithHash(linkEl.attributes.href?.value)) {
							// Open anchor links directly
							location.href = linkEl.attributes.href.value
						} else if (event.ctrlKey || event.metaKey) {
							window.open(linkEl.href, '_blank')
						}
					}
				},
			},
		},
	})
}

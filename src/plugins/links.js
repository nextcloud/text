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

export const linkBubbleKey = new PluginKey('linkBubble')
export function linkBubble(options) {
	const linkBubblePlugin = new Plugin({
		key: linkBubbleKey,
		state: {
			init: () => ({ active: null }),
			apply: (tr, cur) => {
				const meta = tr.getMeta(linkBubbleKey)
				if (meta?.active) {
					return { active: meta.active }
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

		props: {
			// Required for read-only mode on Firefox.
			// For some reason, editor selection doesn't get updated
			// when clicking a link in read-only mode on Firefox.
			handleClickOn: (view, pos, node, nodePos, event, direct) => {
				// Only regard left clicks without Ctrl/Meta
				if (!direct
					|| event.button !== 0
					|| event.ctrlKey
					|| event.metaKey) {
					return false
				}
				const { state, dispatch } = view
				const resolved = state.doc.resolve(pos)
				setActiveLink(resolved)(state, dispatch, view)
			},
		},

	})
	return linkBubblePlugin
}

export const linkClickingKey = new PluginKey('textHandleClickLink')
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
						event.preventDefault()
						if (linkEl.attributes.href?.value?.startsWith('#')) {
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

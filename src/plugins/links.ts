/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { ResolvedPos } from '@tiptap/pm/model'
import type { Command } from '@tiptap/pm/state'
import type { EditorView } from '@tiptap/pm/view'

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { isMobileDevice } from '../helpers/isMobileDevice.js'
import { isLinkToSelfWithHash } from '../helpers/links.js'
import LinkBubblePluginView from './LinkBubblePluginView.js'
import { activeLinkAtPos, activeLinkFromSelection } from './linkHelpers.js'

// Commands

/* Set resolved to be the active element (if it has a link mark)
 *
 * @params resolved - resolved position of the action
 */
export const setActiveLink =
	(resolved: ResolvedPos): Command =>
	(state, dispatch) => {
		const mark = resolved.marks().find((m) => m.type.name === 'link')
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
export const hideLinkBubble: Command = (state, dispatch) => {
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

export const LINK_HOVER_DELAY = 300

/**
 * DOM event handlers that open the link bubble after hovering a link with delay
 */
export function linkHoverHandlers() {
	let hovered: Element | null = null
	let timer: ReturnType<typeof setTimeout> | null = null

	const cancel = () => {
		if (timer) {
			clearTimeout(timer)
			timer = null
		}
		hovered = null
	}

	return {
		mouseover: (view: EditorView, event: MouseEvent) => {
			const linkEl = (event.target as Element | null)?.closest('a[data-text-el="text-only-link"]')
			if (!linkEl || linkEl === hovered) {
				return false
			}
			cancel()
			hovered = linkEl
			timer = setTimeout(() => {
				timer = null
				if (view.isDestroyed) {												 
					return
				}
				const pos = view.posAtDOM(linkEl, 0)
				const active = activeLinkAtPos(view.state.doc, pos)
				const current = linkBubbleKey.getState(view.state)?.active
				if (!active || current?.nodeStart === active.nodeStart) {
					return
				}
				view.dispatch(view.state.tr.setMeta(linkBubbleKey, { active }))
			}, LINK_HOVER_DELAY)
			return false
		},
		mouseout: (_view: EditorView, event: MouseEvent) => {
			const related = event.relatedTarget as Node | null
			if (hovered && !(related && hovered.contains(related))) {
				cancel()
			}
			return false
		},
	}
}

/**
 * Prosemirror link bubble plugin
 *
 * @param options - options for the link bubble plugin view
 * @param options.editor - the editor
 */
export function linkBubble(options: { editor: Editor }) {
	const linkBubblePlugin: Plugin = new Plugin({
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

		view: (view) =>
			new LinkBubblePluginView({
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
			const noHistory = transactions.every(
				(tr) => tr.getMeta('addToHistory') === false,
			)
			if (sameSelection && (noHistory || sameDoc)) {
				return
			}
			const active = activeLinkFromSelection(state)
			return state.tr.setMeta(linkBubbleKey, { active })
		},

		props: {
			handleDOMEvents: {
				...(isMobileDevice ? {} : linkHoverHandlers()),
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
 * - Open link with the given handler on left click, unless the click finished a text selection.
 *
 * @param openLink - the openLink callback function
 */
export function linkClicking(
	openLink: (href: string) => void = (href) => {
		window.open(href, '_blank')
	},
) {
	return new Plugin({
		key: linkClickingKey,
		props: {
			handleClick: (_view, _pos, event) => {
				const linkEl = (event.target as Element | null)?.closest('a[data-text-el="text-only-link"]')
				return !!linkEl && event.button === 0 && (event.ctrlKey || event.metaKey)
			},
			handleDOMEvents: {
				// Open link in new tab on middle click
				auxclick: (_view, event) => {
					const linkEl = (event.target as Element | null)?.closest('a')
					if (
						linkEl
						&& event.button === 1
						&& !event.ctrlKey
						&& !event.metaKey
						&& !event.shiftKey
					) {
						event.preventDefault()
						event.stopImmediatePropagation()
						// Open link in new tab on middle click (ignore custom link handler on purpose)
						window.open(linkEl.href, '_blank')
					}
				},
				// Prevent paste into links
				// On Linux, middle click pastes, which breaks "open in new tab" on middle click
				// Pasting into links will break the link anyway, so just disable it altogether.
				paste: (view, event) => {
					if ((event.target as Element | null)?.closest('a')) {
						event.stopPropagation()
						event.preventDefault()
						event.stopImmediatePropagation()
					}
				},
				// Open text-only links ourselves. Required for read-only mode.
				click: (view, event) => {
					const linkEl = (event.target as Element | null)?.closest('a')
					// Only text-only links need special handling (e.g. don't handle links inside preview or mermaid diagrams)
					if (
						!linkEl
						|| !linkEl.matches('a[data-text-el="text-only-link"]')
						|| event.button !== 0
					) {
						return false
					}

					// Stop browser from opening the link
					event.preventDefault()

					if (isLinkToSelfWithHash(linkEl.href)) {
						// Directly scroll to anchor links
						const url = new URL(linkEl.href, window.location.href)
						const hash = url.hash
						if (hash) {
							const target = view.dom.querySelector(hash)
							target?.scrollIntoView({ block: 'start', behavior: 'smooth' })
						}
						window.history.replaceState({}, '', url.href)
					} else if (document.getSelection()?.isCollapsed !== false) {
						// Don't open the link when the click finished a text selection
						openLink(linkEl.href)
					}
				},
			},
		},
	})
}

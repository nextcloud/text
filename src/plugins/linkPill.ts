/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Mark, Node } from '@tiptap/pm/model'
import type { EditorView } from '@tiptap/pm/view'

import PencilSvg from '@mdi/svg/svg/pencil-outline.svg?raw'
import { t } from '@nextcloud/l10n'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { activeLink } from './linkHelpers.js'
import { linkBubbleKey } from './links.ts'

export const linkPillPluginKey = new PluginKey('linkPill')

export interface LinkSpan {
	/** Position of the first text node of the link */
	nodeStart: number
	/** Position right after the last text node of the link */
	end: number
	mark: Mark
}

/**
 * Find all links in the document.
 * Consecutive text nodes sharing the same link mark count as one link.
 *
 * @param doc - the ProseMirror document
 */
export function findLinkSpans(doc: Node): LinkSpan[] {
	const results: LinkSpan[] = []
	let current = null as LinkSpan | null
	doc.descendants((node, pos, parent) => {
		const link = node.isText && parent?.type.name !== 'preview'
			? activeLink(node, pos)
			: null
		if (current && link?.mark.eq(current.mark)) {
			current.end = pos + node.nodeSize
			return
		}
		if (current) {
			results.push(current)
		}
		current = link
			? { end: pos + node.nodeSize, nodeStart: link.nodeStart, mark: link.mark }
			: null
	})
	if (current) {
		results.push(current)
	}
	return results
}

/**
 * Create the pill button that opens the link bubble for the given link
 *
 * @param linkSpan - the link to open the bubble for
 * @param linkSpan.mark - the link mark
 * @param linkSpan.nodeStart - position of the first text node of the link
 */
function createPillDom({ mark, nodeStart }: LinkSpan) {
	return (view: EditorView) => {
		const pill = document.createElement('span')
		pill.className = 'link-pill'
		pill.contentEditable = 'false'
		pill.setAttribute('role', 'button')
		pill.setAttribute('tabindex', '0')
		pill.setAttribute('title', t('text', 'Edit link'))
		pill.setAttribute('aria-label', t('text', 'Edit link'))
		pill.innerHTML = PencilSvg
		const svg = pill.querySelector('svg')
		svg?.removeAttribute('id')
		svg?.setAttribute('aria-hidden', 'true')

		const openBubble = (event: Event) => {
			event.preventDefault()
			event.stopPropagation()
			view.dispatch(view.state.tr.setMeta(linkBubbleKey, { active: { mark, nodeStart } }))
		}
		// Keep editor selection and an already open bubble untouched
		pill.addEventListener('mousedown', (event) => {
			event.preventDefault()
			event.stopPropagation()
		})
		pill.addEventListener('click', openBubble)
		pill.addEventListener('keydown', (event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				openBubble(event)
			}
		})
		return pill
	}
}

/**
 * @param doc the document node
 */
function buildDecorations(doc: Node): DecorationSet {
	const decorations = findLinkSpans(doc).map((linkSpan) => Decoration.widget(
		linkSpan.end,
		createPillDom(linkSpan),
		{
			side: 1,
			stopEvent: () => true,
			key: `link-pill-${linkSpan.nodeStart}-${linkSpan.mark.attrs.href}`,
		},
	))
	return DecorationSet.create(doc, decorations)
}

/**
 * ProseMirror plugin rendering a pill button after each link that opens the link bubble
 */
export function linkPill() {
	return new Plugin<DecorationSet>({
		key: linkPillPluginKey,
		state: {
			init: (_, { doc }) => buildDecorations(doc),
			apply: (tr, value) => tr.docChanged
				? buildDecorations(tr.doc)
				: value.map(tr.mapping, tr.doc),
		},
		props: {
			decorations(state) {
				return this.getState(state)
			},
		},
	})
}

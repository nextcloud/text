/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { Heading } from '../composables/useEditorHeadings.ts'

import { t } from '@nextcloud/l10n'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { getHeadings } from './extractHeadings.ts'

const headingAnchorPluginKey = new PluginKey('headingAnchor')

/**
 * Heading anchor decorations ProseMirror plugin
 * Add anchor tags with a unique id to all headings.
 *
 * @return
 */
export default function headingAnchor() {
	return new Plugin({
		key: headingAnchorPluginKey,
		state: {
			init: (_, { doc }) => anchorDecorations(doc),
			apply(tr, decorations, oldState, newState) {
				if (!tr.docChanged) {
					return decorations
				}
				if (!sameIds(getHeadings(oldState.doc), getHeadings(newState.doc))) {
					return anchorDecorations(newState.doc)
				}
				let removed = false
				const mapped = decorations.map(tr.mapping, tr.doc, {
					onRemove: () => {
						removed = true
					},
				})
				return removed ? anchorDecorations(newState.doc) : mapped
			},
		},
		props: {
			decorations(state) {
				return this.getState(state)
			},
		},
	})
}

/**
 * Check if both heading lists have the same ids in the same order.
 *
 * @param a - headings
 * @param b - headings to compare against
 */
function sameIds(a: Heading[], b: Heading[]) {
	return a.length === b.length && a.every((heading, i) => heading.id === b[i].id)
}

/**
 * Create anchor decorations for all headings in the doc
 *
 * @param doc - prosemirror doc
 */
function anchorDecorations(doc: Node) {
	return DecorationSet.create(doc, getHeadings(doc).map(decorationForHeading))
}

/**
 * Create a decoration for the given heading
 *
 * @param heading to decorate
 */
function decorationForHeading(heading: Heading) {
	return Decoration.widget(heading.offset + 1, headingToDom(heading), {
		side: -1,
		key: heading.id,
	})
}

/**
 * Returns a toDom function that creates an anchor element for the given heading
 *
 * @param heading to generate anchor for
 */
function headingToDom(heading: Heading) {
	return () => {
		const el = document.createElement('a')
		const symbol = document.createTextNode('#')
		el.appendChild(symbol)
		el.setAttribute('id', heading.id)
		el.setAttribute('aria-hidden', 'true')
		el.className = 'heading-anchor'
		el.setAttribute('href', `#${heading.id}`)
		el.setAttribute('title', t('text', 'Link to this section'))
		el.setAttribute('contenteditable', 'false')
		el.addEventListener('click', handleClick)
		return el
	}
}

/**
 * Handle click on an anchor - scroll into view and change location hash.
 *
 * @param event click that triggered the function
 */
function handleClick(event: PointerEvent) {
	event.stopPropagation()
	event.preventDefault()
	const el = event.target as Element
	el.scrollIntoView({ block: 'start', behavior: 'smooth' })
	window.history.replaceState({}, '', el.getAttribute('href'))
}

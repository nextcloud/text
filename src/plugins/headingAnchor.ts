/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import type { Node } from '@tiptap/pm/model'
import { Plugin, PluginKey, Transaction } from '@tiptap/pm/state'
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view'
import type { Heading } from '../composables/useEditorHeadings'
import extractHeadings from './extractHeadings'

export const headingAnchorPluginKey = new PluginKey('headingAnchor')

interface HeadingAnchorState {
	headings: Heading[]
	decorations: DecorationSet
}

/**
 * Heading anchor decorations ProseMirror plugin
 * Add anchor tags with a unique id to all headings.
 *
 * @return {Plugin<DecorationSet>}
 */
export default function headingAnchor() {
	return new Plugin({
		key: headingAnchorPluginKey,

		state: {
			init(_, { doc }) {
				const headings = extractHeadings(doc)
				return {
					headings,
					decorations: anchorDecorations(doc, headings),
				}
			},
			apply(tr, value, _oldState, newState) {
				if (!tr.docChanged) {
					return value
				}
				const headings = extractHeadings(newState.doc)
				const decorations =
					mapDecorations(value, tr, headings)
					|| anchorDecorations(newState.doc, headings)
				return { headings, decorations }
			},
		},

		props: {
			decorations(state) {
				return this.getState(state)!.decorations
			},
		},
	})
}

/**
 * Map the previous decorations to current document state.
 *
 * Return false if headings changed or decorations would get removed.
 * The latter prevents lost decorations in case of replacements.
 *
 * @param value - previous plugin state
 * @param tr - current transaction
 * @param headings - array of headings
 *
 * @return {false|DecorationSet}
 */
function mapDecorations(
	value: HeadingAnchorState,
	tr: Transaction,
	headings: Heading[],
) {
	if (headingsChanged(headings, value.headings)) {
		return false
	}
	let removedDecorations = false
	const decorations = value.decorations.map(tr.mapping, tr.doc, {
		onRemove: () => {
			removedDecorations = true
		},
	})
	return removedDecorations ? false : decorations
}

/**
 * Check if the headings provided are equivalent.
 *
 * @param {Array} current - array of headings
 * @param {Array} prev - headings to compare against
 */
function headingsChanged(current: Heading[], prev: Heading[]) {
	return current.length !== prev.length || current.some(isDifferentFrom(prev))
}

/**
 * Check if headings are different - i.e. have different id or level
 *
 * @param {Array} other - headings to compare against
 *
 * Returns a function to be used in a call to Array#some.
 * The returned function takes a heading and an index (as provided by iterators)
 * and compares the id and level of the heading to the one in `other` with the same index.
 */
const isDifferentFrom = (other: Heading[]) => (heading: Heading, i: number) => {
	return heading.id !== other[i].id || heading.level !== other[i].level
}

/**
 * Create anchor decorations for the given headings
 * @param doc - prosemirror doc
 * @param headings - headings structure in the doc
 */
function anchorDecorations(doc: Node, headings: Heading[]) {
	const decorations = headings.map(decorationForHeading)
	return DecorationSet.create(doc, decorations)
}

/**
 * Create a decoration for the given heading
 * @param heading to decorate
 */
function decorationForHeading(heading: Heading) {
	return Decoration.widget(heading.offset + 1, headingToDom(heading), {
		side: -1,
	})
}

/**
 * Returns a toDom function that creates an anchor element for the given heading
 * @param heading to generate anchor for
 */
function headingToDom(heading: Heading) {
	return (view: EditorView) => {
		const existing = view.dom.querySelector(`#${heading.id}`)
		if (existing) {
			return existing
		}
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
 * @param {PointerEvent} event click that triggered the function
 */
function handleClick(event: PointerEvent) {
	event.stopPropagation()
	event.preventDefault()
	const el = event.target as Element
	el.scrollIntoView({ block: 'start', behavior: 'smooth' })
	window.history.replaceState({}, '', el.getAttribute('href'))
}

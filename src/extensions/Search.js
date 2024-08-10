/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { emit } from '@nextcloud/event-bus'

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

const searchStatePluginKey = new PluginKey('searchState')
const searchDecorationsPluginKey = new PluginKey('searchDecorations')

export default Extension.create({
	name: 'Search',

	addCommands() {
		return {
			search: (query) => ({ tr }) => {
				return tr.setMeta('search', { query })
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: searchStatePluginKey,
				state: {
					init: () => ({
						query: '',
						matchAll: true,
						results: [],
						index: 0,
					}),
					apply: (tr, oldState) => {
						if (!tr.getMeta('search')) {
							return oldState
						}

						return { ...oldState, ...tr.getMeta('search') }
					},
				},
			}),
			new Plugin({
				key: searchDecorationsPluginKey,
				state: {
					init: () => {
						return DecorationSet.empty
					},
					apply: (tr, value, oldState, newState) => {
						const searchState = searchStatePluginKey.getState(newState)
						const results = executeSearch(tr.doc, searchState)
						const highlights = highlight(tr.doc, results)

						searchState.results = results

						emit('text:editor:search-results', {
							results: results.length,
						})

						return searchState.matchAll ? highlights : highlights[index]
					},
				},
				props: {
					decorations(state) {
						return this.getState(state)
					},
				},
			}),
		]
	},
})

/**
 *
 * @param doc
 * @param state
 */
function executeSearch(doc, state) {
	const results = []

	if (state.query === '') {
		return results
	}

	doc.descendants((node, offset) => {
		if (!node.isText) {
			return
		}

		const matches = node.text.matchAll(new RegExp(state.query, 'gi'))

		for (const match of matches) {
			results.push({
				from: match.index + offset,
				to: match.index + offset + state.query.length,
			})
		}
	})

	return results
}

/**
 *
 * @param doc
 * @param results
 *
 * @return {DecorationSet}
 */
function highlight(doc, results) {
	let decorations = []

	results.forEach(result => {
		decorations.push(
			Decoration.inline(result.from, result.to, {
				'data-text-el': 'search-decoration',
				style: 'background-color: #ead637; color: black; border-radius: 2px;',
			}),
		)
	})

	return DecorationSet.create(doc, decorations)
}

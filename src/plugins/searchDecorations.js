/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { emit } from '@nextcloud/event-bus'
import { searchQueryPluginKey } from './searchQuery.js'

/**
 * Search decorations ProseMirror plugin
 * Handles highlighting search matches for the search TipTap extension
 *
 * @return {Plugin<DecorationSet>}
 */
export default function searchDecorations() {
	return new Plugin({
		key: new PluginKey('searchDecorations'),
		state: {
			init(_, { doc }) {
				const search = runSearch(doc, '')
				return highlightResults(doc, search.results)
			},
			apply(tr, value, oldState, newState) {
				const oldSearch = searchQueryPluginKey.getState(oldState)
				const newSearch = searchQueryPluginKey.getState(newState)

				const queryChanged = (newSearch.query !== oldSearch.query)
				const indexChanged = (newSearch.index !== oldSearch.index)
				const matchAllChanged = (newSearch.matchAll !== oldSearch.matchAll)

				if (tr.docChanged || queryChanged || indexChanged || matchAllChanged) {
					const { results, total, index } = runSearch(tr.doc, newSearch.query, {
						matchAll: newSearch.matchAll,
						index: newSearch.index,
					})

					emit('text:editor:search-results', {
						totalMatches: (newSearch.query === '' ? null : total),
						matchIndex: index,
					})

					return highlightResults(tr.doc, results)
				} else {
					return value
				}
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
 * Runs the search on the editor to find matches
 *
 * @param {Node} doc - Editor document
 * @param {string} query - Search query
 * @param {Array} options - Search options (matchAll, index)
 *
 * @return {Array}
 */
export function runSearch(doc, query, options) {
	options = {
		matchAll: options?.matchAll ?? true,
		index: options?.index ?? 0,
	}

	const results = []

	if (!query || query === '') {
		return {
			results,
			total: results.length,
			index: options.index,
		}
	}

	doc.descendants((node, offset, _position) => {
		if (!node.isText) {
			return
		}

		const matches = node.text.matchAll(new RegExp(query, 'gi'))

		for (const match of matches) {
			results.push({
				from: match.index + offset,
				to: match.index + offset + query.length,
			})
		}
	})

	if (options.matchAll) {
		return {
			results,
			total: results.length,
			index: options.index,
		}
	} else {
		const index = normalizeIndex(options.index, results.length)

		return {
			results: [results[index] ?? results],
			total: results.length,
			index,
		}
	}
}

/**
 * Creates decorations for the matches searches
 *
 * @param {Node} doc - Editor document
 * @param {Array} results - Search results
 *
 * @return {DecorationSet}
 */
export function highlightResults(doc, results) {
	const decorations = []

	if (results.length < 1) {
		return DecorationSet.empty
	}

	results.forEach((result) => {
		decorations.push(
			Decoration.inline(result.from, result.to, {
				'data-text-el': 'search-decoration',
				style: 'background-color: #ead637; color: black; border-radius: 2px;',
			}),
		)
	})

	return DecorationSet.create(doc, decorations)
}

/**
 * Normalize the search index so the array can be accessed properly
 *
 * @param {number} index - Index of the match
 * @param {number} length - Length of the results array
 */
function normalizeIndex(index, length) {
	if (length < 1) {
		return 0
	}

	if (index < 0) {
		return (index % length + length) % length
	} else {
		return index % length
	}
}

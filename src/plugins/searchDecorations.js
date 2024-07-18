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
				const searchResults = runSearch(doc, '')
				return highlightResults(doc, searchResults)
			},
			apply(tr, value, oldState, newState) {
				const oldSearch = searchQueryPluginKey.getState(oldState)
				const newSearch = searchQueryPluginKey.getState(newState)

				if (tr.docChanged || (newSearch.query !== oldSearch.query) || (newSearch.index !== oldSearch.index)) {
					const searchResults = runSearch(tr.doc, newSearch.query, {
						matchAll: newSearch.matchAll,
						index: newSearch.index,
					})

					emit('text:editor:search-start', {
						matches: (newSearch.query === '' ? null : searchResults),
					})

					return highlightResults(tr.doc, searchResults)
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
	const opts = {
		matchAll: true,
		index: 0,
		...options,
	}

	const results = []

	if (!query || query === '') {
		return results
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

	if (opts.matchAll) {
		return results
	} else {
		const index = normalizeIndex(opts.index, results.length)
		return [results[index] ?? results]
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
				style: 'background-color: #ead637; color: black; border-radius: 2px;',
			}),
		)
	})

	return DecorationSet.create(doc, decorations)
}

/**
 * Normalized the search index so the array can be accessed properly
 *
 * @param {number} index - Index of the match
 * @param {number} length - Length of the results array
 */
function normalizeIndex(index, length) {
	if (index < 0) {
		return (index % length + length) % length
	} else {
		return index % length
	}
}

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
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
			apply(tr, _, oldState, newState) {
				const { query: oldQuery } = searchQueryPluginKey.getState(oldState)
				const { query: newQuery } = searchQueryPluginKey.getState(newState)

				if (tr.docChanged || (newQuery !== oldQuery) || (newQuery === '')) {
					const searchResults = runSearch(tr.doc, newQuery)
					return highlightResults(tr.doc, searchResults)
				} else {
					const searchResults = runSearch(tr.doc, oldQuery)
					return highlightResults(tr.doc, searchResults)
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
 *
 * @return {Array}
 */
export function runSearch(doc, query) {
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

	return results
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
				style: 'background-color: #f8ff00; color: black; border-radius: 4px;',
			}),
		)
	})

	return DecorationSet.create(doc, decorations)
}

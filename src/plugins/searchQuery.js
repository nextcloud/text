/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Plugin, PluginKey } from '@tiptap/pm/state'

export const searchQueryPluginKey = new PluginKey('searchQuery')

/**
 * Search query ProseMirror plugin
 * Sets the search query for the search TipTap extension
 *
 * @function searchQuery
 * @return {Plugin}
 */
export function searchQuery() {
	return new Plugin({
		key: searchQueryPluginKey,
		state: {
			init: () => ({
				query: '',
				matchAll: true,
				index: 0,
			}),
			apply: (tr, oldState) => {
				const trMeta = tr.getMeta('searchQuery')
				const isQuery = trMeta?.query !== undefined

				if (isQuery || trMeta?.match) {
					const newState = {
						query: trMeta.query ?? oldState.query,
						matchAll: trMeta.matchAll ?? oldState.matchAll,
						index: oldState.index,
					}

					if (trMeta?.match) {
						newState.matchAll = false
						newState.index = (oldState.index + trMeta.match)
					}

					return newState
				} else {
					return oldState
				}
			},
		},
	})
}

export const setSearchQuery = (query, matchAll) => ({ tr }) => {
	return tr.setMeta('searchQuery', { query, matchAll })
}

export const nextMatch = () => ({ tr }) => {
	return tr.setMeta('searchQuery', { match: 1 })
}

export const previousMatch = () => ({ tr }) => {
	return tr.setMeta('searchQuery', { match: -1 })
}

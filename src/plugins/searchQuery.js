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

				if (isQuery || trMeta?.nextMatch) {
					const newState = {
						query: trMeta.query ?? oldState.query,
						matchAll: trMeta.matchAll ?? oldState.matchAll,
						index: oldState.index ?? 0,
					}

					if (trMeta?.nextMatch) {
						newState.index = oldState.index + 1
						newState.matchAll = false
						newState.nextMatch = false
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
	return tr.setMeta('searchQuery', { nextMatch: true })
}

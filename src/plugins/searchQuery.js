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
			init: () => ({ query: '', all: true, index: 0 }),
			apply: (tr, oldState) => {
				const searchQuery = tr.getMeta('searchQuery')
				const all = tr.getMeta('all')
				const index = tr.getMeta('index')

				if (searchQuery !== undefined) {
					return {
						query: searchQuery,
						all,
						index,
					}
				} else {
					return oldState
				}
			},
		},
	})
}

export const setSearchQuery = (query, all, index) => ({ tr }) => {
	return tr
		.setMeta('searchQuery', query)
		.setMeta('all', all)
		.setMeta('index', index)
}

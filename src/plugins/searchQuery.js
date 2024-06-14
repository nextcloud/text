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
			init: () => ({ query: '' }),
			apply: (tr, oldState) => {
				const searchQuery = tr.getMeta('searchQuery')

				if (searchQuery !== undefined) {
					return {
						query: searchQuery,
					}
				} else {
					return oldState
				}
			},
		},
	})
}

export const setSearchQuery = (query) => ({ tr }) => {
	return tr.setMeta('searchQuery', query)
}

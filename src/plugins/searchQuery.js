import { Plugin, PluginKey } from '@tiptap/pm/state'

/**
 * Search query ProseMirror plugin
 * Sets the search query for the search TipTap extension
 *
 * @function searchQuery
 * @return {Plugin}
 */
export function searchQuery() {
	return new Plugin({
		key: new PluginKey('searchQuery'),
		state: {
			init: () => ({ query: '' }),
			apply: (tr, oldState) => {
				const searchQuery = tr.getMeta('searchQuery')

				if (searchQuery) {
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

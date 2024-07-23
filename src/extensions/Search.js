/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { subscribe } from '@nextcloud/event-bus'
import searchDecorations from '../plugins/searchDecorations.js'
import {
	setSearchQuery,
	nextMatch,
	previousMatch,
	searchQuery,
} from '../plugins/searchQuery.js'

export default Extension.create({
	name: 'Search',

	onCreate() {
		subscribe('text:editor:search', ({ query, matchAll }) => {
			this.editor.commands.setSearchQuery(query, matchAll)
		})

		subscribe('text:editor:search-next', () => {
			this.editor.commands.nextMatch()
		})

		subscribe('text:editor:search-previous', () => {
			this.editor.commands.previousMatch()
		})
	},

	addCommands() {
		return {
			setSearchQuery,
			nextMatch,
			previousMatch,
		}
	},

	addProseMirrorPlugins() {
		return [
			searchQuery(),
			searchDecorations(),
		]
	},
})

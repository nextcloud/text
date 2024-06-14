/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import { subscribe } from '@nextcloud/event-bus'
import searchDecorations from '../plugins/searchDecorations.js'
import { setSearchQuery, searchQuery } from '../plugins/searchQuery.js'

export default Extension.create({
	name: 'Search',

	onCreate() {
		subscribe('text:editor:search', (event) => {
			this.editor.commands.setSearchQuery(event.query)
		})
	},

	addCommands() {
		return {
			setSearchQuery,
		}
	},

	addProseMirrorPlugins() {
		return [
			searchQuery(),
			searchDecorations(),
		]
	},
})

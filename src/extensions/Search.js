/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Extension } from '@tiptap/core'
import searchDecorations from '../plugins/searchDecorations.js'
import {
	setSearchQuery,
	nextMatch,
	previousMatch,
	searchQuery,
} from '../plugins/searchQuery.js'

export default Extension.create({
	name: 'Search',

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

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { emojiSearch } from '@nextcloud/vue'
import createSuggestions from '../suggestions.js'
import EmojiList from './EmojiList.vue'

export default () => createSuggestions({
	listComponent: EmojiList,
	items: ({ query }) => {
		return emojiSearch(query)
	},
	command: ({ editor, range, props }) => {
		editor
			.chain()
			.focus()
			.insertContentAt(range, props.native + ' ')
			.run()
	},
})

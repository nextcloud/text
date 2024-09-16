/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TiptapOrderedList from '@tiptap/extension-ordered-list'

const OrderedList = TiptapOrderedList.extend({
	addAttributes() {
		return {
			...this.parent?.(),
			isList: {
				default: true,
				rendered: false,
			},
		}
	},
})

export default OrderedList

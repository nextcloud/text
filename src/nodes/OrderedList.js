/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { OrderedList as TiptapOrderedList } from '@tiptap/extension-list'

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

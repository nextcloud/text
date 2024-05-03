/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { markInputRule, markPasteRule } from '@tiptap/core'
import { Bold, starInputRegex, starPasteRegex } from '@tiptap/extension-bold'

const Strong = Bold.extend({
	name: 'strong',

	addInputRules() {
		return [
			markInputRule({
				find: starInputRegex,
				type: this.type,
			}),
		]
	},

	addPasteRules() {
		return [
			markPasteRule({
				find: starPasteRegex,
				type: this.type,
			}),
		]
	},
})

export default Strong

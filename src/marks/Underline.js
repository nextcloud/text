/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapUnderline from '@tiptap/extension-underline'
import { markInputRule, markPasteRule } from '@tiptap/core'
import { underscoreInputRegex, underscorePasteRegex } from '@tiptap/extension-bold'

const Underline = TipTapUnderline.extend({

	parseHTML() {
		return [
			{
				tag: 'u',
			},
			{
				style: 'text-decoration',
				getAttrs: value => value === 'underline',
			},
		]
	},

	renderHTML() {
		return ['u', 0]
	},

	toMarkdown: {
		open: '__',
		close: '__',
		mixable: true,
		expelEnclosingWhitespace: true,
	},

	addInputRules() {
		return [
			markInputRule({
				find: underscoreInputRegex,
				type: this.type,
			}),
		]
	},

	addPasteRules() {
		return [
			markPasteRule({
				find: underscorePasteRegex,
				type: this.type,
			}),
		]
	},

})

export default Underline

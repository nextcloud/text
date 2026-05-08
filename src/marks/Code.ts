/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { markInputRule, markPasteRule } from '@tiptap/core'
import TipTapCode from '@tiptap/extension-code'

/**
 * Regular expressions to match inline code blocks enclosed in backticks.
 * Reverts upstream PR https://github.com/ueberdosis/tiptap/pull/5916 which
 * introduced isuee https://github.com/nextcloud/text/issues/5483.
 */
export const inputRegex = /(?<!`)`([^`]+)`(?!`)/

/**
 * Matches inline code while pasting.
 */
export const pasteRegex = /(?<!`)`([^`]+)`(?!`)/g

const Code = TipTapCode.extend({
	// List all enabled marks except 'code' and 'link' (issue #4900)
	excludes: 'em strike strong underline',

	addInputRules() {
		return [
			markInputRule({
				find: inputRegex,
				type: this.type,
			}),
		]
	},

	addPasteRules() {
		return [
			markPasteRule({
				find: pasteRegex,
				type: this.type,
			}),
		]
	},
})

export default Code

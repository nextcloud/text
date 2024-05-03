/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { InputRule, wrappingInputRule } from '@tiptap/core'

/**
 * Wrapping input handler that will append the content of the last match
 *
 * @param {RegExp} find find param for the wrapping input rule
 * @param {object} type Node Type object
 * @param {*} getAttributes handler to get the attributes
 */
export default function(find, type, getAttributes) {
	const handler = ({ state, range, match }) => {
		const wrap = wrappingInputRule({ find, type, getAttributes })
		wrap.handler({ state, range, match })
		// Insert the first character after bullet if there is one
		if (match.length >= 3) {
			state.tr.insertText(match[2])
		}
	}
	return new InputRule({ find, handler })
}

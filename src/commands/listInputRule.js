/*
 * @copyright Copyright (c) 2021 Jonas Meurer <jonas@freesources.org>
 *
 * @author Jonas Meurer <jonas@freesources.org>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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

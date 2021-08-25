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

import { InputRule, wrappingInputRule } from 'prosemirror-inputrules'

/**
 * @param regexp
 * @param nodeType
 * @param getAttrs
 */
export default function(regexp, nodeType, getAttrs) {
	return new InputRule(regexp, (state, match, start, end) => {
		const tr = wrappingInputRule(regexp, nodeType).handler(state, match, start, end)

		// Insert the first character after bullet
		if (match.length >= 3) {
			tr.insertText(match[2])
		}

		return tr
	})
}

/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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

/**
 * @param {object} md Markdown object
 */
export default function splitMixedLists(md) {
	md.core.ruler.after('github-task-lists', 'split-mixed-task-lists', state => {
		const tokens = state.tokens

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i]
			if (token.attrGet('class') !== 'contains-task-list') {
				continue
			}
			const firstChild = tokens[i + 1]
			const startsWithTask = firstChild.attrGet('class') === 'task-list-item'
			if (!startsWithTask) {
				token.attrs.splice(token.attrIndex('class'))
				if (token.attrs.length === 0) {
					token.attrs = null
				}
			}
			const splitBefore = findChildOf(tokens, i, child => {
				return child.nesting === 1
					&& child.attrGet('class') !== firstChild.attrGet('class')
			})
			if (splitBefore > i) {
				splitListAt(tokens, splitBefore, state.Token)
			}
		}

		return false
	})
}

/**
 * @param {Array} tokens - all the tokens in the doc
 * @param {number} index - index into the tokens array where to split
 * @param {object} TokenConstructor - constructor provided by Markdown-it
 */
function splitListAt(tokens, index, TokenConstructor) {
	const closeList = new TokenConstructor('bullet_list_close', 'ul', -1)
	closeList.block = true
	const openList = new TokenConstructor('bullet_list_open', 'ul', 1)
	openList.attrSet('class', 'contains-task-list')
	openList.block = true
	tokens.splice(index, 0, closeList, openList)
}

/**
 * @param {Array} tokens - all the tokens in the doc
 * @param {number} parentIndex - index of the parent in the tokens array
 * @param {Function} predicate - test function returned child needs to pass
 */
function findChildOf(tokens, parentIndex, predicate) {
	const searchLevel = tokens[parentIndex].level + 1
	for (let i = parentIndex + 1; i < tokens.length; i++) {
		const token = tokens[i]
		if (token.level < searchLevel) {
			return -1
		}
		if ((token.level === searchLevel) && predicate(tokens[i])) {
			return i
		}
	}
	return -1
}

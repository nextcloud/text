/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * @param {import('markdown-it')} md Markdown object
 */
export default function splitMixedLists(md) {
	md.core.ruler.after('task-lists', 'split-mixed-task-lists', state => {
		const tokens = state.tokens

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i]
			if (!includesClass(token, 'contains-task-list')) {
				continue
			}
			const firstChild = tokens[i + 1]
			const startsWithTask = includesClass(firstChild, 'task-list-item')
			if (!startsWithTask) {
				token.attrs.splice(token.attrIndex('class'))
				if (token.attrs.length === 0) {
					token.attrs = null
				}
			}
			const splitBefore = findChildOf(tokens, i, child => {
				return child.nesting === 1
					&& includesClass(child, 'task-list-item') !== startsWithTask
			})
			if (splitBefore > i) {
				splitListAt(tokens, splitBefore, state.Token)
			}
		}

		return false
	})
}

/**
 * @param {object} token MarkdownIT token
 * @param {string} cls Class name to query
 */
function includesClass(token, cls) {
	return token.attrGet('class')?.split(' ').includes(cls) || false
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
	openList.markup = tokens[index].markup
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

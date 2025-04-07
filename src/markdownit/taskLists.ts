/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: MIT
 */

// Markdown-it plugin to render GitHub-style task lists; see
//
// https://github.com/blog/1375-task-lists-in-gfm-issues-pulls-comments
// https://github.com/blog/1825-task-lists-in-all-markdown-documents

import MarkdownIt from 'markdown-it'
import StateCore from 'markdown-it/lib/rules_core/state_core.mjs'
import Token from 'markdown-it/lib/token.mjs'

interface TaskListsOptions {
	enabled: boolean
	label: boolean
	lineNumber: boolean
}

const checkboxRegex = /^ *\[([\sx])] /i

/**
 *
 * @param md -
 * @param options - taskLists plugin options
 */
export default function taskLists(
	md: MarkdownIt,
	options: TaskListsOptions = { enabled: false, label: false, lineNumber: false },
): void {
	md.core.ruler.after('inline', 'task-lists', (state) =>
		processToken(state, options),
	)
	md.renderer.rules.taskListItemCheckbox = (tokens) => {
		const token = tokens[0]
		const checkedAttribute = token.attrGet('checked') ? 'checked="" ' : ''
		const disabledAttribute = token.attrGet('disabled') ? 'disabled="" ' : ''
		const line = token.attrGet('line')
		const idAttribute = `id="${token.attrGet('id')}" `
		const dataLineAttribute =
			line && options.lineNumber ? `data-line="${line}" ` : ''

		return `<input class="task-list-item-checkbox" type="checkbox" ${checkedAttribute}${disabledAttribute}${dataLineAttribute}${idAttribute}/>`
	}

	md.renderer.rules.taskListItemLabel_close = () => {
		return '</label>'
	}

	md.renderer.rules.taskListItemLabel_open = (tokens: Token[]) => {
		const token = tokens[0]
		const id = token.attrGet('id')
		return `<label for="${id}">`
	}
}

/**
 *
 * @param state - markdownIt state
 * @param options - taskLists plugin options
 */
function processToken(state: StateCore, options: TaskListsOptions): boolean {
	const allTokens = state.tokens
	for (let i = 2; i < allTokens.length; i++) {
		if (!isTodoItem(allTokens, i)) {
			continue
		}

		todoify(allTokens[i], options)
		allTokens[i - 2].attrJoin(
			'class',
			`task-list-item ${options.enabled ? ' enabled' : ''}`,
		)

		const parentToken = findParentToken(allTokens, i - 2)
		if (parentToken) {
			const classes = parentToken.attrGet('class') ?? ''
			if (!classes.match(/(^| )contains-task-list/)) {
				parentToken.attrJoin('class', 'contains-task-list')
			}
		}
	}
	return false
}

/**
 *
 * @param tokens - MarkdownIt nodes/tokens
 * @param index - index of the token to find
 */
function findParentToken(tokens: Token[], index: number): Token | undefined {
	const targetLevel = tokens[index].level - 1
	for (
		let currentTokenIndex = index - 1;
		currentTokenIndex >= 0;
		currentTokenIndex--
	) {
		if (tokens[currentTokenIndex].level === targetLevel) {
			return tokens[currentTokenIndex]
		}
	}
	return undefined
}

/**
 *
 * @param tokens - MarkdownIt nodes/tokens
 * @param index - index of the token to check
 */
function isTodoItem(tokens: Token[], index: number): boolean {
	return (
		isInline(tokens[index]) &&
		isParagraph(tokens[index - 1]) &&
		isListItem(tokens[index - 2]) &&
		startsWithTodoMarkdown(tokens[index])
	)
}

/**
 *
 * @param token - MarkdownIt node/token
 * @param options - taskLists plugin options
 */
function todoify(token: Token, options: TaskListsOptions): void {
	if (token.children == null) {
		return
	}

	const id = generateIdForToken(token)

	token.children.splice(0, 0, createCheckboxToken(token, options.enabled, id))
	token.children[1].content = token.children[1].content.replace(checkboxRegex, '')

	if (options.label) {
		token.children.splice(1, 0, createLabelBeginToken(id))
		token.children.push(createLabelEndToken())
	}
}

/**
 *
 * @param token - MarkdownIt node/token
 */
function generateIdForToken(token: Token): string {
	if (token.map) {
		return `task-item-${token.map[0]}`
	} else {
		return `task-item-${Math.ceil(Math.random() * (10000 * 1000) - 1000)}`
	}
}

/**
 *
 * @param token - MarkdownIt node/token
 * @param enabled - whether input element is enabled or not
 * @param id - ID of the taskLists item
 */
function createCheckboxToken(token: Token, enabled: boolean, id: string): Token {
	const checkbox = new Token('taskListItemCheckbox', '', 0)
	if (!enabled) {
		checkbox.attrSet('disabled', 'true')
	}
	if (token.map) {
		checkbox.attrSet('line', token.map[0].toString())
	}

	checkbox.attrSet('id', id)

	const checkboxRegexResult = checkboxRegex.exec(token.content)
	const isChecked = checkboxRegexResult?.[1].toLowerCase() === 'x'
	if (isChecked) {
		checkbox.attrSet('checked', 'true')
	}

	return checkbox
}

/**
 *
 * @param id - ID of the taskLists item
 */
function createLabelBeginToken(id: string): Token {
	const labelBeginToken = new Token('taskListItemLabel_open', '', 1)
	labelBeginToken.attrSet('id', id)
	return labelBeginToken
}

/**
 *
 */
function createLabelEndToken(): Token {
	return new Token('taskListItemLabel_close', '', -1)
}

/**
 *
 * @param token - MarkdownIt node/token
 */
function isInline(token: Token): boolean {
	return token.type === 'inline'
}

/**
 *
 * @param token - MarkdownIt node/token
 */
function isParagraph(token: Token): boolean {
	return token.type === 'paragraph_open'
}

/**
 *
 * @param token - MarkdownIt node/token
 */
function isListItem(token: Token): boolean {
	return token.type === 'list_item_open'
}

/**
 *
 * @param token - MarkdownIt node/token
 */
function startsWithTodoMarkdown(token: Token): boolean {
	return checkboxRegex.test(token.content)
}

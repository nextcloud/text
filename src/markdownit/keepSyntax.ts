/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { MarkdownIt, StateCore, Token } from 'markdown-it'

/**
 * Create a copy of a token, optionally with different content
 *
 * @param state markdown-it state
 * @param token token to copy
 * @param content content of the copy
 */
function copyToken(state: StateCore, token: Token, content = token.content): Token {
	return Object.assign(new state.Token(token.type, token.tag, token.nesting), token, { content })
}

/**
 * Add a mark for keeping special markdown syntax unescaped
 *
 * @param md Markdown object
 */
export default function keepSyntax(md: MarkdownIt): void {
	// Extracting named groups as positive lookbehind patterns are not supported by Safari
	const escaped = /(\n(?<linestart>[#\-*+>])|(?<special>[`*\\~[\]]+))/

	md.core.ruler.before('text_join', 'tag-markdown-syntax', (state) => {
		const open = new state.Token('keep_md_open', 'span', 1)
		open.attrSet('class', 'keep-md')
		const close = new state.Token('keep_md_close', 'span', -1)

		for (let i = 0; i < state.tokens.length; i++) {
			const block = state.tokens[i]
			if (block.type !== 'inline' || !block.children) {
				continue
			}

			for (let j = 0; j < block.children.length; j++) {
				const token = block.children[j]
				if (token.type === 'text') {
					const match = escaped.exec(token.content)
					if (match?.groups) {
						const index = match.groups.linestart
							? match.index + 1
							: match.index
						const matchChars
							= match.groups.linestart ?? match.groups.special
						const contentNext = index + matchChars.length
						block.children.splice(
							j,
							1,
							copyToken(state, token, token.content.slice(0, index)),
							copyToken(state, open),
							copyToken(state, token, token.content.slice(index, contentNext)),
							copyToken(state, close),
							copyToken(state, token, token.content.slice(contentNext)),
						)
						j += 3
					}
				}
			}
		}

		return false
	})
}

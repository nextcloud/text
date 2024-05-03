/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Add a mark for keeping special markdown syntax unescaped
 *
 * @param {object} md Markdown object
 */
export default function keepSyntax(md) {
	// Extracting named groups as positive lookbehind patterns are not supported by Safari
	const escaped = /(\n(?<linestart>[#\-*+>])|(?<special>[`*\\~[\]]+))/

	md.core.ruler.before('text_join', 'tag-markdown-syntax', state => {
		const open = new state.Token('keep_md_open', 'span', 1)
		open.attrSet('class', 'keep-md')
		const close = new state.Token('keep_md_close', 'span', -1)

		for (let i = 0; i < state.tokens.length; i++) {
			const block = state.tokens[i]
			if (block.type !== 'inline') continue

			for (let j = 0; j < block.children.length; j++) {
				const token = block.children[j]
				if (token.type === 'text') {
					const match = escaped.exec(token.content)
					if (match) {
						const index = match.groups.linestart ? match.index + 1 : match.index
						const matchChars = match.groups.linestart ?? match.groups.special
						const contentNext = index + matchChars.length
						block.children.splice(j, 1,
							Object.assign({}, token, { content: token.content.slice(0, index) }),
							Object.assign({}, open),
							Object.assign({}, token, { content: token.content.slice(index, contentNext) }),
							Object.assign({}, close),
							Object.assign({}, token, { content: token.content.slice(contentNext) }),
						)
						j += 3
					}
				}
			}
		}

		return false
	})
}

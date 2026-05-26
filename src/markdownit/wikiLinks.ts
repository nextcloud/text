/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type MarkdownIt from 'markdown-it'

/**
 * markdown-it plugin: parse Obsidian-style wiki links and wiki image links
 *
 * Produces
 * Produces a standard `link` or `image` token so that downstream plugins
 * treat it exactly like a normal link/image.
 *
 * A `data-wiki-image` or `data-wiki-link` attribute is set so the ProseMirror
 * serializer can round-trip the syntax back to the wiki style link/image syntax.
 *
 * @param md - The markdown-it instance to extend
 */
export default function wikiLinks(md: MarkdownIt): void {
	// Parse wiki image links `![[filename]]`
	md.inline.ruler.before('image', 'wiki_image_link', (state, silent) => {
		const src = state.src
		const pos = state.pos

		// Must start with ![[
		if (src.charCodeAt(pos) !== 0x21 /* ! */) { return false }
		if (src.charCodeAt(pos + 1) !== 0x5b /* [ */) { return false }
		if (src.charCodeAt(pos + 2) !== 0x5b /* [ */) { return false }

		// Find the closing ]] — no newlines allowed inside
		let end = pos + 3
		while (end < src.length) {
			const ch = src.charCodeAt(end)
			if (ch === 0x0a /* \n */) { return false }
			if (ch === 0x5d /* ] */ && src.charCodeAt(end + 1) === 0x5d /* ] */) { break }
			end++
		}
		if (end >= src.length) { return false }

		const filename = src.slice(pos + 3, end)
		if (!filename) { return false }

		if (silent) { return true }

		const token = state.push('image', 'img', 0)
		token.attrs = [
			['src', filename],
			['alt', ''],
			['data-wiki-image', 'true'],
		]
		// Alt text is derived from token.children by the renderer
		const altToken = new state.Token('text', '', 0)
		altToken.content = filename
		token.children = [altToken]
		token.content = filename

		state.pos = end + 2
		return true
	})

	// Parse wiki links `[[link]]`
	md.inline.ruler.before('link', 'wiki_link', (state, silent) => {
		const src = state.src
		const pos = state.pos

		// Must start with [[
		if (src.charCodeAt(pos) !== 0x5b /* [ */) { return false }
		if (src.charCodeAt(pos + 1) !== 0x5b /* [ */) { return false }

		// Prevent matching `[[` that is itself preceded by `[` (e.g. `[[[foo]]]`)
		if (pos > 0 && src.charCodeAt(pos - 1) === 0x5b /* [ */) { return false }

		// Find the closing ]] — no newlines allowed inside
		let end = pos + 2
		while (end < src.length) {
			const ch = src.charCodeAt(end)
			if (ch === 0x0a /* \n */) { return false }
			if (ch === 0x5d /* ] */ && src.charCodeAt(end + 1) === 0x5d /* ] */) { break }
			end++
		}
		if (end >= src.length) { return false }

		const content = src.slice(pos + 2, end)
		if (!content) { return false }

		// Split on first | to get target and optional display text
		const pipeIdx = content.indexOf('|')
		const target = pipeIdx === -1 ? content : content.slice(0, pipeIdx)
		const displayText = pipeIdx === -1 ? content : content.slice(pipeIdx + 1)

		if (!target) { return false }

		// Reject targets containing characters that conflict with CommonMark inline syntax
		// ([, ], * are not valid in file names on most systems anyway)
		if (/[[\]*]/.test(target)) { return false }

		if (silent) { return true }

		const tokenOpen = state.push('link_open', 'a', 1)
		tokenOpen.attrs = [
			['href', target],
			['data-wiki-link', 'true'],
		]

		const tokenText = state.push('text', '', 0)
		tokenText.content = displayText

		state.push('link_close', 'a', -1)

		state.pos = end + 2
		return true
	})
}

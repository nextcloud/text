/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type MarkdownIt from 'markdown-it'
import type StateBlock from 'markdown-it/lib/rules_block/state_block'
import type Token from 'markdown-it/lib/token'

const DETAILS_START_REGEX = /^<details>\s*$/
const DETAILS_END_REGEX = /^<\/details>\s*$/
const SUMMARY_REGEX = /(?<=^<summary>).*(?=<\/summary>\s*$)/

/**
 *
 * @param state
 * @param startLine
 * @param endLine
 * @param silent
 */
function parseDetails(state: StateBlock, startLine: number, endLine: number, silent: boolean) {
	// let autoClosedBlock = false
	let start = state.bMarks[startLine] + state.tShift[startLine]
	let max = state.eMarks[startLine]

	// Details block start
	if (!state.src.slice(start, max).match(DETAILS_START_REGEX)) {
		return false
	}

	// Since start is found, we can report success here in validation mode
	if (silent) {
		return true
	}

	let detailsFound = false
	let detailsSummary = null
	let nestedCount = 0
	let nextLine = startLine
	for (;;) {
		nextLine++
		if (nextLine >= endLine) {
			break
		}

		start = state.bMarks[nextLine] + state.tShift[nextLine]
		max = state.eMarks[nextLine]

		// Details summary
		const m = state.src.slice(start, max).match(SUMMARY_REGEX)
		if (m && detailsSummary === null) {
			// Only set `detailsSummary` the first time
			// Ignore future summary tags (in nested/broken details)
			detailsSummary = m[0].trim()
			continue
		}

		// Nested details
		if (state.src.slice(start, max).match(DETAILS_START_REGEX)) {
			nestedCount++
		}

		// Details block end
		if (!state.src.slice(start, max).match(DETAILS_END_REGEX)) {
			continue
		}

		// Regard nested details blocks
		if (nestedCount > 0) {
			nestedCount--
		} else {
			detailsFound = true
			break
		}
	}

	if (!detailsFound || detailsSummary === null) {
		return false
	}

	const oldParent = state.parentType
	const oldLineMax = state.lineMax
	state.parentType = 'reference'

	// This will prevent lazy continuations from ever going past our end marker
	state.lineMax = nextLine

	// Push tokens to the state

	let token = state.push('details_open', 'details', 1)
	token.block = true
	token.info = detailsSummary
	token.map = [startLine, nextLine]

	token = state.push('details_summary', 'summary', 1)
	token.block = false

	// Parse and push summary to preserve markup
	const tokens: Token[] = []
	state.md.inline.parse(detailsSummary, state.md, state.env, tokens)
	for (const t of tokens) {
		token = state.push(t.type, t.tag, t.nesting)
		token.block = t.block
		token.markup = t.markup
		token.content = t.content
	}

	token = state.push('details_summary', 'summary', -1)

	state.md.block.tokenize(state, startLine + 2, nextLine)

	token = state.push('details_close', 'details', -1)
	token.block = true

	state.parentType = oldParent
	state.lineMax = oldLineMax
	state.line = nextLine + 1

	return true
}

/**
 * @param {object} md Markdown object
 */
export default function details(md: MarkdownIt) {
	md.block.ruler.before('fence', 'details', parseDetails, {
		alt: ['paragraph', 'reference', 'blockquote', 'list'],
	})
}

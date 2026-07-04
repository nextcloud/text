/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type MarkdownIt from 'markdown-it'
import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs'

import linkRule from 'markdown-it/lib/rules_inline/link.mjs'

type RefType = 'full' | 'collapsed' | 'shortcut'

/**
 * Decide which reference form (if any) the wrapped link rule matched,
 * by inspecting the source range it consumed.
 *
 * @param state - markdown-it inline parser state
 * @param startPos - position the rule started at
 * @param endPos - position the rule ended at
 */
function detectReferenceForm(
	state: StateInline,
	startPos: number,
	endPos: number,
): { label: string; type: RefType } | undefined {
	const savedPos = state.pos
	const labelEnd = state.md.helpers.parseLinkLabel(state, startPos)
	state.pos = savedPos
	if (labelEnd < 0) {
		return undefined
	}

	const labelStart = startPos + 1
	const displayLabel = state.src.slice(labelStart, labelEnd)
	const after = labelEnd + 1

	if (after >= endPos) {
		return { label: displayLabel, type: 'shortcut' }
	}

	const code = state.src.charCodeAt(after)

	if (code === 0x28 /* ( */) {
		// inline form
		return undefined
	}

	if (code !== 0x5b /* [ */) {
		return { label: displayLabel, type: 'shortcut' }
	}

	if (endPos === after + 2) {
		return { label: displayLabel, type: 'collapsed' }
	}

	return { label: state.src.slice(after + 1, endPos - 1), type: 'full' }
}

/**
 * Wrap an existing inline rule so that, when it succeeds via the reference
 * branch, the freshly pushed token is tagged with reference metadata.
 *
 * @param original - upstream inline link rule
 */
function wrap(original: (state: StateInline, silent: boolean) => boolean) {
	return (state: StateInline, silent: boolean): boolean => {
		const start = state.pos
		if (!original(state, silent)) {
			return false
		}
		if (silent) {
			return true
		}

		const info = detectReferenceForm(state, start, state.pos)
		if (!info) {
			return true
		}

		const targetType = 'link_open'
		const target = state.tokens.findLast((t) => t.type === targetType)
		if (target) {
			target.attrSet('data-md-reference-label', info.label)
			target.attrSet('data-md-reference-type', info.type)
		}

		return true
	}
}

/**
 * markdown-it plugin: preserve reference-style link syntax across
 * the parse/serialize round-trip.
 *
 * Adds  `data-md-reference-label` / `data-md-reference-type` attributes to
 * `link_open` tokens emitted via the reference branch.
 *
 * @param md - markdown-it instance to extend
 */
export default function referenceLinks(md: MarkdownIt): void {
	md.inline.ruler.at('link', wrap(linkRule))
}

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * The first failing browser fixture measured 264,599/267,666 characters and
 * 8,163/8,259 lines. These ceilings remain over 20% below the smaller failing
 * dimension; recalibrate only with the same production-build browser gate.
 */
export const RENDERED_COMPARISON_LIMITS = Object.freeze({
	maximumCharactersPerSnapshot: 210_000,
	maximumLinesPerSnapshot: 6_500,
})

/**
 * Determine whether rendered semantic comparison must be skipped before parsing.
 *
 * @param before Earlier raw Markdown
 * @param after Later raw Markdown
 */
export function exceedsRenderedComparisonLimit(before: string, after: string): boolean {
	return [before, after].some((content) => content.length > RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot
		|| exceedsLineLimit(content))
}

/** @param content Raw Markdown */
function exceedsLineLimit(content: string): boolean {
	if (!content) {
		return false
	}
	let lines = 1
	for (let index = 0; index < content.length; index++) {
		const character = content[index]
		if (character === '\n' || (character === '\r' && content[index + 1] !== '\n')) {
			lines++
			if (lines > RENDERED_COMPARISON_LIMITS.maximumLinesPerSnapshot) {
				return true
			}
		}
	}
	return false
}

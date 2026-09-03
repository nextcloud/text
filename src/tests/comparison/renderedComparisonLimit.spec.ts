/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { exceedsRenderedComparisonLimit, RENDERED_COMPARISON_LIMITS } from '../../comparison/markdownComparison.ts'

describe('rendered comparison preflight', () => {
	it('accepts each exact geometry ceiling and rejects the first excess', () => {
		const chars = RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot
		const lineChars = RENDERED_COMPARISON_LIMITS.maximumCharactersPerLine
		const line = `${'a'.repeat(lineChars - 1)}\n`
		const source = (length: number) => line.repeat(Math.floor(length / line.length)) + 'a'.repeat(length % line.length)
		expect(exceedsRenderedComparisonLimit(source(chars), 'after')).toBe(false)
		expect(exceedsRenderedComparisonLimit(source(chars + 1), 'after')).toBe(true)
		expect(exceedsRenderedComparisonLimit('a'.repeat(lineChars), 'after')).toBe(false)
		expect(exceedsRenderedComparisonLimit('a'.repeat(lineChars + 1), 'after')).toBe(true)
		const lines = RENDERED_COMPARISON_LIMITS.maximumLinesPerSnapshot
		expect(exceedsRenderedComparisonLimit('x\n'.repeat(lines - 1), 'after')).toBe(false)
		expect(exceedsRenderedComparisonLimit('x\r'.repeat(lines), 'after')).toBe(true)
	})
})

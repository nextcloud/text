/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import {
	exceedsRenderedComparisonLimit,
	RENDERED_COMPARISON_LIMITS,
} from '../../comparison/renderedComparisonLimit.ts'

describe('renderedComparisonLimit', () => {
	it('keeps at least 20% below the smallest measured failing dimensions', () => {
		expect(RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot).toBeLessThanOrEqual(Math.floor(264_599 * 0.8))
		expect(RENDERED_COMPARISON_LIMITS.maximumLinesPerSnapshot).toBeLessThanOrEqual(Math.floor(8_163 * 0.8))
	})

	it('allows a normal page comparison', () => {
		expect(exceedsRenderedComparisonLimit('# Before\n\nContent', '# After\n\nRevised content')).toBe(false)
	})

	it.each([
		RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot - 1,
		RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot,
	])('allows a snapshot with %i characters', (length) => {
		expect(exceedsRenderedComparisonLimit('a'.repeat(length), 'After')).toBe(false)
	})

	it('rejects either snapshot above the character limit', () => {
		const oversized = 'a'.repeat(RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot + 1)
		expect(exceedsRenderedComparisonLimit(oversized, 'After')).toBe(true)
		expect(exceedsRenderedComparisonLimit('Before', oversized)).toBe(true)
	})

	it.each([
		RENDERED_COMPARISON_LIMITS.maximumLinesPerSnapshot - 1,
		RENDERED_COMPARISON_LIMITS.maximumLinesPerSnapshot,
	])('allows a snapshot with %i lines', (lineCount) => {
		const content = Array.from({ length: lineCount }, () => 'line').join('\n')
		expect(exceedsRenderedComparisonLimit(content, 'After')).toBe(false)
	})

	it('rejects either snapshot above the line limit with LF, CRLF, or CR separators', () => {
		const lineCount = RENDERED_COMPARISON_LIMITS.maximumLinesPerSnapshot + 1
		for (const separator of ['\n', '\r\n', '\r']) {
			const oversized = Array.from({ length: lineCount }, () => 'line').join(separator)
			expect(exceedsRenderedComparisonLimit(oversized, 'After')).toBe(true)
			expect(exceedsRenderedComparisonLimit('Before', oversized)).toBe(true)
		}
	})
})

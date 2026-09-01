/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import {
	COMPLETE_SOURCE_DISPLAY_LIMITS,
	displayBoundedMarkdownSource,
	displayMarkdownSource,
} from '../../comparison/markdownSourceDisplay.ts'

describe('Markdown source component', () => {
	const multilineSource = (length: number) => {
		const line = `${'x'.repeat(COMPLETE_SOURCE_DISPLAY_LIMITS.maximumVisibleCharactersPerLine - 1)}\n`
		return line.repeat(Math.floor(length / line.length)) + 'x'.repeat(length % line.length)
	}

	it.each([
		COMPLETE_SOURCE_DISPLAY_LIMITS.maximumVisibleCharactersPerSide - 1,
		COMPLETE_SOURCE_DISPLAY_LIMITS.maximumVisibleCharactersPerSide,
	])('AUD-08 preserves complete source at the %i-character display boundary', (length) => {
		const source = multilineSource(length)
		expect(displayBoundedMarkdownSource(source)).toEqual({ text: source, truncated: false })
	})

	it('keeps supplementary characters well formed at the input boundary', () => {
		const limit = COMPLETE_SOURCE_DISPLAY_LIMITS.maximumInputCharactersPerSide
		const exact = `${multilineSource(limit - 2)}😀`
		const crossingPrefix = multilineSource(limit - 1)
		const crossing = `${crossingPrefix}😀`

		expect(displayBoundedMarkdownSource(exact)).toEqual({ text: exact, truncated: false })
		const result = displayBoundedMarkdownSource(crossing)
		expect(result.text).toBe(crossingPrefix)
		expect(result.text.length).toBeLessThanOrEqual(COMPLETE_SOURCE_DISPLAY_LIMITS.maximumVisibleCharactersPerSide)
		expect(result.text.isWellFormed()).toBe(true)
		expect(result.truncated).toBe(true)
	})

	it('keeps supplementary characters and visible controls intact at the output boundary', () => {
		expect(displayMarkdownSource('abc😀', 5)).toBe('abc😀')
		expect(displayMarkdownSource('abc😀', 4)).toBe('abc')
		expect(displayMarkdownSource('\tremaining', 5)).toBe('⟦TAB⟧')
	})

	it.each([
		['high', '\uD83D', '⟦U+D83D⟧'],
		['low', '\uDE00', '⟦U+DE00⟧'],
	])('renders a lone %s surrogate as an exact reversible token', (_name, source, expected) => {
		const result = displayBoundedMarkdownSource(source)

		expect(result).toEqual({ text: expected, truncated: false })
		expect(result.text).not.toContain('\uFFFD')
		expect(result.text.isWellFormed()).toBe(true)
	})

	it('reports expansion truncation instead of silently omitting a supplementary character', () => {
		const result = displayBoundedMarkdownSource(`${'\t'.repeat(200_000)}😀`)

		expect(result.truncated).toBe(true)
		expect(result.text).toHaveLength(COMPLETE_SOURCE_DISPLAY_LIMITS.maximumVisibleCharactersPerLine)
		expect(result.text).not.toContain('\uFFFD')
		expect(result.text.isWellFormed()).toBe(true)
		expect(result.text.length).toBeLessThanOrEqual(COMPLETE_SOURCE_DISPLAY_LIMITS.maximumVisibleCharactersPerLine)
	})
})

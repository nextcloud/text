/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import MarkdownSourceComparison from '../../components/MarkdownSourceComparison.vue'
import { SOURCE_DIFF_LIMITS } from '../../comparison/markdownSourceComparison.ts'
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

	it('shows complete fallback immediately, then enhanced literal hunks', async () => {
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: 'old\t \n', afterContent: 'new\u200B\n', layoutMode: 'paired' },
		})
		expect(wrapper.find('[data-comparison-source-fallback]').exists()).toBe(true)
		await vi.waitFor(() => expect(wrapper.find('[data-source-hunk]').exists()).toBe(true))
		expect(wrapper.text()).toContain('old')
		expect(wrapper.text()).toContain('new⟦ZWSP⟧')
	})

	it('AUD-05 exposes side, operation, whitespace, EOL, and missing-newline semantics', async () => {
		const wrapper = mount(MarkdownSourceComparison, {
			props: {
				beforeContent: `old${String.fromCharCode(9)}\r\ntrail  `,
				afterContent: 'new\ntrail\n',
				layoutMode: 'paired',
			},
		})
		await vi.waitFor(() => expect(wrapper.find('[data-source-hunk]').exists()).toBe(true))

		expect(wrapper.find('[data-source-side="before"]').text()).toBe('Before')
		expect(wrapper.find('[data-source-side="after"]').text()).toBe('After')
		expect(wrapper.find('[data-source-operation="removed"]').attributes('aria-label')).toContain('Removed line')
		expect(wrapper.find('[data-source-operation="added"]').attributes('aria-label')).toContain('Added line')
		expect(wrapper.find('[data-source-operation="removed"] [data-source-cue]').text()).toBe('−')
		expect(wrapper.find('[data-source-operation="added"] [data-source-cue]').text()).toBe('+')
		for (const token of ['TAB', 'CRLF', 'LF', '2 TRAILING SPACES', 'No newline at end of file']) {
			expect(wrapper.text()).toContain(token)
		}
	})

	it('omits per-line badges when paired line endings match', async () => {
		const wrapper = mount(MarkdownSourceComparison, {
			props: {
				beforeContent: 'old\nunchanged\n',
				afterContent: 'new\nunchanged\n',
				layoutMode: 'paired',
			},
		})
		await vi.waitFor(() => expect(wrapper.find('[data-source-hunk]').exists()).toBe(true))

		expect(wrapper.findAll('[data-source-eol]')).toHaveLength(0)
	})

	it('AUD-13 renders the audited bidi and control set as visible inert source tokens', async () => {
		const controls = '\u061C\u00AD\u200E\u200F\u0085\u2028\u2029'
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent: controls, afterContent: '', layoutMode: 'paired' },
		})
		await vi.waitFor(() => expect(wrapper.find('[data-source-hunk]').exists()).toBe(true))

		for (const token of ['ALM', 'SHY', 'LRM', 'RLM', 'NEL', 'LS', 'PS']) {
			expect(wrapper.text()).toContain(token)
		}
		for (const control of controls) {
			expect(wrapper.text()).not.toContain(control)
		}
	})

	it('AUD-08 expands a large unchanged gap incrementally with observable source ranges', async () => {
		const prefix = Array.from({ length: 3_000 }, (_value, index) => `prefix-${index}`)
		const suffix = Array.from({ length: 3_000 }, (_value, index) => `suffix-${index}`)
		const beforeContent = [...prefix, 'old literal', ...suffix].join('\n')
		const afterContent = [...prefix, 'new literal', ...suffix].join('\n')
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent, afterContent, layoutMode: 'paired' },
		})
		await vi.waitFor(() => expect(wrapper.findAll('.text-source-comparison__gap button')).toHaveLength(2))

		await wrapper.findAll('[data-source-gap-toggle]')[0]!.trigger('click')

		expect(wrapper.findAll('.text-source-comparison__row')).toHaveLength(SOURCE_DIFF_LIMITS.maximumGapPageRows + 7)
		expect(wrapper.text()).toContain('prefix-0')
		expect(wrapper.text()).toContain(`prefix-${SOURCE_DIFF_LIMITS.maximumGapPageRows - 1}`)
		expect(wrapper.text()).not.toContain(`prefix-${SOURCE_DIFF_LIMITS.maximumGapPageRows}`)

		await wrapper.find('[data-source-gap-more]').trigger('click')

		expect(wrapper.findAll('.text-source-comparison__row')).toHaveLength(SOURCE_DIFF_LIMITS.maximumGapPageRows * 2 + 7)
		expect(wrapper.text()).toContain(`prefix-${SOURCE_DIFF_LIMITS.maximumGapPageRows}`)
	})

	it('AUD-08 never expands gaps beyond the shared displayed-row ceiling', async () => {
		const prefix = Array.from({ length: 3_000 }, (_value, index) => `prefix-${index}`)
		const suffix = Array.from({ length: 3_000 }, (_value, index) => `suffix-${index}`)
		const beforeContent = [...prefix, 'old literal', ...suffix].join('\n')
		const afterContent = [...prefix, 'new literal', ...suffix].join('\n')
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent, afterContent, layoutMode: 'paired' },
		})
		await vi.waitFor(() => expect(wrapper.findAll('[data-source-gap-toggle]')).toHaveLength(2))

		for (const toggle of wrapper.findAll('[data-source-gap-toggle]')) {
			await toggle.trigger('click')
			while (wrapper.find('[data-source-gap-more]').exists()) {
				await wrapper.find('[data-source-gap-more]').trigger('click')
			}
		}

		expect(wrapper.findAll('.text-source-comparison__row')).toHaveLength(SOURCE_DIFF_LIMITS.maximumDisplayedRows)
		expect(wrapper.text()).toContain('prefix-0')
		expect(wrapper.text()).toContain('suffix-3')
		expect(wrapper.text()).not.toContain('suffix-2999')
		expect(wrapper.find('[data-source-gap-limited]').exists()).toBe(true)
	}, 15_000)

	it('V11 preserves bounded complete fallback when source enhancement is limited', async () => {
		const beforeContent = 'x'.repeat(SOURCE_DIFF_LIMITS.maximumCharacters + 1)
		const wrapper = mount(MarkdownSourceComparison, {
			props: { beforeContent, afterContent: 'after', layoutMode: 'single' },
		})
		await vi.waitFor(() => expect(wrapper.find('[data-source-limited]').exists()).toBe(true))
		expect(wrapper.find('[data-comparison-source-fallback]').exists()).toBe(true)
		expect(wrapper.find('pre code').text()).toHaveLength(COMPLETE_SOURCE_DISPLAY_LIMITS.maximumVisibleCharactersPerLine)
		expect(wrapper.findAll('[role="status"]').map((status) => status.text()).join(' ')).toContain('truncated')
	})
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { RENDERED_COMPARISON_LIMITS } from '../../comparison/renderedComparisonLimit.ts'
import { createMarkdownContentComparison } from '../../createMarkdownContentComparison.ts'

describe('createMarkdownContentComparison', { timeout: 30_000 }, () => {
	it.each([
		[{ beforeContent: null, afterContent: '' }],
		[{ beforeContent: '', afterContent: undefined }],
	])('rejects missing comparison content', async (content) => {
		await expect(createMarkdownContentComparison({
			el: document.createElement('div'),
			...content,
		} as never)).rejects.toThrow('must be strings')
	})

	it('shows one concise empty state for identical snapshots', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			afterContent: '# Same',
			beforeContent: '# Same',
			el,
		})

		expect(el.querySelector('[data-comparison-empty="identical"]')?.textContent)
			.toContain('No differences.')
		expect(el.querySelectorAll('.text-comparison__empty')).toHaveLength(1)
		comparison.destroy()
		expect(el.querySelector('.text-comparison-root')).toBeNull()
	})

	it('preserves every inline preview when one paragraph contains multiple edits', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			afterContent: 'Keep new middle fresh end',
			beforeContent: 'Keep old middle stale end',
			el,
		})

		expect(el.querySelectorAll('.text-comparison__change-item')).toHaveLength(1)
		expect([...el.querySelectorAll('del')].map(({ textContent }) => textContent)).toEqual(['old', 'stale'])
		expect([...el.querySelectorAll('ins')].map(({ textContent }) => textContent)).toEqual(['new', 'fresh'])
		comparison.destroy()
	})

	it('filters formatting-only changes without losing an explicit empty state', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			afterContent: 'plain **text**',
			beforeContent: 'plain text',
			el,
		})
		const filter = el.querySelector<HTMLInputElement>('input[type="checkbox"]')!

		filter.checked = true
		filter.dispatchEvent(new Event('change', { bubbles: true }))
		await nextTick()

		expect(el.querySelector('[data-comparison-empty="filtered"]')?.textContent)
			.toContain('formatting-only')
		comparison.destroy()
	})

	it('rejects oversized rendered work before parsing it', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			afterContent: 'x'.repeat(RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot + 1),
			beforeContent: '',
			el,
		})

		expect(el.querySelector('[data-comparison-rendered-limit]')?.textContent)
			.toContain('too large')
		comparison.destroy()
	})
})

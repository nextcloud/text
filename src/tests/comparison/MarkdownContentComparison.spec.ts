/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import * as compare from '../../comparison/compare.ts'
import { createMarkdownContentComparison } from '../../createMarkdownContentComparison.ts'

// The factory imports the component lazily; load it once so no test pays for the first import.
beforeAll(() => import('../../components/MarkdownContentComparison.vue'))

afterEach(() => vi.restoreAllMocks())

async function create(beforeContent: string, afterContent: string) {
	const el = document.createElement('div')
	document.body.append(el)
	const instance = await createMarkdownContentComparison({ el, beforeContent, afterContent })
	return { el, instance }
}

function tab(el: HTMLElement, name: string) {
	return [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')].find((button) => button.textContent?.trim() === name)!
}

describe('MarkdownContentComparison', () => {
	it('lists changes and highlights the selected one in both documents', async () => {
		const { el, instance } = await create('Old first\n\nSame', 'New first\n\nSame\n\nAdded')

		expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true')
		expect(el.querySelector('[aria-live="polite"]')?.textContent).toContain('Change 1 of 2')
		expect(el.querySelectorAll('.text-comparison__document--before .text-comparison-change--current')).toHaveLength(1)

		tab(el, 'Changes').click()
		await nextTick()
		const rows = el.querySelectorAll<HTMLButtonElement>('[data-comparison-select]')
		expect(rows).toHaveLength(2)
		rows[1]!.click()
		await nextTick()
		expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true')
		expect(el.querySelectorAll('.text-comparison__document--after .text-comparison-change--current')).toHaveLength(1)
		expect(el.querySelectorAll('.text-comparison__document--before .text-comparison-change')).toHaveLength(1)
		expect(el.querySelector('[aria-live="polite"]')?.textContent).toContain('Change 2 of 2')

		instance.destroy()
		expect(el.childElementCount).toBe(0)
	})

	it('keeps both document panes at the same scroll position', async () => {
		const { el, instance } = await create('One\n\nTwo', 'One\n\nThree')
		const scrollers = el.querySelectorAll<HTMLElement>('.text-comparison__document-scroller')
		// jsdom has no layout, so give the panes a scroll position to mirror
		for (const scroller of scrollers) {
			let top = 0
			Object.defineProperty(scroller, 'scrollTop', {
				get: () => top,
				set: (value: number) => {
					top = value
				},
			})
		}

		scrollers[0]!.scrollTop = 120
		scrollers[0]!.dispatchEvent(new Event('scroll'))
		expect(scrollers[1]!.scrollTop).toBe(120)
		// The mirrored pane reports its new position after the source moved on: no push back
		scrollers[0]!.scrollTop = 150
		scrollers[1]!.dispatchEvent(new Event('scroll'))
		expect(scrollers[0]!.scrollTop).toBe(150)
		scrollers[1]!.scrollTop = 40
		scrollers[1]!.dispatchEvent(new Event('scroll'))
		expect(scrollers[0]!.scrollTop).toBe(40)

		instance.destroy()
	})

	it('hides formatting-only changes on request', async () => {
		const { el, instance } = await create('Plain text\n\nOld content', '**Plain** text\n\nNew content')

		expect(el.querySelectorAll('[data-comparison-select]')).toHaveLength(2)
		const filter = el.querySelector<HTMLInputElement>('input[type="checkbox"]')!
		filter.click()
		await nextTick()
		expect(el.querySelectorAll('[data-comparison-select]')).toHaveLength(1)
		expect(el.querySelectorAll('.text-comparison-change--formatting')).toHaveLength(0)

		instance.destroy()
	})

	it('explains when only the Markdown syntax differs', async () => {
		const { el, instance } = await create('*same*', '_same_')

		expect(el.querySelectorAll('[data-comparison-select]')).toHaveLength(0)
		expect(el.querySelector('[role="status"]')?.textContent).toContain('Markdown syntax differs')

		instance.destroy()
	})

	it('shows the plain source when the comparison fails', async () => {
		vi.spyOn(compare, 'compareDocuments').mockImplementation(() => {
			throw new Error('forced failure')
		})
		const { el, instance } = await create('Before text', 'After text')

		expect(el.querySelector('[data-comparison-source-fallback]')).not.toBeNull()
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(0)
		expect(el.textContent).toContain('Before text')
		expect(el.textContent).toContain('After text')

		instance.destroy()
	})
})

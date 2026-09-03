/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { locateComparisonTarget } from '../../comparison/comparisonNavigation.ts'

function scrollerIn(pane: HTMLElement) {
	const scroller = document.createElement('div')
	pane.append(scroller)
	Object.defineProperties(scroller, {
		clientHeight: { value: 300 },
		scrollHeight: { value: 1200 },
		scrollLeft: { value: 20 },
		scrollTop: { value: 50 },
	})
	vi.spyOn(scroller, 'getBoundingClientRect').mockReturnValue({ height: 300, top: 100 } as DOMRect)
	Object.defineProperty(scroller, 'scrollTo', { value: vi.fn() })
	return scroller
}

describe('comparison document location', () => {
	it('prefers the decorated DOM target', () => {
		const pane = document.createElement('article')
		const scroller = scrollerIn(pane)
		const target = document.createElement('span')
		target.dataset.comparisonChange = 'descriptor-1'
		scroller.append(target)
		vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ height: 20, top: 700 } as DOMRect)
		const fallback = vi.fn(() => ({ top: 900, height: 1 }))
		expect(locateComparisonTarget(pane, scroller, 'descriptor-1', 'smooth', fallback)).toBe(true)
		expect(fallback).not.toHaveBeenCalled()
	})

	it('V04 centers a supplied position rectangle for a marker-free zero-length side', () => {
		const pane = document.createElement('article')
		const scroller = scrollerIn(pane)
		const fallback = vi.fn(() => ({ top: 700, height: 1 }))
		expect(locateComparisonTarget(pane, scroller, 'missing', 'auto', fallback)).toBe(true)
		expect(scroller.scrollTo).toHaveBeenCalledWith({ behavior: 'auto', left: 20, top: 500.5 })
		expect(pane.querySelector('[data-comparison-change="missing"]')).toBeNull()
	})

	it('fails closed for invalid or hidden panes', () => {
		const pane = document.createElement('article')
		const scroller = scrollerIn(pane)
		pane.hidden = true
		expect(locateComparisonTarget(pane, scroller, 'missing', 'auto', () => ({ top: 1, height: 1 }))).toBe(false)
		expect(locateComparisonTarget(null, scroller, 'missing', 'auto')).toBe(false)
	})
})

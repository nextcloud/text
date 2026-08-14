/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { locateComparisonTarget } from '../../comparison/comparisonDocumentLocation.ts'

describe('comparison document location', () => {
	it('centers a target with pane-local scroll math and preserves horizontal position', () => {
		const pane = document.createElement('article')
		const scroller = document.createElement('div')
		const target = document.createElement('span')
		target.dataset.comparisonChange = 'change-safe_1'
		scroller.append(target)
		pane.append(scroller)
		Object.defineProperties(scroller, {
			clientHeight: { value: 400 },
			scrollHeight: { value: 2000 },
			scrollLeft: { value: 35 },
			scrollTop: { value: 125 },
		})
		vi.spyOn(scroller, 'getBoundingClientRect').mockReturnValue({ height: 400, top: 100 } as DOMRect)
		vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ height: 20, top: 900 } as DOMRect)
		const scrollTo = vi.fn()
		Object.defineProperty(scroller, 'scrollTo', { value: scrollTo })

		expect(locateComparisonTarget(pane, scroller, 'change-safe_1', 'smooth')).toBe(true)

		expect(scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', left: 35, top: 735 })
	})

	it.each([
		['missing pane', null, document.createElement('div')],
		['missing scroller', document.createElement('article'), null],
	])('ignores a %s', (_name, pane, scroller) => {
		expect(locateComparisonTarget(pane, scroller, 'change-0', 'auto')).toBe(false)
	})

	it('leaves hidden panes and missing targets available for a later retry', () => {
		const pane = document.createElement('article')
		const scroller = document.createElement('div')
		pane.append(scroller)
		pane.style.display = 'none'
		expect(locateComparisonTarget(pane, scroller, 'change-0', 'auto')).toBe(false)

		pane.style.display = ''
		expect(locateComparisonTarget(pane, scroller, 'change-0', 'auto')).toBe(false)
	})
})

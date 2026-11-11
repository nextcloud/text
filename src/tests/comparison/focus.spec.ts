/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { handOver, takeAnnouncement, takeFocus } from '../../comparison/focus.ts'

const viewer = vi.hoisted(() => new EventTarget())
vi.mock('@nextcloud/viewer', () => ({ getViewer: () => viewer }))

const pair = { fileId: 7, from: '1000', to: 'current' }

describe('handing over after the versions compared changed', () => {
	it('gives the keyboard back to the picker that was used, once', () => {
		handOver(pair, 'from', 'Comparing Nov 1 with the current version')

		expect(takeFocus(pair, 'to')).toBe(false)
		expect(takeFocus({ ...pair, from: '900' }, 'from')).toBe(false)
		expect(takeFocus(pair, 'from')).toBe(true)
		expect(takeFocus(pair, 'from')).toBe(false)
	})

	it('announces the new pair once, to whichever element shows it first', () => {
		handOver(pair, 'to', 'Comparing Nov 1 with Nov 3')

		expect(takeAnnouncement({ ...pair, to: '3000' })).toBeUndefined()
		expect(takeAnnouncement(pair)).toBe('Comparing Nov 1 with Nov 3')
		expect(takeAnnouncement(pair)).toBeUndefined()
	})

	it('forgets what was not taken once the viewer closes', () => {
		handOver(pair, 'from', 'Comparing')
		viewer.dispatchEvent(new Event('close'))

		expect(takeFocus(pair, 'from')).toBe(false)
		expect(takeAnnouncement(pair)).toBeUndefined()
	})
})

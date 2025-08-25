/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, expect, test, vi } from 'vitest'
import { nextTick, ref, watch } from 'vue'
import { useDelayedFlag } from './useDelayedFlag'

afterEach(() => {
	vi.useRealTimers()
})

test('useDelayedFlag defaults to provided ref value', () => {
	;[true, false].forEach((val) => {
		const { delayed } = useDelayedFlag(ref(val))
		expect(delayed.value).toBe(val)
	})
})

test('switches slowly to true', async () => {
	vi.useFakeTimers()
	const input = ref(false)
	const { delayed } = useDelayedFlag(input)
	input.value = true
	await nextTick()
	vi.advanceTimersByTime(3000)
	expect(delayed.value).toBe(false)
	vi.advanceTimersByTime(5000)
	expect(delayed.value).toBe(true)
})

test('switches fast to false', async () => {
	vi.useFakeTimers()
	const input = ref(true)
	const { delayed } = useDelayedFlag(input)
	input.value = false
	await nextTick()
	expect(delayed.value).toBe(true)
	vi.advanceTimersByTime(300)
	expect(delayed.value).toBe(false)
})

test('does not flip flop', async () => {
	vi.useFakeTimers()
	const input = ref(false)
	const { delayed } = useDelayedFlag(input)
	const probe = vi.fn()
	watch(delayed, probe)
	input.value = true
	await nextTick()
	vi.advanceTimersByTime(1000)
	input.value = false
	await nextTick()
	vi.advanceTimersByTime(5000)
	expect(delayed.value).toBe(false)
	expect(probe).not.toBeCalled()
})

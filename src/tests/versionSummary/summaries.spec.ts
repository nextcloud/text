/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { EffectScope } from 'vue'
import type { PairSummary } from '../../versionSummary/summaries.ts'

import axios from '@nextcloud/axios'
import { flushPromises } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'
import { useVersionSummary } from '../../versionSummary/summaries.ts'

const viewer = vi.hoisted(() => new EventTarget())
vi.mock('@nextcloud/viewer', () => ({ getViewer: () => viewer }))

const ends = { fileId: 7, from: '1000', to: 'current' }
const texts = { fromHash: 'a'.repeat(64), toHash: 'b'.repeat(64), utf8: true, looksSame: false }
const endsAnswer = {
	from: { id: '1000', mtime: 1000, author: null, label: '' },
	to: { id: 'current', mtime: 2000, author: { id: 'bob', displayName: 'Bob' }, label: '' },
}

function answer(fields: Record<string, unknown> = {}) {
	return {
		data: {
			ocs: {
				data: {
					state: 'absent',
					summary: null,
					error: null,
					queuePosition: null,
					progress: null,
					ends: endsAnswer,
					fileName: 'plan.md',
					generation: { available: true, reason: null, retryAfter: null },
					...fields,
				},
			},
		},
	}
}

function refusal(status: number, error?: string, retryAfter: number | null = null) {
	return Object.assign(new Error(`HTTP ${status}`), {
		isAxiosError: true,
		response: { status, data: { ocs: { data: error ? { error, retryAfter } : [] } } },
	})
}

let get: ReturnType<typeof vi.spyOn>
let post: ReturnType<typeof vi.spyOn>
const scopes: EffectScope[] = []

// Shows the summary of the pair in one more element, as the comparison does
function show(pairTexts = texts): PairSummary {
	const scope = effectScope()
	scopes.push(scope)
	return scope.run(() => useVersionSummary(ends, pairTexts))!
}

function deferred() {
	let settle!: (value: unknown) => void
	const promise = new Promise((resolve) => {
		settle = resolve
	})
	return { promise, settle }
}

function hide(index = 0) {
	scopes[index]!.stop()
}

beforeEach(() => {
	vi.useFakeTimers()
	get = vi.spyOn(axios, 'get').mockResolvedValue(answer())
	post = vi.spyOn(axios, 'post').mockResolvedValue(answer({ state: 'queued', queuePosition: 1 }))
})

afterEach(async () => {
	scopes.splice(0).forEach((scope) => scope.stop())
	await vi.runAllTimersAsync()
	viewer.dispatchEvent(new CustomEvent('close'))
	vi.restoreAllMocks()
	vi.useRealTimers()
})

describe('useVersionSummary', () => {
	it('looks up once for every element showing the pair', async () => {
		const first = show()
		const second = show()
		await flushPromises()

		expect(first).toBe(second)
		expect(get).toHaveBeenCalledTimes(1)
		expect(get.mock.calls[0]).toEqual([expect.stringContaining('/ocs/v2.php/apps/text/version-summaries/7'), { params: { from: '1000', to: 'current', fromHash: texts.fromHash, toHash: texts.toHash }, timeout: 30_000 }])
		expect(first.view.value).toEqual({ kind: 'ready' })
		expect(first.ends.value).toEqual(endsAnswer)
		expect(first.fileName.value).toBe('plan.md')
	})

	it('asks nothing for identical texts or texts that are not UTF-8', async () => {
		expect(show({ ...texts, toHash: texts.fromHash }).view.value).toEqual({ kind: 'identical' })
		expect(show({ ...texts, toHash: 'c'.repeat(64), utf8: false }).view.value).toEqual({ kind: 'unavailable', reason: 'unsupported_encoding', retryAfter: null })
		await flushPromises()

		expect(get).not.toHaveBeenCalled()
	})

	it('shows a stored summary of texts that look the same, but offers none', async () => {
		get.mockResolvedValueOnce(answer({ state: 'done', summary: 'Spacing changed.' }))
		const stored = show({ ...texts, looksSame: true })
		get.mockResolvedValueOnce(answer({ state: 'absent' }))
		const absent = show({ ...texts, toHash: 'd'.repeat(64), looksSame: true })
		get.mockResolvedValueOnce(answer({ state: 'failed', error: { code: 'provider_failed', message: null } }))
		const failed = show({ ...texts, toHash: 'e'.repeat(64), looksSame: true })
		await flushPromises()

		expect(stored.view.value).toMatchObject({ kind: 'done', summary: 'Spacing changed.' })
		expect(absent.view.value).toEqual({ kind: 'looksSame' })
		expect(failed.view.value).toEqual({ kind: 'looksSame' })
	})

	it('shows a stored summary at once', async () => {
		get.mockResolvedValue(answer({ state: 'done', summary: 'The pilot runs longer.' }))
		const summary = show()
		await flushPromises()
		await vi.advanceTimersByTimeAsync(60_000)

		expect(summary.view.value).toEqual({ kind: 'done', summary: 'The pilot runs longer.' })
		expect(get).toHaveBeenCalledTimes(1)
	})

	it('starts only on request, and polls until done', async () => {
		const summary = show()
		await flushPromises()
		await summary.generate()

		expect(post).toHaveBeenCalledTimes(1)
		expect(post.mock.calls[0]![1]).toEqual({ from: '1000', to: 'current', fromHash: texts.fromHash, toHash: texts.toHash })
		expect(summary.view.value).toEqual({ kind: 'queued', position: 1 })
		expect(summary.userStarted.value).toBe(true)

		get.mockResolvedValue(answer({ state: 'queued', queuePosition: 1 }))
		const lookupsAfter = async (seconds: number) => {
			await vi.advanceTimersByTimeAsync(seconds * 1000)
			return get.mock.calls.length
		}
		expect(await lookupsAfter(2)).toBe(2)
		get.mockResolvedValue(answer({ state: 'done', summary: 'Done' }))
		expect(await lookupsAfter(3)).toBe(3)
		expect(await lookupsAfter(60)).toBe(3)
		expect(summary.view.value.kind).toBe('done')
	})

	it('keeps the state while the view changes, and stops polling once closed', async () => {
		get.mockResolvedValue(answer({ state: 'running', progress: null }))
		show()
		await flushPromises()

		// The next view's element mounts its summary once it has loaded, after
		// the previous view's element is gone
		hide(0)
		await vi.advanceTimersByTimeAsync(300)
		const next = show()
		expect(next.view.value.kind).toBe('running')
		expect(get).toHaveBeenCalledTimes(1)

		hide(1)
		await vi.advanceTimersByTimeAsync(120_000)
		expect(get).toHaveBeenCalledTimes(1)

		// Opening again looks up again, with every check
		show()
		await flushPromises()
		expect(get).toHaveBeenCalledTimes(2)
	})

	it.each([
		[404, 'not_found', { kind: 'accessLost' }],
		[409, 'texts_changed', { kind: 'changed', whileRunning: false }],
		[429, 'instance_cap', { kind: 'unavailable', reason: 'instance_cap', retryAfter: 5000 }],
		[429, undefined, { kind: 'rateLimited' }],
		[503, 'busy', { kind: 'failed', code: 'busy', message: null, generation: { available: true, reason: null, retryAfter: null } }],
	])('says what a refusal (%i %s) means', async (status, reason, view) => {
		const summary = show()
		await flushPromises()
		post.mockRejectedValue(refusal(status, reason, reason?.endsWith('_cap') ? 5000 : null))

		await summary.generate()

		expect(summary.view.value).toEqual(view)
	})

	it('keeps trying through a lost connection', async () => {
		get.mockResolvedValueOnce(answer({ state: 'queued' }))
		const summary = show()
		await flushPromises()

		get.mockRejectedValueOnce(Object.assign(new Error('Network Error'), { isAxiosError: true }))
		await vi.advanceTimersByTimeAsync(2000)
		expect(summary.connectionLost.value).toBe(true)
		expect(summary.view.value.kind).toBe('queued')

		get.mockResolvedValueOnce(answer({ state: 'done', summary: 'Done' }))
		await vi.advanceTimersByTimeAsync(3000)
		expect(summary.connectionLost.value).toBe(false)
		expect(summary.view.value.kind).toBe('done')
	})

	it('ignores an older answer that comes after a newer request', async () => {
		const summary = show()
		await flushPromises()
		const late = deferred()
		get.mockReturnValueOnce(late.promise)

		summary.lookupNow()
		await summary.generate()
		late.settle(answer())
		await flushPromises()

		expect(summary.view.value).toEqual({ kind: 'queued', position: 1 })
	})

	it('asks nothing more once dropped during a lookup', async () => {
		get.mockResolvedValueOnce(answer({ state: 'running', progress: null }))
		show()
		await flushPromises()
		const late = deferred()
		get.mockReturnValueOnce(late.promise)
		await vi.advanceTimersByTimeAsync(2000)
		expect(get).toHaveBeenCalledTimes(2)

		viewer.dispatchEvent(new CustomEvent('close'))
		late.settle(answer({ state: 'running', progress: null }))
		await vi.advanceTimersByTimeAsync(60_000)

		expect(get).toHaveBeenCalledTimes(2)
	})

	it('looks again once the instance limit ends after a failure', async () => {
		vi.setSystemTime(1_000_000)
		get.mockResolvedValueOnce(answer({ state: 'failed', error: { code: 'provider_failed', message: null }, generation: { available: false, reason: 'instance_cap', retryAfter: 1600 } }))
		const summary = show()
		await flushPromises()

		await vi.advanceTimersByTimeAsync(600_000)

		expect(get).toHaveBeenCalledTimes(2)
		expect(summary.view.value).toEqual({ kind: 'ready' })
	})

	it('pauses polling while the page is hidden, and looks once it is shown', async () => {
		const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
		get.mockResolvedValue(answer({ state: 'running', progress: null }))
		show()
		await flushPromises()

		hidden.mockReturnValue(true)
		await vi.advanceTimersByTimeAsync(600_000)
		expect(get).toHaveBeenCalledTimes(1)

		hidden.mockReturnValue(false)
		document.dispatchEvent(new Event('visibilitychange'))
		await flushPromises()
		expect(get).toHaveBeenCalledTimes(2)
	})

	it('keeps the answer of a start when the page is shown again meanwhile', async () => {
		const summary = show()
		await flushPromises()
		const start = deferred()
		post.mockReturnValueOnce(start.promise)

		const started = summary.generate()
		document.dispatchEvent(new Event('visibilitychange'))
		start.settle(answer({ state: 'queued', queuePosition: 4 }))
		await started

		expect(get).toHaveBeenCalledTimes(1)
		expect(summary.view.value).toEqual({ kind: 'queued', position: 4 })
	})

	it.each([
		[404, 'not_found'],
		[404, 'disabled'],
	])('hides what the opening lookup was refused (%i %s)', async (status, reason) => {
		get.mockRejectedValueOnce(refusal(status, reason))
		const summary = show()
		await flushPromises()

		expect(summary.view.value).toEqual({ kind: 'hidden' })
	})
})

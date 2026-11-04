/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'

import axios from '@nextcloud/axios'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'
import { useSharedComparison } from '../../comparison/sharedComparison.ts'
import { trackClosingSave } from '../../helpers/closingSaves.ts'

vi.mock('../../comparison/session.ts', () => ({
	createComparisonSession: vi.fn((before: string, after: string) => ({ before, after, destroy: vi.fn() })),
}))

const base = { source: 'https://cloud.example/v/1', encodedSource: 'https://cloud.example/v/1', path: '/plan.md' } as unknown as IFile
const file = { source: 'https://cloud.example/f/plan.md', encodedSource: 'https://cloud.example/f/plan.md', path: '/plan.md' } as unknown as IFile

// A response whose content the test gives later
function deferred() {
	let settle!: (text: string) => void
	const promise = new Promise((resolve) => {
		settle = (text) => resolve({ data: new TextEncoder().encode(text).buffer, headers: {} })
	})
	return { promise, settle }
}

// Let a load that just started fetch both files and compare them
async function settle() {
	await new Promise((resolve) => setTimeout(resolve))
	await flushPromises()
}

afterEach(() => {
	vi.restoreAllMocks()
})

describe('useSharedComparison', () => {
	it('shows only the latest of overlapping reloads', async () => {
		const get = vi.spyOn(axios, 'get')
		get.mockResolvedValueOnce({ data: new TextEncoder().encode('old').buffer, headers: {} })
		get.mockResolvedValueOnce({ data: new TextEncoder().encode('first').buffer, headers: {} })
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, file))!
		await settle()

		const late = deferred()
		get.mockReturnValueOnce(late.promise as never)
		get.mockReturnValueOnce(Promise.resolve({ data: new TextEncoder().encode('new').buffer, headers: {} }) as never)
		comparison.reload()
		await settle()
		get.mockResolvedValueOnce({ data: new TextEncoder().encode('old').buffer, headers: {} })
		get.mockResolvedValueOnce({ data: new TextEncoder().encode('newest').buffer, headers: {} })
		comparison.reload()
		await settle()
		late.settle('stale')
		await flushPromises()

		expect(comparison.texts.value?.after.text).toBe('newest')
		// Files come without caching rules: a stale copy would not match the server
		expect(get).toHaveBeenCalledWith(file.encodedSource, expect.objectContaining({ headers: { 'Cache-Control': 'no-cache' } }))
		expect(comparison.error.value).toBe(false)
		scope.stop()
	})

	it('loads the newer file once the editor it replaces has saved it', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('saved').buffer, headers: {} })
		const edited = { ...file, source: 'https://cloud.example/f/edited.md', encodedSource: 'https://cloud.example/f/edited.md', fileid: 7 } as unknown as IFile
		let saved!: () => void
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, edited))!
		// The viewer closes the editor after the comparison started
		trackClosingSave(7, new Promise<void>((resolve) => {
			saved = resolve
		}))
		await settle()
		expect(get).not.toHaveBeenCalled()

		saved()
		await flushPromises()
		expect(get).toHaveBeenCalledWith(edited.encodedSource, expect.anything())
		expect(comparison.texts.value?.after.text).toBe('saved')
		scope.stop()
	})

	it('shows its error when the editor it replaces could not save', async () => {
		const get = vi.spyOn(axios, 'get')
		const edited = { ...file, source: 'https://cloud.example/f/failed.md', encodedSource: 'https://cloud.example/f/failed.md', fileid: 9 } as unknown as IFile
		trackClosingSave(9, Promise.reject(new Error('Request failed with status code 500')))
		await flushPromises()
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, edited))!
		await settle()

		expect(comparison.error.value).toBe(true)
		expect(get).not.toHaveBeenCalled()
		scope.stop()
	})

	it('shows its error when the editor it replaces does not save in time', async () => {
		vi.useFakeTimers()
		const get = vi.spyOn(axios, 'get')
		const edited = { ...file, source: 'https://cloud.example/f/stuck.md', encodedSource: 'https://cloud.example/f/stuck.md', fileid: 8 } as unknown as IFile
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, edited))!
		trackClosingSave(8, new Promise<void>(() => {}))

		await vi.advanceTimersByTimeAsync(15_000)

		expect(comparison.error.value).toBe(true)
		expect(get).not.toHaveBeenCalled()
		scope.stop()
		vi.useRealTimers()
	})
})

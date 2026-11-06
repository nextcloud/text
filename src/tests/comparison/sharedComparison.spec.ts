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

// Let a load that just started fetch both files and compare them
async function settle() {
	await new Promise((resolve) => setTimeout(resolve))
	await flushPromises()
}

afterEach(() => {
	vi.restoreAllMocks()
})

describe('useSharedComparison', () => {
	it('loads the newer file once the editor it replaces has saved it', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: 'saved' })
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
		// Files come without caching rules: a stale copy would not show the save
		expect(get).toHaveBeenCalledWith(edited.encodedSource, expect.objectContaining({ headers: { 'Cache-Control': 'no-cache' } }))
		expect(comparison.session.value).toMatchObject({ after: 'saved' })
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

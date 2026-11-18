/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'

import axios from '@nextcloud/axios'
import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { effectScope } from 'vue'
import { createComparisonSession } from '../../comparison/session.ts'
import { useSharedComparison } from '../../comparison/sharedComparison.ts'
import { trackClosingSave } from '../../helpers/closingSaves.ts'

vi.mock('../../comparison/session.ts', () => ({
	createComparisonSession: vi.fn((before: string, after: string) => ({ before, after, destroy: vi.fn() })),
}))
vi.mock('@nextcloud/viewer', () => ({ getViewer: () => new EventTarget() }))
vi.mock('@nextcloud/auth', async (importOriginal) => ({ ...await importOriginal<object>(), getCurrentUser: () => ({ uid: 'alice' }) }))
vi.mock('@nextcloud/sharing/public', () => ({ isPublicShare: () => false }))

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
	// Also when a test failed before undoing them
	vi.useRealTimers()
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

	it('resolves links and images from the folder of the file, also between two old versions', async () => {
		const version = (revision: number) => {
			const source = `https://cloud.example/remote.php/dav/versions/alice/versions/7/${revision}`
			// An old version's node only knows its revision
			return { source, encodedSource: source, path: `/${revision}`, fileid: 7 } as unknown as IFile
		}
		vi.spyOn(axios, 'get').mockImplementation(async (url: string) => url.includes('/ocs/v2.php/apps/text/versions/7')
			? { data: { ocs: { data: { path: '/Notes/plan.md', versions: [], versionsAvailable: true } } } }
			: { data: new TextEncoder().encode(url.endsWith('/100') ? 'older' : 'newer').buffer, headers: {} })
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(version(100), version(200)))!
		await settle()

		expect(comparison.path.value).toBe('/Notes/plan.md')
		expect(createComparisonSession).toHaveBeenLastCalledWith('older', 'newer', { filePath: '/Notes/plan.md' })
		scope.stop()
	})

	it('takes the folder from the current file without asking for the versions', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('text').buffer, headers: {} })
		const source = 'https://cloud.example/remote.php/dav/files/alice/Notes/plan.md'
		const current = { source, encodedSource: source, path: '/Notes/plan.md', fileid: 7 } as unknown as IFile
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, current))!
		await settle()

		expect(comparison.path.value).toBe('/Notes/plan.md')
		expect(get).toHaveBeenCalledTimes(2)
		scope.stop()
	})

	it('loads a file again once the viewer shows a newer state of it', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('text').buffer, headers: { etag: '"before-restore"' } })
		const current = (etag: string) => ({ ...file, fileid: 13, attributes: { etag } }) as unknown as IFile
		const scope = effectScope()
		scope.run(() => useSharedComparison(base, current('before-restore')))
		await settle()
		// Restoring a version from the sidebar swaps in the file at its new etag
		scope.run(() => useSharedComparison(base, current('after-restore')))
		await settle()

		expect(get).toHaveBeenCalledTimes(4)
		scope.stop()
	})

	it('keeps what it loaded when the viewer shows the state of the file it loaded', async () => {
		// The editor the comparison replaces saved the file, so the viewer shows it at its new etag
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('text').buffer, headers: { etag: '"after-save"' } })
		const current = (etag: string) => ({ ...file, source: 'https://cloud.example/f/saved.md', encodedSource: 'https://cloud.example/f/saved.md', fileid: 14, attributes: { etag } }) as unknown as IFile
		const scope = effectScope()
		scope.run(() => useSharedComparison(base, current('"before-save"')))
		await settle()
		scope.run(() => useSharedComparison(base, current('"after-save"')))
		await settle()

		expect(get).toHaveBeenCalledTimes(2)
		scope.stop()
	})

	it('gives a slow download time, as a long file on a slow link takes', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('text').buffer, headers: {} })
		const scope = effectScope()
		scope.run(() => useSharedComparison(base, { ...file, source: 'https://cloud.example/f/slow.md', encodedSource: 'https://cloud.example/f/slow.md' } as unknown as IFile))
		await settle()

		expect(get).toHaveBeenCalledWith('https://cloud.example/f/slow.md', expect.objectContaining({ timeout: 120_000 }))
		scope.stop()
	})

	it('loads the newer file once the editor it replaces has saved it', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('saved').buffer, headers: {} })
		const edited = { ...file, source: 'https://cloud.example/f/edited.md', encodedSource: 'https://cloud.example/f/edited.md', fileid: 7 } as unknown as IFile
		let saved!: () => void
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, edited))!
		// The viewer closes the editor after the comparison started
		trackClosingSave(7, new Promise<boolean>((resolve) => {
			saved = () => resolve(true)
		}))
		await settle()
		expect(get).not.toHaveBeenCalled()

		saved()
		await flushPromises()
		expect(get).toHaveBeenCalledWith(edited.encodedSource, expect.anything())
		expect(comparison.texts.value?.after.text).toBe('saved')
		scope.stop()
	})

	it('waits for every editor closing on the newer file', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('saved').buffer, headers: {} })
		const edited = { ...file, source: 'https://cloud.example/f/twice.md', encodedSource: 'https://cloud.example/f/twice.md', fileid: 13 } as unknown as IFile
		let saved!: () => void
		const scope = effectScope()
		scope.run(() => useSharedComparison(base, edited))
		// One editor still saves while another one on the same file closes without changes
		trackClosingSave(13, new Promise<boolean>((resolve) => {
			saved = () => resolve(true)
		}))
		trackClosingSave(13, Promise.resolve(true))
		await settle()
		expect(get).not.toHaveBeenCalled()

		saved()
		await settle()
		expect(get).toHaveBeenCalledWith(edited.encodedSource, expect.anything())
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

	it('shows its error when the save of the editor it replaces did not reach the file', async () => {
		const get = vi.spyOn(axios, 'get')
		const edited = { ...file, source: 'https://cloud.example/f/refused.md', encodedSource: 'https://cloud.example/f/refused.md', fileid: 10 } as unknown as IFile
		// A save the server refused, as after a conflict or a lost write permission
		trackClosingSave(10, Promise.resolve(false))
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, edited))!
		await settle()

		expect(comparison.error.value).toBe(true)
		expect(get).not.toHaveBeenCalled()
		scope.stop()
	})

	it('loads the file as the server has it once it showed that the closing save failed', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: new TextEncoder().encode('server').buffer, headers: {} })
		const edited = { ...file, source: 'https://cloud.example/f/again.md', encodedSource: 'https://cloud.example/f/again.md', fileid: 11 } as unknown as IFile
		trackClosingSave(11, Promise.resolve(false))
		const scope = effectScope()
		const failed = scope.run(() => useSharedComparison(base, edited))!
		await settle()
		expect(failed.error.value).toBe(true)

		// Another comparison of the file, as when it is opened again
		const other = { ...base, source: 'https://cloud.example/v/2', encodedSource: 'https://cloud.example/v/2' } as unknown as IFile
		const again = scope.run(() => useSharedComparison(other, edited))!
		await settle()

		expect(again.error.value).toBe(false)
		expect(get).toHaveBeenCalledTimes(2)
		scope.stop()
	})

	it('compares two old versions without waiting for a save of the current file', async () => {
		const version = (revision: number) => {
			const source = `https://cloud.example/remote.php/dav/versions/alice/versions/12/${revision}`
			return { source, encodedSource: source, path: `/${revision}`, fileid: 12 } as unknown as IFile
		}
		// The editor of the current file is still saving, and never ends
		trackClosingSave(12, new Promise<boolean>(() => {}))
		vi.spyOn(axios, 'get').mockImplementation(async (url: string) => url.includes('/ocs/')
			? { data: { ocs: { data: { path: '/plan.md', versions: [], versionsAvailable: true } } } }
			: { data: new TextEncoder().encode('old').buffer, headers: {} })
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(version(100), version(200)))!
		await settle()

		expect(comparison.error.value).toBe(false)
		expect(comparison.texts.value?.after.text).toBe('old')
		scope.stop()
	})

	it('shows its error when the editor it replaces does not save in time', async () => {
		vi.useFakeTimers()
		const get = vi.spyOn(axios, 'get')
		const edited = { ...file, source: 'https://cloud.example/f/stuck.md', encodedSource: 'https://cloud.example/f/stuck.md', fileid: 8 } as unknown as IFile
		const scope = effectScope()
		const comparison = scope.run(() => useSharedComparison(base, edited))!
		trackClosingSave(8, new Promise<boolean>(() => {}))

		await vi.advanceTimersByTimeAsync(15_000)

		expect(comparison.error.value).toBe(true)
		expect(get).not.toHaveBeenCalled()
		scope.stop()
	})
})

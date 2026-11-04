/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { MockInstance } from 'vitest'

import axios from '@nextcloud/axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { invalidateFileVersions, useFileVersions } from '../../comparison/versions.ts'

const viewer = vi.hoisted(() => new EventTarget())
vi.mock('@nextcloud/viewer', () => ({ getViewer: () => viewer }))

const versions = [
	{ id: 'current', mtime: 1691430000, size: 30, label: '', author: null },
	{ id: '1691420501', mtime: 1691420501, size: 10, label: '', author: null },
]
const response = (list = versions) => ({ data: { ocs: { data: { fileId: 7, path: '/Notes/plan.md', versions: list } } } })

function deferred() {
	let settle!: (value: unknown) => void
	let fail!: (error: Error) => void
	const promise = new Promise((resolve, reject) => {
		settle = resolve
		fail = reject
	})
	return { promise, settle, fail }
}

let get: MockInstance<typeof axios.get>

beforeEach(() => {
	get = vi.spyOn(axios, 'get').mockResolvedValue(response())
})

afterEach(() => {
	vi.restoreAllMocks()
	viewer.dispatchEvent(new CustomEvent('close'))
})

describe('useFileVersions', () => {
	it('asks once per file until the viewer closes', async () => {
		await useFileVersions(7).load()
		await useFileVersions(7).load()
		expect(get).toHaveBeenCalledTimes(1)
		expect(useFileVersions(7).versions.value).toEqual(versions)

		viewer.dispatchEvent(new CustomEvent('close'))
		await useFileVersions(7).load()
		expect(get).toHaveBeenCalledTimes(2)
	})

	it('drops an answer that was on its way when the versions were invalidated', async () => {
		const stale = deferred()
		get.mockReturnValueOnce(stale.promise as never).mockResolvedValueOnce(response(versions.slice(0, 1)))
		const fileVersions = useFileVersions(7)
		const loading = fileVersions.load()

		invalidateFileVersions(7)
		await fileVersions.load()
		stale.settle(response())
		await loading

		expect(fileVersions.versions.value).toHaveLength(1)
	})

	it('keeps the error of the latest fetch when an older one fails later', async () => {
		const stale = deferred()
		get.mockReturnValueOnce(stale.promise as never).mockRejectedValueOnce(new Error('offline'))
		const fileVersions = useFileVersions(7)
		const loading = fileVersions.load()

		invalidateFileVersions(7)
		await fileVersions.load()
		stale.fail(new Error('stale'))
		await loading

		expect([fileVersions.failed.value, fileVersions.loading.value]).toEqual([true, false])
	})
})

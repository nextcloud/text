/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'
import type { MockInstance } from 'vitest'

import axios from '@nextcloud/axios'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import ViewerVersionComparison from '../../components/ViewerVersionComparison.vue'
import { logger } from '../../helpers/logger.ts'

const baseSource = 'https://cloud.example/remote.php/dav/versions/alice/versions/7/1691420501'
const fileSource = 'https://cloud.example/remote.php/dav/files/alice/notes.md'
const contents: Record<string, string> = {
	[baseSource]: '# Old title\n\nPlain text',
	[fileSource]: '# New title\n\n**Plain** text',
}

/**
 * A file to compare, with only what the comparison reads.
 *
 * @param source Its URL.
 */
function makeFile(source: string): IFile {
	return { fileid: 7, source, encodedSource: source, path: '/notes.md', mime: 'text/markdown' } as unknown as IFile
}

const base = makeFile(baseSource)
const file = makeFile(fileSource)

/**
 * Show one part of the comparison of `base` and `file`.
 *
 * @param part The part to show.
 */
function mountPart(part: 'before' | 'after' | 'changes') {
	return mount(ViewerVersionComparison, { props: { base, file, part }, attachTo: document.body })
}

// The comparison editors are heavy to import; load them once so no test pays for it.
beforeAll(() => import('../../comparison/session.ts'), 30_000)

let get: MockInstance<typeof axios.get>

beforeEach(() => {
	get = vi.spyOn(axios, 'get').mockImplementation(async (url: string) => ({ data: contents[url] }))
})

afterEach(async () => {
	vi.restoreAllMocks()
	// Let unmounted parts release their comparison
	await new Promise((resolve) => setTimeout(resolve))
})

describe('ViewerVersionComparison', () => {
	it('loads both files once for both documents side by side', async () => {
		const before = mountPart('before')
		const after = mountPart('after')
		await flushPromises()

		expect(get.mock.calls.map(([url]) => url)).toEqual([baseSource, fileSource])
		expect(before.find('.text-comparison__document--before').text()).toContain('Old title')
		expect(after.find('.text-comparison__document--after').text()).toContain('New title')
		expect(before.emitted('loaded')).toHaveLength(1)
		expect(after.emitted('loaded')).toHaveLength(1)

		before.unmount()
		after.unmount()
	})

	it('splits the header: the filter on the left, the navigation on the right', async () => {
		const before = mountPart('before')
		const after = mountPart('after')
		await flushPromises()

		expect(before.find('.text-comparison__filter').exists()).toBe(true)
		expect(before.find('.text-comparison__navigation').exists()).toBe(false)
		expect(after.find('.text-comparison__filter').exists()).toBe(false)
		expect(after.find('.text-comparison__navigation').text()).toContain('Change 1 of 2')

		before.unmount()
		after.unmount()
	})

	it('lists the changes with the filter, and makes a picked one current', async () => {
		const changes = mountPart('changes')
		await flushPromises()

		expect(changes.find('.text-comparison__filter').exists()).toBe(true)
		const rows = changes.findAll('[data-comparison-select]')
		expect(rows).toHaveLength(2)
		await rows[1]!.trigger('click')

		expect(changes.emitted('select')).toHaveLength(1)
		expect(changes.find('[aria-current="true"]').element).toBe(changes.findAll('[data-comparison-select]')[1]!.element)

		changes.unmount()
	})

	it('keeps the current change when the view changes', async () => {
		const changes = mountPart('changes')
		await flushPromises()
		await changes.findAll('[data-comparison-select]')[1]!.trigger('click')

		// The viewer mounts the next view before it lets go of the previous one
		const after = mountPart('after')
		changes.unmount()
		await flushPromises()

		expect(get).toHaveBeenCalledTimes(2)
		expect(after.find('.text-comparison__navigation').text()).toContain('Change 2 of 2')

		after.unmount()
	})

	it('loads the files again once every part is gone', async () => {
		mountPart('changes').unmount()
		await flushPromises()
		await new Promise((resolve) => setTimeout(resolve))

		const again = mountPart('changes')
		await flushPromises()

		expect(get).toHaveBeenCalledTimes(4)
		again.unmount()
	})

	it('reports when a version cannot be loaded', async () => {
		const error = vi.spyOn(logger, 'error').mockImplementation(() => {})
		get.mockRejectedValue(new Error('offline'))
		const before = mountPart('before')
		await flushPromises()

		expect(error).toHaveBeenCalledWith('Failed to load versions for comparison', expect.anything())
		expect(before.emitted('loaded')).toHaveLength(1)
		expect(before.text()).toContain('Could not load the versions to compare')

		before.unmount()
	})
})

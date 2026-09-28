/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import ViewerVersionComparison from '../../components/ViewerVersionComparison.vue'

const source = 'https://cloud.example/remote.php/dav/versions/alice/versions/7/1691420501'
const currentSource = 'https://cloud.example/remote.php/dav/files/alice/notes.md'
const contents: Record<string, string> = { [source]: '# Old title', [currentSource]: '# New title' }

// The comparison component is loaded lazily; import it once so no test pays for the first import.
beforeAll(() => import('../../components/MarkdownContentComparison.vue'))

afterEach(() => vi.restoreAllMocks())

function mountComparison() {
	return mount(ViewerVersionComparison, {
		props: { source, currentSource, fileId: 7, filePath: '/notes.md' },
		attachTo: document.body,
	})
}

describe('ViewerVersionComparison', () => {
	it('loads both versions and compares them', async () => {
		const get = vi.spyOn(axios, 'get').mockImplementation(async (url) => ({ data: contents[url as string] }))
		const wrapper = mountComparison()
		await flushPromises()

		expect(get.mock.calls.map(([url]) => url)).toEqual([source, currentSource])
		expect(wrapper.emitted('loaded')).toHaveLength(1)
		await vi.waitFor(() => expect(wrapper.find('[data-comparison-select]').exists()).toBe(true))
		expect(wrapper.find('[data-comparison-select] del').text()).toBe('Old')
		expect(wrapper.find('[data-comparison-select] ins').text()).toBe('New')
		wrapper.unmount()
	})

	it('reports when a version cannot be loaded', async () => {
		vi.spyOn(axios, 'get').mockRejectedValue(new Error('offline'))
		const wrapper = mountComparison()
		await flushPromises()

		expect(wrapper.emitted('loaded')).toHaveLength(1)
		expect(wrapper.text()).toContain('Could not load the versions to compare')
		wrapper.unmount()
	})
})

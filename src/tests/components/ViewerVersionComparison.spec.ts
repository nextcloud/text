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
import { trackClosingSave } from '../../helpers/closingSaves.ts'
import { logger } from '../../helpers/logger.ts'

const viewer = vi.hoisted(() => new EventTarget())
vi.mock('@nextcloud/viewer', () => ({ getViewer: () => viewer }))
const summaries = vi.hoisted(() => ({ on: false }))
vi.mock('@nextcloud/initial-state', () => ({ loadState: (app: string, key: string, fallback: unknown) => key === 'version_summaries' ? summaries.on : fallback }))

const baseSource = 'https://cloud.example/remote.php/dav/versions/alice/versions/7/1691420501'
const fileSource = 'https://cloud.example/remote.php/dav/files/alice/notes.md'
const contents: Record<string, string> = {
	[baseSource]: '# Old title\n\nPlain text',
	[fileSource]: '# New title\n\n**Plain** text',
}

// The bytes of a file, as DAV serves Markdown
function response(text: string) {
	return { data: new TextEncoder().encode(text).buffer, headers: { 'content-type': 'text/markdown;charset=UTF-8' } }
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

// Mounted parts load both files after a moment, waiting for an editor the comparison replaces
async function loaded() {
	await new Promise((resolve) => setTimeout(resolve))
	await flushPromises()
}

// The comparison editors are heavy to import; load them once so no test pays for it.
beforeAll(() => import('../../comparison/session.ts'), 30_000)

let get: MockInstance<typeof axios.get>

beforeEach(() => {
	get = vi.spyOn(axios, 'get').mockImplementation(async (url: string) => response(contents[url]!))
})

afterEach(async () => {
	viewer.dispatchEvent(new CustomEvent('close'))
	vi.restoreAllMocks()
	// Also when a test failed before undoing them
	vi.unstubAllGlobals()
	summaries.on = false
	// Let unmounted parts release their comparison
	await new Promise((resolve) => setTimeout(resolve))
})

describe('ViewerVersionComparison', () => {
	it('loads both files once for both documents side by side', async () => {
		const before = mountPart('before')
		const after = mountPart('after')
		await loaded()

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
		await loaded()

		expect(before.find('.text-comparison__filter').exists()).toBe(true)
		expect(before.find('.text-comparison__navigation').exists()).toBe(false)
		expect(after.find('.text-comparison__filter').exists()).toBe(false)
		expect(after.find('.text-comparison__navigation').text()).toContain('Change 1 of 2')

		before.unmount()
		after.unmount()
	})

	it('offers a summary on the row of the navigation, and spans it over both documents', async () => {
		summaries.on = true
		// Every pane is 500 pixels wide, side by side with a gap of 8
		vi.stubGlobal('ResizeObserver', class {
			constructor(private callback: ResizeObserverCallback) {}
			observe(target: Element) {
				this.callback([{ target, borderBoxSize: [{ blockSize: 120, inlineSize: 500 }] } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver)
			}

			unobserve() {}
			disconnect() {}
		})
		vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function(this: HTMLElement) {
			const left = this.classList.contains('text-version-comparison--after') ? 508 : 0
			return { left, right: left + 500, x: left, y: 0, top: 0, bottom: 0, width: 500, height: 0 } as DOMRect
		})
		const end = { mtime: 1000, size: 10, label: '', author: null }
		get.mockImplementation(async (url: string) => url.includes('/version-summaries/')
			? { data: { ocs: { data: { state: 'absent', summary: null, error: null, queuePosition: null, progress: null, ends: { from: { ...end, id: '1691420501' }, to: { ...end, id: 'current' } }, fileName: 'notes.md', generation: { available: true, reason: null, retryAfter: null } } } } }
			: response(contents[url]!))

		const before = mountPart('before')
		const after = mountPart('after')
		await loaded()

		await vi.waitFor(() => expect(before.find('.text-comparison__header').text()).toContain('Summarize changes'))
		expect(after.find('.text-comparison__header').text()).toContain('Change 1 of 2')
		expect(before.classes()).toContain('text-version-comparison--spanning')
		expect(before.find('.text-comparison__summary').attributes('style')).toContain('inline-size: 1008px')

		before.unmount()
		after.unmount()
	})

	it('lists the changes with the filter, and makes a picked one current', async () => {
		const changes = mountPart('changes')
		await loaded()

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
		await loaded()
		await changes.findAll('[data-comparison-select]')[1]!.trigger('click')

		// The viewer mounts the next view before it lets go of the previous one
		const after = mountPart('after')
		changes.unmount()
		await loaded()

		expect(get).toHaveBeenCalledTimes(2)
		expect(after.find('.text-comparison__navigation').text()).toContain('Change 2 of 2')

		after.unmount()
	})

	it('loads the files again once every part is gone', async () => {
		mountPart('changes').unmount()
		await loaded()
		await new Promise((resolve) => setTimeout(resolve))

		const again = mountPart('changes')
		await loaded()

		expect(get).toHaveBeenCalledTimes(4)
		again.unmount()
	})

	it('reports when a version cannot be loaded', async () => {
		const error = vi.spyOn(logger, 'error').mockImplementation(() => {})
		get.mockRejectedValue(new Error('offline'))
		const before = mountPart('before')
		await loaded()

		expect(error).toHaveBeenCalledWith('Failed to load versions for comparison', expect.anything())
		expect(before.emitted('loaded')).toHaveLength(1)
		expect(before.text()).toContain('Could not load the versions to compare')

		before.unmount()
	})

	it('keeps the version pickers and tries again after a failed load', async () => {
		vi.spyOn(logger, 'error').mockImplementation(() => {})
		get.mockRejectedValue(new Error('gone'))
		const before = mountPart('before')
		const after = mountPart('after')
		await loaded()

		expect(before.find('[data-comparison-picker="from"]').exists()).toBe(true)
		expect(before.findAll('button').some((button) => button.text() === 'Try again')).toBe(false)
		expect(after.find('[data-comparison-picker="to"]').exists()).toBe(true)
		expect(after.text()).toContain('A version may no longer exist. Choose other versions or try again.')

		get.mockImplementation(async (url: string) => response(contents[url]!))
		await after.findAll('button').find((button) => button.text() === 'Try again')!.trigger('click')
		await loaded()

		expect(get).toHaveBeenCalledTimes(4)
		expect(after.text()).not.toContain('Could not load the versions to compare')
		expect(get).toHaveBeenLastCalledWith(expect.any(String), expect.objectContaining({ timeout: 120_000 }))

		before.unmount()
		after.unmount()
	})

	it('says when the edits of the editor it replaces could not be saved', async () => {
		vi.spyOn(logger, 'error').mockImplementation(() => {})
		const after = mountPart('after')
		trackClosingSave(7, Promise.resolve(false))
		await loaded()

		expect(after.text()).toContain('The latest edits could not be saved before comparing. Try again to compare the file as it is stored.')
		expect(after.text()).not.toContain('A version may no longer exist')

		after.unmount()
	})

	it('gives the keyboard back to the comparison after trying again', async () => {
		vi.spyOn(logger, 'error').mockImplementation(() => {})
		get.mockRejectedValue(new Error('gone'))
		const after = mountPart('after')
		await loaded()
		const tryAgain = after.findAll('button').find((button) => button.text() === 'Try again')!
		;(tryAgain.element as HTMLElement).focus()

		get.mockImplementation(async (url: string) => response(contents[url]!))
		await tryAgain.trigger('click')
		await loaded()

		expect(after.element.contains(document.activeElement)).toBe(true)
		after.unmount()
	})

	it('offers no summary of a pair whose older end is the current file', async () => {
		summaries.on = true
		// Collectives orders by time, and a restore sets the current file back to an older one's
		const changes = mount(ViewerVersionComparison, { props: { base: file, file: base, part: 'changes' }, attachTo: document.body })
		await loaded()
		await new Promise((resolve) => setTimeout(resolve, 20))

		expect(changes.text()).not.toContain('Summarize changes')
		expect(get.mock.calls.some(([url]) => String(url).includes('/version-summaries/'))).toBe(false)
		changes.unmount()
	})

	it('names the versions in the complete source too', async () => {
		get.mockImplementation(async (url: string) => response(contents[url] + 'x'.repeat(600_000)))
		const before = mountPart('before')
		const changes = mountPart('changes')
		await loaded()

		expect(before.find('[data-comparison-source-fallback] h2 [data-comparison-picker="from"]').exists()).toBe(true)
		expect(changes.findAll('.text-comparison__header [data-comparison-picker]')).toHaveLength(2)
		expect(changes.findAll('[data-comparison-source-fallback] [data-comparison-picker]')).toHaveLength(0)

		before.unmount()
		changes.unmount()
	})

	it('offers no other versions for files that are not versions of one file', async () => {
		const other = makeFile('https://cloud.example/remote.php/dav/files/alice/other.md')
		const changes = mount(ViewerVersionComparison, { props: { base: { ...other, fileid: 8 } as IFile, file, part: 'changes' }, attachTo: document.body })
		await loaded()

		expect(changes.find('[data-comparison-picker]').exists()).toBe(false)
		expect(changes.find('[aria-live]').exists()).toBe(false)

		changes.unmount()
	})
})

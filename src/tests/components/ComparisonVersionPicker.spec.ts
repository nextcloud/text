/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'
import type { VersionEntry } from '../../comparison/versionEnds.ts'

import axios from '@nextcloud/axios'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ComparisonVersionPicker from '../../components/ComparisonVersionPicker.vue'
import { takeAnnouncement, takeFocus } from '../../comparison/focus.ts'
import { comparedPair, endOf } from '../../comparison/versionEnds.ts'
import { useFileVersions } from '../../comparison/versions.ts'

const viewer = vi.hoisted(() => Object.assign(new EventTarget(), { compare: vi.fn(async () => {}) }))
vi.mock('@nextcloud/viewer', () => ({ getViewer: () => viewer }))
vi.mock('@nextcloud/files', async () => await vi.importActual('@nextcloud/files'))
vi.mock('@nextcloud/auth', async (importOriginal) => ({ ...await importOriginal<object>(), getCurrentUser: () => ({ uid: 'alice' }) }))

function source(id: string) {
	return id === 'current'
		? 'https://cloud.example/remote.php/dav/files/alice/plan.md'
		: `https://cloud.example/remote.php/dav/versions/alice/versions/7/${id}`
}
const nodeOf = (id: string, mtime: number) => ({ fileid: 7, source: source(id), encodedSource: source(id), mtime: new Date(mtime * 1000) }) as unknown as IFile
const entry = (id: string, mtime: number, label = ''): VersionEntry => ({ id, mtime, size: 10, label, author: { id: 'bob', displayName: 'Bob' } })

// Current, then two versions within one minute (01:07:00 and 01:07:30), then an older one
const versions = [entry('current', 5000), entry('4050', 4050), entry('4020', 4020, 'Draft'), entry('1000', 1000)]

async function mountPicker(end: 'from' | 'to', ends = { from: '1000', to: 'current' }, part: 'before' | 'after' | 'changes' = 'changes') {
	vi.spyOn(axios, 'get').mockResolvedValue({ data: { ocs: { data: { path: '/plan.md', versions, versionsAvailable: true } } } })
	await useFileVersions(7).refresh()
	const all = Object.fromEntries(versions.map((version) => [version.id, version.mtime]))
	const pair = comparedPair(nodeOf(ends.from, all[ends.from]!), nodeOf(ends.to, all[ends.to]!))!
	return mount(ComparisonVersionPicker, {
		props: { end, pair, part },
		attachTo: document.body,
	})
}

afterEach(() => {
	viewer.dispatchEvent(new Event('close'))
	vi.restoreAllMocks()
	viewer.compare.mockClear()
})

describe('ComparisonVersionPicker', () => {
	it('offers only what keeps the older version first, and says why the rest is off', async () => {
		const wrapper = await mountPicker('from', { from: '1000', to: '4020' })
		const options = (wrapper.vm as unknown as { options: { entry: VersionEntry, disabled: boolean, description: string }[] }).options

		expect(options.map(({ entry, disabled }) => [entry.id, disabled])).toEqual([['current', true], ['4050', true], ['4020', true], ['1000', false]])
		expect(options[0]!.description).toContain('Newer than the other end')
		expect(options[2]!.description).toContain('Draft')
		wrapper.unmount()
	})

	it('tells apart versions saved within one minute by their seconds', async () => {
		const wrapper = await mountPicker('to')
		const names = (wrapper.vm as unknown as { options: { name: string }[] }).options.map(({ name }) => name)

		expect(names[0]).toBe('Current version')
		expect(names[1]).not.toBe(names[2])
		wrapper.unmount()
	})

	it.each([
		['from', 'changes', /^From /],
		['to', 'changes', /^to Current version, /],
		['from', 'before', /^Before: /],
		['to', 'after', /^After: Current version, /],
	] as const)('names the %s end as the %s view does', async (end, part, name) => {
		const wrapper = await mountPicker(end, undefined, part)

		expect(wrapper.find('[data-comparison-picker] button').text()).toMatch(name)
		wrapper.unmount()
	})

	it('tells apart in its announcement two versions saved within one minute', async () => {
		const wrapper = await mountPicker('from', { from: '1000', to: '4050' })

		;(wrapper.vm as unknown as { choose: (entry: VersionEntry) => void }).choose(versions[2]!)
		await flushPromises()

		const [, from, to] = takeAnnouncement({ fileId: 7, from: '4020', to: '4050' })?.match(/^Comparing (.+) with (.+)$/) ?? []
		expect(from).toBeDefined()
		expect(from).not.toBe(to)
		wrapper.unmount()
	})

	it('compares the version chosen with the other end, and hands the keyboard back to this picker', async () => {
		const wrapper = await mountPicker('from')

		;(wrapper.vm as unknown as { choose: (entry: VersionEntry) => void }).choose(versions[2]!)
		await flushPromises()

		expect(viewer.compare).toHaveBeenCalledOnce()
		const [file, base] = viewer.compare.mock.calls[0] as unknown as [IFile, IFile]
		expect(file.source).toBe(source('current'))
		expect(endOf(base)).toEqual({ fileId: 7, id: '4020' })
		const next = { fileId: 7, from: '4020', to: 'current' }
		expect(takeFocus(next, 'from')).toBe(true)
		expect(takeAnnouncement(next)).toMatch(/^Comparing .* with the current version$/)
		wrapper.unmount()
	})
})

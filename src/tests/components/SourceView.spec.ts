/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SourceView from '../../components/SourceView.vue'
import { trackClosingSave } from '../../helpers/closingSaves.ts'

const source = 'https://cloud.example/remote.php/dav/files/alice/notes.txt'

function mountSource(fileid: number, props: Record<string, unknown> = {}) {
	return mount(SourceView, {
		props: { filename: '/notes.txt', fileid, source, mime: 'text/plain', ...props },
		global: { provide: { isEmbedded: false }, stubs: { PlainTextReader: true, MarkdownContentEditor: true } },
	})
}

afterEach(() => {
	vi.restoreAllMocks()
})

describe('SourceView', () => {
	it('shows a plain text file as the editor closing on it saved it', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: 'saved' })
		let saved!: (done: boolean) => void
		const wrapper = mountSource(21)
		// The viewer closes the editor after the view started
		trackClosingSave(21, new Promise<boolean>((resolve) => {
			saved = resolve
		}))
		await new Promise((resolve) => setTimeout(resolve))
		await flushPromises()
		expect(get).not.toHaveBeenCalled()

		saved(true)
		await flushPromises()

		// Files come without caching rules: a cached copy would miss the save
		expect(get).toHaveBeenCalledWith(source, expect.objectContaining({ headers: { 'Cache-Control': 'no-cache' } }))
		wrapper.unmount()
	})

	it('shows a file at once where it need not wait for an editor saving it', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: 'old' })
		trackClosingSave(23, Promise.resolve(false))
		const version = mountSource(23, { skipClosingSave: true })
		await new Promise((resolve) => setTimeout(resolve))
		await flushPromises()
		expect(get).toHaveBeenCalledOnce()
		expect(version.emitted('loaded')).toEqual([[true]])
		version.unmount()

		// The failed save is still told to what shows the current file
		const current = mountSource(23)
		await new Promise((resolve) => setTimeout(resolve))
		await flushPromises()
		expect(current.emitted('errored')).toEqual([[expect.any(Error)]])
		current.unmount()
	})

	it('shows a file as text, also one the browser could read as JSON', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: '{"a":1}' })
		const wrapper = mountSource(24, { mime: 'application/json' })
		await new Promise((resolve) => setTimeout(resolve))
		await flushPromises()

		expect(get).toHaveBeenCalledWith(source, expect.objectContaining({ responseType: 'text' }))
		wrapper.unmount()
	})

	it('shows an error instead of the stored file when the closing save failed', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: 'server' })
		trackClosingSave(22, Promise.resolve(false))
		const failed = mountSource(22)
		await new Promise((resolve) => setTimeout(resolve))
		await flushPromises()

		expect(get).not.toHaveBeenCalled()
		expect(failed.emitted('loaded')).toBeUndefined()
		expect(failed.emitted('errored')).toEqual([[expect.any(Error)]])
		failed.unmount()

		// Opened again, it shows the file as the server has it
		const again = mountSource(22)
		await new Promise((resolve) => setTimeout(resolve))
		await flushPromises()
		expect(get).toHaveBeenCalledOnce()
		expect(again.emitted('loaded')).toEqual([[true]])
		again.unmount()
	})

	it('shows a closing save that failed at once in both panes side by side', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: 'server' })
		const before = mountSource(25)
		const after = mountSource(25)
		// The viewer closes the editor after the view started; it could not save at all
		trackClosingSave(25, Promise.resolve(false))
		await new Promise((resolve) => setTimeout(resolve))
		await flushPromises()

		// A pane that loaded would clear the other's error in the viewer
		expect(get).not.toHaveBeenCalled()
		expect(before.emitted('errored')).toEqual([[expect.any(Error)]])
		expect(after.emitted('errored')).toEqual([[expect.any(Error)]])
		before.unmount()
		after.unmount()
	})
})

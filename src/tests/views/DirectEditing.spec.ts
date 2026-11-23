/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

const saveWhenDirty = vi.hoisted(() => vi.fn(async () => {}))
const closeEditor = vi.hoisted(() => vi.fn(async () => {}))

// The editor itself is not what is tested here
vi.mock('../../components/EditorReloader.vue', () => ({
	default: defineComponent({
		name: 'EditorReloader',
		methods: { saveWhenDirty, close: closeEditor },
		template: '<div />',
	}),
}))

import DirectEditing from '../../views/DirectEditing.vue'

type DirectEditingWindow = {
	OCA: { Text?: { DirectEditing?: { close: () => Promise<void> } } }
	OCP: unknown
	DirectEditingMobileInterface?: { close: () => void, loading: () => void }
}

const win = window as unknown as DirectEditingWindow

describe('Direct editing', () => {
	let appClose: ReturnType<typeof vi.fn<() => void>>

	beforeEach(() => {
		saveWhenDirty.mockReset().mockResolvedValue(undefined)
		closeEditor.mockReset().mockResolvedValue(undefined)
		appClose = vi.fn<() => void>()
		win.DirectEditingMobileInterface = { close: appClose, loading: vi.fn() }
		win.OCP = { InitialState: { loadState: () => ({ session: 'null', fileId: 1, mimetype: 'text/markdown' }) } }
		document.head.innerHTML = '<meta name="viewport" content="">'
		// jsdom requires a target origin that browsers do not
		vi.spyOn(window, 'postMessage').mockImplementation(() => {})
		mount(DirectEditing)
	})

	afterEach(() => {
		delete win.DirectEditingMobileInterface
		vi.restoreAllMocks()
	})

	it('saves, closes the editor and then tells the app to close', async () => {
		await win.OCA.Text?.DirectEditing?.close()

		expect(saveWhenDirty).toHaveBeenCalledOnce()
		expect(closeEditor).toHaveBeenCalledOnce()
		expect(appClose).toHaveBeenCalledOnce()
		expect(closeEditor.mock.invocationCallOrder[0]).toBeLessThan(appClose.mock.invocationCallOrder[0])
	})

	it('closes only once if called repeatedly', async () => {
		const close = win.OCA.Text!.DirectEditing!.close
		await Promise.all([close(), close()])

		expect(closeEditor).toHaveBeenCalledOnce()
		expect(appClose).toHaveBeenCalledOnce()
	})

	it('tells the app to close even if closing the editor fails', async () => {
		closeEditor.mockRejectedValue(new Error('Network error'))

		await expect(win.OCA.Text?.DirectEditing?.close()).resolves.toBeUndefined()

		expect(appClose).toHaveBeenCalledOnce()
	})
})

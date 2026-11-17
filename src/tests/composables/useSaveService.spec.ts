/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Editor } from '@tiptap/core'
import type { SaveService } from '../../services/SaveService.ts'
import type { EventTypes, SyncService } from '../../services/SyncService.ts'
import type { Connection } from '../../types/Connection.ts'
import type { Document } from '../../types/Document.ts'

import { mount } from '@vue/test-utils'
import mitt from 'mitt'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, shallowRef } from 'vue'
import { Doc } from 'yjs'
import * as saveApi from '../../apis/save.ts'
import { provideSaveService } from '../../composables/useSaveService.ts'

vi.mock('../../apis/save.ts')

const connection = shallowRef<Connection | undefined>({
	documentId: '123',
	sessionId: 345,
	sessionToken: 'sessionToken',
	filePath: './',
	baseVersionEtag: 'etag',
})

/**
 * Mount a component providing the save service with a stubbed sync service.
 *
 * @param options options
 * @param options.version version on the stupped sync service
 */
function setup({ version = 2 } = {}) {
	const syncService = {
		bus: mitt<EventTypes>(),
		version,
		sendRemainingSteps: vi.fn(async () => {}),
	}
	const editor = { on: vi.fn(), off: vi.fn() }
	const setDirty = vi.fn<(val: boolean) => Promise<void>>(async () => {})
	let saveService: SaveService | undefined
	mount(defineComponent({
		template: '<div />',
		setup() {
			({ saveService } = provideSaveService(
				connection,
				editor as unknown as Editor,
				syncService as unknown as SyncService,
				() => 'content',
				new Doc(),
				setDirty as unknown as (val: boolean) => Promise<never>,
			))
		},
	}))
	const document = { lastSavedVersion: 1, lastSavedVersionTime: 0 } as Document
	syncService.bus.emit('change', { document, sessions: [] })
	return { syncService, setDirty, saveService: saveService! }
}

describe('provideSaveService', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		vi.mocked(saveApi.save).mockResolvedValue({
			data: { document: { lastSavedVersion: 2, lastSavedVersionTime: 0 } },
		} as Awaited<ReturnType<typeof saveApi.save>>)
	})

	afterEach(() => {
		vi.useRealTimers()
		vi.clearAllMocks()
	})

	it('is dirty while local changes are pending', async () => {
		const { syncService, setDirty } = setup()
		syncService.bus.emit('pendingChanges', { pending: true })
		await nextTick()
		expect(setDirty.mock.lastCall?.[0]).toBe(true)
		syncService.bus.emit('pendingChanges', { pending: false })
		await nextTick()
		expect(setDirty.mock.lastCall?.[0]).toBe(false)
	})

	it('autosaves changes pushed without an editor update', async () => {
		const { syncService } = setup()
		syncService.bus.emit('changesPushed', { version: 2 })
		await vi.advanceTimersByTimeAsync(1000)
		expect(saveApi.save).toHaveBeenCalledWith(connection.value, expect.objectContaining({ version: 2 }))
	})

	it('does not autosave pushed changes that are already saved', async () => {
		const { syncService } = setup()
		syncService.bus.emit('changesPushed', { version: 1 })
		await vi.advanceTimersByTimeAsync(1000)
		expect(saveApi.save).not.toHaveBeenCalled()
	})

	it('saves version 0 before any steps were received', async () => {
		const { saveService } = setup({ version: -1 })
		await saveService.save()
		expect(saveApi.save).toHaveBeenCalledWith(connection.value, expect.objectContaining({ version: 0 }))
	})
})

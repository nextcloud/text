/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SessionTransport } from '../../services/SessionTransport.ts'

import { ySyncPluginKey } from '@tiptap/y-tiptap'
import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import * as Y from 'yjs'
import CollaborativeEditor from '../../components/CollaborativeEditor.vue'
import { encodeArrayBuffer } from '../../helpers/base64.ts'
import { SyncService } from '../../services/SyncService.ts'

const methods = CollaborativeEditor.methods!

describe('embedding recovery', () => {
	it('exports unsynced state with its original base after a forbidden push', async () => {
		const connection = shallowRef({ documentId: 'doc', sessionId: 7, sessionToken: 'secret', baseVersionEtag: 'original-base', filePath: '' })
		const transport = { push: vi.fn().mockRejectedValue({ response: { status: 403 } }) } as unknown as SessionTransport
		const service = new SyncService({ connection, openConnection: vi.fn(), transport })
		const ydoc = new Y.Doc()
		ydoc.getText('recovery').insert(0, 'Unsynced edits')
		const context = {
			contentLoaded: true,
			connection: connection.value,
			openData: { document: { baseVersionEtag: 'original-base' } },
			context: { type: 'file', id: 42 },
			ydoc,
			saveService: { getSaveData: () => ({ version: service.version, autosaveContent: 'Unsynced edits', documentState: encodeArrayBuffer(Y.encodeStateAsUpdate(ydoc)) }) },
		}
		try {
			service.sendStep(new Uint8Array([0, 1, 0]))
			await expect(service.sendStepsNow()).rejects.toThrow('Failed to apply steps')
			expect(connection.value).toBeUndefined()
			context.connection = connection.value
			const state = methods.exportState.call(context)
			expect(state.baseVersionEtag).toBe('original-base')
			expect(state.markdown).toBe('Unsynced edits')
			const restored = new Y.Doc()
			Y.applyUpdate(restored, Buffer.from(state.documentState, 'base64'))
			expect(restored.getText('recovery').toString()).toBe('Unsynced edits')
			expect(encodeArrayBuffer(Y.encodeStateVector(restored))).toBe(state.stateVector)
			expect(JSON.stringify(state)).not.toContain('secret')
			restored.destroy()
		} finally {
			ydoc.destroy()
		}
	})

	it('rejects export before the document has loaded', () => {
		expect(() => methods.exportState.call({ contentLoaded: false })).toThrow('not ready')
	})

	it.each([
		[undefined, true, true],
		[undefined, false, false],
		[{ isChangeOrigin: true }, true, false],
		[{ isChangeOrigin: true, isUndoRedoOperation: true }, true, true],
	])('reports whether an editor update is local (%j)', (origin, docChanged, local) => {
		const emit = vi.fn()
		methods.onUpdate.call({ serialize: () => '**Formatted**', $emit: emit }, {
			editor: {},
			transaction: { docChanged, getMeta: (key: unknown) => key === ySyncPluginKey ? origin : undefined },
		})
		expect(emit).toHaveBeenCalledWith('update:content', { markdown: '**Formatted**', local })
	})
})

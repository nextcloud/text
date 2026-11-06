/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SessionTransport } from '../../services/SessionTransport.ts'

import { describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent } from 'vue'
import { IndexeddbPersistence } from 'y-indexeddb'
import { Doc } from 'yjs'
import { provideConnection } from '../../composables/useConnection.ts'
import { useIndexedDbProvider } from '../../composables/useIndexedDbProvider.ts'
import { sessionTransportKey } from '../../services/SessionTransport.ts'

vi.mock('y-indexeddb', () => ({ IndexeddbPersistence: vi.fn() }))

describe('embedding instance isolation', () => {
	it('keeps transports and in-memory bases separate for matching file IDs', async () => {
		const mounts = ['account-a', 'account-b'].map((base) => {
			const transport = { openContext: vi.fn(async () => ({
				connection: { documentId: base, sessionId: 7, sessionToken: 'host-owned', baseVersionEtag: base, filePath: '' },
				data: { document: { baseVersionEtag: base } },
			})) } as unknown as SessionTransport
			let binding!: ReturnType<typeof provideConnection>
			let persistence!: ReturnType<typeof useIndexedDbProvider>
			const doc = new Doc()
			const app = createApp(defineComponent({
				setup() {
					const props = { context: { type: 'file', id: 42 }, relativePath: '' }
					persistence = useIndexedDbProvider(props, doc)
					binding = provideConnection(props, persistence.getBaseVersionEtag, persistence.setBaseVersionEtag)
					return () => null
				},
			}))
			app.provide(sessionTransportKey, transport)
			app.mount(document.createElement('div'))
			return { app, doc, binding, persistence, transport }
		})
		try {
			await Promise.all(mounts.map((mount) => mount.binding.openConnection()))
			expect(mounts[0].binding.connection.value?.documentId).toBe('account-a')
			expect(mounts[1].binding.connection.value?.documentId).toBe('account-b')
			expect(await mounts[0].persistence.getBaseVersionEtag()).toBe('account-a')
			expect(await mounts[1].persistence.getBaseVersionEtag()).toBe('account-b')
			for (const mount of mounts) {
				expect(mount.transport.openContext).toHaveBeenCalledOnce()
			}
			expect(IndexeddbPersistence).not.toHaveBeenCalled()
		} finally {
			for (const mount of mounts) {
				mount.app.unmount()
				mount.doc.destroy()
			}
		}
	})
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { SessionTransport } from '../../src/services/SessionTransport.ts'
import type { TextEditorEmbed } from '../../src/TextEditorEmbed.ts'

import { expect } from '@playwright/test'
import { randomUUID } from 'node:crypto'
import * as Y from 'yjs'
import { test } from '../support/fixtures/upload-file.ts'

declare global {
	interface Window {
		embeddingInstances: TextEditorEmbed[]
		embeddingHost: (peer: number, operation: string, data: object) => Promise<any>
	}
}

test.use({ fileName: `embedding-seam-${randomUUID()}.md`, fileContent: '# Embedded Text\n\nShared text.\n' })

test('public transport joins two editors, exports Yjs state and acknowledges drain', async ({ page, file, baseURL }) => {
	type Session = { documentId: string, sessionId: number, sessionToken: string, baseVersionEtag: string }
	const sessions = new Map<number, Session>()
	const operations = new Set<string>()
	const sanitize = (value: unknown): unknown => {
		if (Array.isArray(value)) {
			return value.map(sanitize)
		}
		if (!value || typeof value !== 'object') {
			return value
		}
		return Object.fromEntries(Object.entries(value).map(([key, data]) => [key, ['token', 'sessiontoken'].includes(key.toLowerCase()) ? 'host-owned' : sanitize(data)]))
	}
	await page.exposeBinding('embeddingHost', async ({ frame }, peer, operation, data) => {
		expect(frame).toBe(page.mainFrame())
		expect([0, 1]).toContain(peer)
		expect(['create', 'sync', 'push', 'save', 'close']).toContain(operation)
		operations.add(operation)
		const session = sessions.get(peer)
		const path = operation === 'create' ? `file/${file.id}/create` : `${session!.documentId}/${operation}`
		const response = await page.request.fetch(new URL(`apps/text/session/${path}`, baseURL).href, {
			method: operation === 'create' ? 'PUT' : 'POST',
			data: { ...data, ...session },
		})
		expect(response.ok()).toBe(true)
		const result = await response.json()
		if (operation === 'create') {
			sessions.set(peer, { documentId: result.document.id, sessionId: result.session.id, sessionToken: result.session.token, baseVersionEtag: result.document.baseVersionEtag })
		}
		return sanitize(result)
	})
	await page.goto('apps/files')
	const root = await page.evaluate(() => (window as unknown as { OC: { appswebroots: { text: string } } }).OC.appswebroots.text)
	await page.addScriptTag({ url: `${root}/js/text-editor.mjs`, type: 'module' })
	await page.evaluate(async (id) => {
		window.embeddingInstances = []
		for (const peer of [0, 1]) {
			const el = document.createElement('div')
			el.id = `embedding-${peer}`
			Object.assign(el.style, { position: 'fixed', top: '0', left: `${peer * 50}%`, width: '50%', height: '100%', zIndex: '10000', background: 'white' })
			document.body.append(el)
			const sessionTransport: SessionTransport = {
				async openContext() {
					const data = await window.embeddingHost(peer, 'create', {})
					return { data, connection: { documentId: data.document.id, sessionId: data.session.id, sessionToken: data.session.token, baseVersionEtag: data.document.baseVersionEtag, filePath: '' } }
				},
				async sync(_connection, data) { return { data: await window.embeddingHost(peer, 'sync', data) } },
				async push(_connection, data) { return { data: await window.embeddingHost(peer, 'push', data) } },
				async save(_connection, data) { return { data: await window.embeddingHost(peer, 'save', data) } },
				async close() { return window.embeddingHost(peer, 'close', {}) },
			}
			window.embeddingInstances.push(await window.OCA.Text.createCollaborativeEditor({
				el,
				context: { type: 'file', id },
				autofocus: false,
				sessionTransport,
			}))
		}
	}, file.id)
	try {
		for (const peer of [0, 1]) {
			const editor = page.locator(`#embedding-${peer} .ProseMirror[contenteditable=true]`)
			await expect(editor).toContainText('Shared text.', { timeout: 15_000 })
			await editor.click()
			await editor.press('ControlOrMeta+End')
			await editor.pressSequentially([' Client-α', ' Client-日本語'][peer])
		}
		await expect.poll(() => page.evaluate(() => window.embeddingInstances.every((editor) => {
			const markdown = editor.exportState().markdown
			return markdown.includes('Client-α') && markdown.includes('Client-日本語')
		})), { timeout: 15_000 }).toBe(true)
		const states = await page.evaluate(() => Promise.all(window.embeddingInstances.map((editor) => editor.drain())))
		for (const state of states) {
			const doc = new Y.Doc()
			Y.applyUpdate(doc, Buffer.from(state.documentState, 'base64'))
			expect([...Y.encodeStateVector(doc)]).toEqual([...Buffer.from(state.stateVector, 'base64')])
			expect(state.markdown).toContain('Client-α')
			doc.destroy()
		}
		await expect(page.locator('#embedding-0 .ProseMirror')).toHaveAttribute('contenteditable', 'false')
		expect([...operations]).toEqual(expect.arrayContaining(['create', 'sync', 'push']))
	} finally {
		await page.evaluate(() => window.embeddingInstances.forEach((editor) => editor.destroy()))
	}
})

/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Collaboration } from '@tiptap/extension-collaboration'
import * as decoding from 'lib0/decoding'
import * as encoding from 'lib0/encoding'
import * as syncProtocol from 'y-protocols/sync'
import { Doc, encodeStateAsUpdate } from 'yjs'
import { createRichEditor } from '../EditorFactory.js'
import { createMarkdownSerializer } from '../extensions/Markdown.js'
import { decodeArrayBuffer } from '../helpers/base64.ts'
import recorded from './fixtures/recorded.js'
import stepsTwoClients from './fixtures/steps_two_clients.js'

describe('recorded session', () => {
	const flattened = recorded.flat()
	const sync = flattened.filter((step) => step.startsWith('AA'))
	const awareness = flattened.filter((step) => /^A[QRSTU]/.test(step))
	const size = (arr) => arr.reduce((total, cur) => total + cur.length, 0)
	const processStep = (ydoc, step) => {
		const buf = decodeArrayBuffer(step)
		const decoder = decoding.createDecoder(buf)
		const encoder = encoding.createEncoder()
		decoding.readVarUint(decoder)
		const inType = syncProtocol.readSyncMessage(decoder, encoder, ydoc)
		if (!encoding.length(encoder)) {
			return { inType, length: 0 }
		}
		const binary = encoding.toUint8Array(encoder)
		const outBuf = decodeArrayBuffer(binary)
		const outDecoder = decoding.createDecoder(outBuf)
		const outType = decoding.peekVarUint(outDecoder)
		return { inType, outType, length: encoding.length(encoder) }
	}

	test('original size', () => {
		expect(recorded.length).toBe(4964)
	})

	test('flattened size', () => {
		expect(flattened.length).toBe(8117)
	})

	test('sync & awareness count', () => {
		expect(sync.length).toBe(2834)
		expect(awareness.length).toBe(8117 - 2834)
	})

	test('sync & awareness size', () => {
		expect(size(sync)).toBe(4710164)
		expect(size(awareness)).toBe(87764)
	})

	test('message types', () => {
		sync.forEach((step) => {
			const buf = decodeArrayBuffer(step)
			const decoder = decoding.createDecoder(buf)
			const messageType = decoding.readVarUint(decoder)
			const syncMessageType = decoding.peekVarUint(decoder)
			expect(messageType).toBe(0)
			expect([0, 1, 2]).toContain(syncMessageType)
		})
		awareness.forEach((step) => {
			const buf = decodeArrayBuffer(step)
			const decoder = decoding.createDecoder(buf)
			const messageType = decoding.readVarUint(decoder)
			expect(messageType).toBe(1)
		})
	})

	test('sync messages types', () => {
		const syncsOfType = (type) =>
			sync.filter((step) => {
				const buf = decodeArrayBuffer(step)
				const decoder = decoding.createDecoder(buf)
				decoding.readVarUint(decoder)
				return decoding.peekVarUint(decoder) === type
			})
		const step1s = syncsOfType(syncProtocol.messageYjsSyncStep1)
		const step2s = syncsOfType(syncProtocol.messageYjsSyncStep2)
		const updates = syncsOfType(syncProtocol.messageYjsUpdate)
		expect(step1s.length).toBe(344)
		expect(step2s.length).toBe(702)
		expect(updates.length).toBe(1788)
		expect(size(step1s)).toBe(41056)
		expect(size(step2s)).toBe(4566084)
		expect(size(updates)).toBe(103024)
	})

	test('read messages', () => {
		const ydoc = new Doc()
		const responses = sync.map((step) => processStep(ydoc, step))
		responses.forEach(({ inType, length }) => {
			expect([0, 1, 2]).toContain(inType)
			if (inType !== syncProtocol.messageYjsSyncStep1) {
				expect(length).toBe(0)
			}
		})
		expect(encodeStateAsUpdate(ydoc).length).toBeGreaterThan(30000)
		expect(encodeStateAsUpdate(ydoc).length).toBeLessThan(40000)
	})

	test('analyse responses', () => {
		const ydoc = new Doc()
		const responses = sync.map((step) => processStep(ydoc, step))
		responses.forEach(({ inType, outType }) => {
			if (inType === syncProtocol.messageYjsSyncStep1) {
				expect(outType).toBe(syncProtocol.messageYjsSyncStep2)
			}
			if (inType === syncProtocol.messageYjsSyncStep2) {
				expect(outType).toBeUndefined()
			}
			if (inType === syncProtocol.messageYjsUpdate) {
				expect(outType).toBeUndefined()
			}
		})
		const replies = responses.filter((r) => r.length)
		expect(replies.length).toBe(344)
		expect(size(replies)).toBeGreaterThan(500000)
		expect(size(replies)).toBeLessThan(600000)
	})

	test('leaving out queries', () => {
		const ydoc = new Doc()
		const withoutQueries = sync.filter((step) => step > 'AAE')
		const responses = withoutQueries.map((step) => processStep(ydoc, step))
		responses.forEach(({ inType, outType }) => {
			if (inType === syncProtocol.messageYjsSyncStep1) {
				expect(outType).toBe(syncProtocol.messageYjsSyncStep2)
			}
			if (inType === syncProtocol.messageYjsSyncStep2) {
				expect(outType).toBeUndefined()
			}
			if (inType === syncProtocol.messageYjsUpdate) {
				expect(outType).toBeUndefined()
			}
		})
		const replies = responses.filter((r) => r.length)
		expect(encodeStateAsUpdate(ydoc).length).toBeGreaterThan(30000)
		expect(encodeStateAsUpdate(ydoc).length).toBeLessThan(40000)
		expect(replies.length).toBe(0)
		expect(size(replies)).toBe(0)
	})

	test('detecting out of sync due to missing step via pending structs', () => {
		// 10 steps each inserting one character, alternating between two clients
		const syncSteps = stepsTwoClients.flat()
		const fullDocumentContent = 'abcdefghij'
		// Remove steps 2-5 from syncSteps and store them in missingSteps
		const missingSteps = syncSteps.splice(1, 4)

		// Create editor to access the content of the ydoc
		const ydoc = new Doc()
		const tiptap = createRichEditor({
			extensions: [Collaboration.configure({ document: ydoc })],
		})
		const serializer = createMarkdownSerializer(tiptap.schema)

		// Apply steps 1 and 6-10 (steps 2-5 are missing)
		// Pending structs detected and only first charcter visible in content
		syncSteps.map((step) => processStep(ydoc, step))
		expect(ydoc.store.pendingStructs).not.toBeNull()
		expect(serializer.serialize(tiptap.state.doc)).toEqual(
			fullDocumentContent.slice(0, 1),
		)

		// Apply missing steps 2-5
		for (const [i, step] of missingSteps.entries()) {
			processStep(ydoc, step)
			if (i < missingSteps.length - 1) {
				// Each step except the last, one more character gets visible in content
				expect(ydoc.store.pendingStructs).not.toBeNull()
				expect(serializer.serialize(tiptap.state.doc)).toEqual(
					fullDocumentContent.slice(0, i + 2),
				)
			}
		}

		// After all missing steps got applied, content is complete and no pending structs detected anymore
		expect(ydoc.store.pendingStructs).toBeNull()
		expect(serializer.serialize(tiptap.state.doc)).toEqual(fullDocumentContent)
		tiptap.destroy()
	})
})

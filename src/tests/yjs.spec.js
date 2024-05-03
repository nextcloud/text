/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import recorded from './fixtures/recorded'
import { Doc, encodeStateAsUpdate } from 'yjs'
import { decodeArrayBuffer } from '../helpers/base64.ts'
import * as decoding from 'lib0/decoding'
import * as encoding from 'lib0/encoding'
import * as syncProtocol from 'y-protocols/sync'

describe('recorded session', () => {
	const flattened = recorded.flat()
	const sync = flattened.filter(step => step.startsWith('AA'))
	const awareness = flattened.filter(step => /^A[QRSTU]/.test(step))
	function size(arr) {
		return arr.reduce((total, cur) => total + cur.length, 0)
	}

	function processStep(ydoc, step) {
		const buf = decodeArrayBuffer(step)
		const decoder = decoding.createDecoder(buf)
		const encoder = encoding.createEncoder()
		const messageType = decoding.readVarUint(decoder)
		const inType = syncProtocol.readSyncMessage(
			decoder,
			encoder,
			ydoc
		)
		if (!encoding.length(encoder)) {
			return {inType, length: 0}
		}
		const binary = encoding.toUint8Array(encoder)
		const outBuf = decodeArrayBuffer(binary)
		const outDecoder = decoding.createDecoder(outBuf)
		const outType = decoding.peekVarUint(outDecoder)
		return {inType, outType, length: encoding.length(encoder)}
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
		const syncsOfType = type => sync.filter((step) => {
			const buf = decodeArrayBuffer(step)
			const decoder = decoding.createDecoder(buf)
			const messageType = decoding.readVarUint(decoder)
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
		const responses = sync.map(step => processStep(ydoc, step))
		responses.forEach(({inType, length}) => {
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
		const responses = sync.map(step => processStep(ydoc, step))
		responses.forEach(({inType, outType}) => {
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
		const replies = responses.filter(r => r.length)
		expect(replies.length).toBe(344)
		expect(size(replies)).toBeGreaterThan(500000)
		expect(size(replies)).toBeLessThan(600000)
	})

	test('leaving out queries', () => {
		const ydoc = new Doc()
		const withoutQueries = sync.filter(step => step > 'AAE')
		const responses = withoutQueries.map(step => processStep(ydoc, step))
		responses.forEach(({inType, outType}) => {
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
		const replies = responses.filter(r => r.length)
		expect(encodeStateAsUpdate(ydoc).length).toBeGreaterThan(30000)
		expect(encodeStateAsUpdate(ydoc).length).toBeLessThan(40000)
		expect(replies.length).toBe(0)
		expect(size(replies)).toBe(0)
	})

})

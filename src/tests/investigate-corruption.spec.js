/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import recorded from './corrupt.js'
import Y from 'yjs'
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

	test('dumping the ydoc', () => {
		const ydoc = new Y.Doc()
		ydoc.on('update', function(update, origin, doc, tr) {
			// console.debug(doc.getXmlFragment('default').toJSON())
			console.debug('ydoc update', tr.afterState, )
			// Y.logUpdate(update)
		});
		const withoutQueries = sync.filter(step => step > 'AAE')
		const responses = withoutQueries.map(step => {
			processStep(ydoc, step)
		})
		expect(Y.encodeStateAsUpdate(ydoc).length).toBeGreaterThan(4000)
		expect(Y.encodeStateAsUpdate(ydoc).length).toBeLessThan(5000)
		expect(ydoc.getXmlFragment('default').length).toBe(86)
		expect(ydoc.getXmlFragment('default').toJSON()).toBe('')
	})

})

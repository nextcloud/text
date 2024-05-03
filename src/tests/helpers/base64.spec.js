/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { encodeArrayBuffer, decodeArrayBuffer } from '../../helpers/base64'

describe('encoding ArrayBuffer content', () => {
	test('empty array buffer is empty base64 string', () => {
		const buffer = new ArrayBuffer(0)
		expect(buffer.byteLength).toBe(0)
		const encoded = encodeArrayBuffer(buffer)
		expect(encoded).toBe('')
	})

	test('three zero bytes are AAAA', () => {
		const buffer = new Uint8Array([0, 0, 0]).buffer
		expect(buffer.byteLength).toBe(3)
		const encoded = encodeArrayBuffer(buffer)
		expect(encoded).toBe('AAAA')
	})
})

describe('decoding base64 to array buffer', () => {
	test('empty string is empty array buffer', () => {
		const encoded = ''
		const buffer = decodeArrayBuffer(encoded)
		expect(buffer.byteLength).toBe(0)
	})

	test('AAAA are three zero bytes', async () => {
		const encoded = 'AAAA'
		const buffer = decodeArrayBuffer(encoded)
		expect(buffer.byteLength).toBe(3)
		const view = new Uint8Array(buffer);
		expect(view).toEqual(new Uint8Array([0, 0, 0]))
	})
})

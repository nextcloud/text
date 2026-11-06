/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { decodeText, loadText } from '../../comparison/decode.ts'

const bytes = (...values: number[]) => new Uint8Array(values)
const utf8 = (text: string) => new TextEncoder().encode(text)

describe('decodeText', () => {
	// What a browser makes of a `responseType: 'text'` response, which the
	// comparison used before it kept the bytes
	it('reads UTF-8', () => {
		expect(decodeText(utf8('# Café ✓'), 'text/markdown;charset=UTF-8')).toBe('# Café ✓')
		expect(decodeText(utf8('# Café'))).toBe('# Café')
	})

	it('drops a UTF-8 byte order mark', () => {
		expect(decodeText(bytes(0xEF, 0xBB, 0xBF, ...utf8('# A')), 'text/markdown;charset=UTF-8')).toBe('# A')
	})

	it('lets a UTF-16 byte order mark win over the charset', () => {
		expect(decodeText(bytes(0xFF, 0xFE, 0x23, 0x00, 0x20, 0x00, 0x41, 0x00), 'text/markdown;charset=UTF-8')).toBe('# A')
		expect(decodeText(bytes(0xFE, 0xFF, 0x00, 0x23, 0x00, 0x20, 0x00, 0x41))).toBe('# A')
	})

	it('replaces what is not UTF-8', () => {
		expect(decodeText(bytes(0x23, 0x20, 0x63, 0x61, 0x66, 0xE9), 'text/markdown;charset=UTF-8')).toBe('# caf�')
	})

	it('follows another charset, and falls back on an unknown one', () => {
		expect(decodeText(bytes(0x63, 0x61, 0x66, 0xE9), 'text/plain; charset=windows-1252')).toBe('café')
		expect(decodeText(utf8('é'), 'text/plain; charset=nonsense')).toBe('é')
	})
})

describe('loadText', () => {
	it('fingerprints the bytes as the server does', () => {
		const content = utf8('﻿# Plan\n\nThe pilot runs 2 weeks.\n')
		const loaded = loadText(content.buffer, { 'content-type': 'text/markdown;charset=UTF-8', 'last-modified': 'Mon, 07 Aug 2023 15:01:41 GMT' })

		expect(loaded.sha256).toBe(createHash('sha256').update(content).digest('hex'))
		expect(loaded.text).toBe('# Plan\n\nThe pilot runs 2 weeks.\n')
		expect(loaded.utf8).toBe(true)
		expect(loaded.modified).toBe(1691420501)
	})

	it('knows when the bytes are not UTF-8', () => {
		expect(loadText(bytes(0x63, 0x61, 0x66, 0xE9).buffer).utf8).toBe(false)
		expect(loadText(bytes(0xFF, 0xFE, 0x23, 0x00).buffer).utf8).toBe(false)
		expect(loadText(bytes().buffer).modified).toBeUndefined()
	})
})

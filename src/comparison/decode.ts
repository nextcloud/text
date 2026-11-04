/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { digest } from 'lib0/hash/sha256'

/** What the comparison knows of one end beyond its text */
export interface LoadedText {
	text: string
	/** Hex SHA-256 of the raw bytes, as the server computes it */
	sha256: string
	/** Whether the bytes are valid UTF-8, the only encoding summaries take */
	utf8: boolean
	/** When the server last changed it, in seconds, if it said */
	modified?: number
}

/**
 * Read a fetched file the way a browser reads a text response: a byte order
 * mark decides the encoding, then the charset of the response, then UTF-8.
 *
 * @param bytes The raw bytes.
 * @param contentType The `Content-Type` of the response.
 */
export function decodeText(bytes: Uint8Array, contentType?: string): string {
	const boms: [number[], string][] = [[[0xEF, 0xBB, 0xBF], 'utf-8'], [[0xFE, 0xFF], 'utf-16be'], [[0xFF, 0xFE], 'utf-16le']]
	for (const [bom, encoding] of boms) {
		if (bom.every((byte, i) => bytes[i] === byte)) {
			return new TextDecoder(encoding, { ignoreBOM: true }).decode(bytes.subarray(bom.length))
		}
	}
	const charset = contentType?.match(/charset=["']?([^;"'\s]+)/i)?.[1]
	try {
		return new TextDecoder(charset ?? 'utf-8', { ignoreBOM: true }).decode(bytes)
	} catch {
		// An unknown label
		return new TextDecoder('utf-8', { ignoreBOM: true }).decode(bytes)
	}
}

/**
 * The text of a fetched file and what identifies it.
 *
 * @param buffer The raw response.
 * @param headers The response headers.
 */
export function loadText(buffer: ArrayBuffer, headers: Record<string, unknown> = {}): LoadedText {
	const bytes = new Uint8Array(buffer)
	let utf8 = true
	try {
		new TextDecoder('utf-8', { fatal: true }).decode(bytes)
	} catch {
		utf8 = false
	}
	const lastModified = Date.parse(String(headers['last-modified'] ?? ''))
	return {
		text: decodeText(bytes, headers['content-type'] as string | undefined),
		sha256: Array.from(digest(bytes), (byte) => byte.toString(16).padStart(2, '0')).join(''),
		utf8,
		modified: Number.isNaN(lastModified) ? undefined : lastModified / 1000,
	}
}

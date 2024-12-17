/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/*
 * This helper provides Base64 encoding and decoding for ArrayBuffers.
 *
 * We use lib0/buffer for now as it's a dependency of y.js
 * and does not add new dependencies.
 *
 */

import { toBase64, fromBase64 } from 'lib0/buffer'

/**
 *
 * @param {ArrayBuffer} data - binary data to encode
 */
export function encodeArrayBuffer(data: ArrayBuffer): string {
	const view = new Uint8Array(data)
	return toBase64(view)
}

/**
 *
 * @param {string} encoded - base64 encoded string to decode
 */
export function decodeArrayBuffer(encoded: string): Uint8Array {
	return fromBase64(encoded)
}

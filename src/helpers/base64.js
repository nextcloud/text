/*
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
export function encodeArrayBuffer(data) {
	const view = new Uint8Array(data)
	return toBase64(view)
}

/**
 *
 * @param {string} encoded - base64 encoded string to decode
 */
export function decodeArrayBuffer(encoded) {
	return fromBase64(encoded)
}

/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
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

import { encodeArrayBuffer, decodeArrayBuffer } from '../helpers/base64.js'
import { Doc, encodeStateAsUpdate, applyUpdate } from 'yjs'

/**
 *
 * @param {Doc} ydoc - encode state of this doc
 */
export function getDocumentState(ydoc) {
	const update = encodeStateAsUpdate(ydoc)
	return encodeArrayBuffer(update)
}

/**
 *
 * @param {Doc} ydoc - apply state to this doc
 * @param {string} documentState - base64 encoded doc state
 */
export function applyDocumentState(ydoc, documentState) {
	const update = decodeArrayBuffer(documentState)
	applyUpdate(ydoc, update)
}

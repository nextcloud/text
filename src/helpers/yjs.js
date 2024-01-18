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
 * Get Document state encode as base64.
 *
 * Used to store yjs state on the server.
 * @param {Y.Doc} ydoc - encode state of this doc
 * @return {string}
 */
export function getDocumentState(ydoc) {
	const update = Y.encodeStateAsUpdate(ydoc)
	return encodeArrayBuffer(update)
}

/**
 *
 * @param {Y.Doc} ydoc - apply state to this doc
 * @param {string} documentState - base64 encoded doc state
 * @param {object} origin - initiator object e.g. WebsocketProvider
 */
export function applyDocumentState(ydoc, documentState, origin) {
	const update = decodeArrayBuffer(documentState)
	Y.applyUpdate(ydoc, update, origin)
}

/**
 * Update message for everything in ydoc that is not in encodedBaseUpdate
 *
 * @param {Y.Doc} ydoc - encode state of this doc
 * @param {string} encodedBaseUpdate - base64 encoded doc update to build upon
 * @return {string|undefined}
 */
export function getUpdateMessage(ydoc, encodedBaseUpdate) {
	const baseUpdate = decodeArrayBuffer(encodedBaseUpdate)
	const baseStateVector = Y.encodeStateVectorFromUpdate(baseUpdate)
	const docStateVector = Y.encodeStateVector(ydoc)
	if (sameState(baseStateVector, docStateVector)) {
		// no additional state in the ydoc - early return
		return
	}
	const encoder = encoding.createEncoder()
	encoding.writeVarUint(encoder, messageSync)
	const update = Y.encodeStateAsUpdate(ydoc, baseStateVector)
	syncProtocol.writeUpdate(encoder, update)
	const buf = encoding.toUint8Array(encoder)
	return encodeArrayBuffer(buf)
}

/**
 * Apply an updated message to the ydoc.
 *
 * Only used in tests right now.
 * @param {Y.Doc} ydoc - encode state of this doc
 * @param {string} updateMessage - base64 encoded y-websocket sync message with update
 * @param {object} origin - initiator object e.g. WebsocketProvider
 */
export function applyUpdateMessage(ydoc, updateMessage, origin = 'origin') {
	const updateBuffer = decodeArrayBuffer(updateMessage)
	const decoder = decoding.createDecoder(updateBuffer)
	const messageType = decoding.readVarUint(decoder)
	if (messageType !== messageSync) {
		console.error('y.js update message with invalid type', messageType)
		return
	}
	// There are no responses to updates - so this is a dummy.
	const encoder = encoding.createEncoder()
	syncProtocol.readSyncMessage(
		decoder,
		encoder,
		ydoc,
		origin,
	)
}

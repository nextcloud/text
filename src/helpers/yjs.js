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
import * as decoding from 'lib0/decoding.js'

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
 * @param {object} origin - initiator object e.g. WebsocketProvider
 */
export function applyDocumentState(ydoc, documentState, origin) {
	const update = decodeArrayBuffer(documentState)
	applyUpdate(ydoc, update, origin)
}

/**
 * Log y.js messages with their type and initiator call stack
 *
 * @param {string} step - Y.js message
 */
export function logStep(step) {
	// Create error for stack trace
	const err = new Error()

	const decoder = decoding.createDecoder(step)

	const messageType = decoding.readVarUint(decoder)
	const subType = decoding.readVarUint(decoder)

	const encodedStep = encodeArrayBuffer(step)
	switch (messageType) {
	case 0:
		console.debug('y.js message sync', subType, encodedStep, err.stack)
		break
	case 3:
		console.debug('y.js message awareness_query', encodedStep, err.stack)
		break
	case 1:
		console.debug('y.js message awareness', encodedStep, err.stack)
		break
	}
}

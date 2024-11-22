/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { encodeArrayBuffer, decodeArrayBuffer } from '../helpers/base64.ts'
import * as Y from 'yjs'
import * as decoding from 'lib0/decoding.js'
import * as encoding from 'lib0/encoding.js'
import * as syncProtocol from 'y-protocols/sync'
import { messageSync } from '../services/y-websocket.js'

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
 * Create a step from a document state
 * i.e. create a sync protocol update message from it
 * and encode it and wrap it in a step data structure.
 *
 * @param {string} documentState - base64 encoded doc state
 * @return {string} base64 encoded yjs sync protocol update message
 */
export function documentStateToStep(documentState) {
	const message = documentStateToUpdateMessage(documentState)
	return { step: encodeArrayBuffer(message) }
}

/**
 * Create an update message from a document state
 * i.e. decode the base64 encoded yjs update
 * and create a sync protocol update message from it
 *
 * @param {string} documentState - base64 encoded doc state
 * @return {Uint8Array}
 */
function documentStateToUpdateMessage(documentState) {
	const update = decodeArrayBuffer(documentState)
	const encoder = encoding.createEncoder()
	encoding.writeVarUint(encoder, messageSync)
	syncProtocol.writeUpdate(encoder, update)
	return encoding.toUint8Array(encoder)
}

/**
 * Apply a step to the ydoc.
 *
 * Only used in tests right now.
 * @param {Y.Doc} ydoc - encode state of this doc
 * @param {string} step - base64 encoded yjs sync update message
 * @param {object} origin - initiator object e.g. WebsocketProvider
 */
export function applyStep(ydoc, step, origin = 'origin') {
	const updateMessage = decodeArrayBuffer(step.step)
	const decoder = decoding.createDecoder(updateMessage)
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

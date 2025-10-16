/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import * as decoding from 'lib0/decoding.js'
import * as encoding from 'lib0/encoding.js'
import * as syncProtocol from 'y-protocols/sync'
import * as Y from 'yjs'
import type { Step } from '../services/SyncService'
import { messageSync } from '../services/y-websocket.js'
import { decodeArrayBuffer, encodeArrayBuffer } from './base64'

/**
 * Get Document state encode as base64.
 *
 * Used to store yjs state on the server.
 * @param ydoc - encode state of this doc
 */
export function getDocumentState(ydoc: Y.Doc): string {
	const update = Y.encodeStateAsUpdate(ydoc)
	return encodeArrayBuffer(update)
}

/**
 *
 * @param ydoc - apply state to this doc
 * @param documentState - base64 encoded doc state
 * @param origin - initiator object e.g. WebsocketProvider
 */
export function applyDocumentState(
	ydoc: Y.Doc,
	documentState: string,
	origin: object,
) {
	const update = decodeArrayBuffer(documentState)
	Y.applyUpdate(ydoc, update, origin)
}

/**
 * Create a step from a document state
 * i.e. create a sync protocol update message from it
 * and encode it and wrap it in a step data structure.
 *
 * @param documentState - base64 encoded doc state
 * @param version - last saved version for the document state
 * @return base64 encoded yjs sync protocol update message and version
 */
export function documentStateToStep(documentState: string, version: number): Step {
	const message = documentStateToUpdateMessage(documentState)
	return { data: [encodeArrayBuffer(message)], sessionId: 0, version }
}

/**
 * Create a message from a document state
 * i.e. decode the base64 encoded yjs update
 * and create a sync protocol update message from it
 *
 * @param documentState - base64 encoded doc state
 */
function documentStateToUpdateMessage(documentState: string): Uint8Array {
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
 * @param ydoc - encode state of this doc
 * @param step - step data
 * @param step.data - array of base64 encoded yjs sync update messages
 * @param origin - initiator object e.g. WebsocketProvider
 */
export function applyStep(ydoc: Y.Doc, step: Step, origin = 'origin') {
	for (const encoded of step.data) {
		const updateMessage = decodeArrayBuffer(encoded)
		const decoder = decoding.createDecoder(updateMessage)
		const messageType = decoding.readVarUint(decoder)
		if (messageType !== messageSync) {
			console.error('y.js update message with invalid type', messageType)
			return
		}
		// There are no responses to updates - so this is a dummy.
		const encoder = encoding.createEncoder()
		syncProtocol.readSyncMessage(decoder, encoder, ydoc, origin)
	}
}

/**
 * Log y.js messages with their type and initiator call stack
 *
 * @param step - Y.js message
 */
export function logStep(step: Uint8Array<ArrayBufferLike>) {
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

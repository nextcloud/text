/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { encodeArrayBuffer, decodeArrayBuffer } from '../helpers/base64.ts'
import * as Y from 'yjs'
import * as decoding from 'lib0/decoding.js'
import * as encoding from 'lib0/encoding.js'
import * as syncProtocol from 'y-protocols/sync'
import { messageSync } from 'y-websocket'

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
 * @return {Uint8Array|undefined}
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
	return encoding.toUint8Array(encoder)
}

/**
 * Apply an updated message to the ydoc.
 *
 * Only used in tests right now.
 * @param {Y.Doc} ydoc - update state of this doc
 * @param {Uint8Array} updateMessage - y-websocket sync message with update
 * @param {object} origin - initiator object e.g. WebsocketProvider
 */
export function applyUpdateMessage(ydoc, updateMessage, origin = 'origin') {
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

	// TODO: check if the update was applied
	// by checking if the state vector of the update
	// is included in the state vector of the doc after the update
}

/**
 * Get the steps for sending to the server
 *
 * @param {object[]} queue - queue for the outgoing steps
 */
export function getSteps(queue) {
	return queue.map(s => encodeArrayBuffer(s))
		.filter(s => s < 'AQ')
}

/**
 * Encode the latest awareness message for sending
 *
 * @param {object[]} queue - queue for the outgoing steps
 */
export function getAwareness(queue) {
	return queue.map(s => encodeArrayBuffer(s))
		.findLast(s => s > 'AQ') || ''
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

/**
 * Helper function to convert a state vector to a map
 *
 * Maps the client id to the clock of the client in question
 * @param {Uint8Array} stateVector - state vector to convert
 */
export function stateVectorToMap(stateVector) {
	const decoder = decoding.createDecoder(stateVector)
	const size = decoding.readVarUint(decoder)
	const map = new Map()
	while (decoding.hasContent(decoder)) {
		const client = decoding.readVarUint(decoder)
		const clock = decoding.readVarUint(decoder)
		map.set(client, clock)
	}
	return map
}

/**
 * Helper function to check if two state vectors have the same state
 * @param {Uint8Array} arr - state vector to compare
 * @param {Uint8Array} other - state vector to compare against
 */
function sameState(arr, other) {
	return arr.length === other.length
		&& arr.every((value, index) => other[index] === value)
}

/**
 * Helper function to check if one state vector is up to date with another
 * @param {Array} arr - state vector to compare
 * @param {Array} other - state vector to compare against
 */
function upToDate(arr, other) {
	// TODO: implement me
}

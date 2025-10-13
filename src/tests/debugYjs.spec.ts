/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Debugging an out of sync state from a recorded editing session.

import { describe, expect, it } from 'vitest'
import { decodeArrayBuffer } from '../helpers/base64'
import * as decoding from 'lib0/decoding'
import { messageYjsSyncStep1, messageYjsUpdate } from 'y-protocols/sync'
import { messageSync } from '../services/y-websocket.js'

// * Network traffic for the session *
// ( filtered by text/session/10069741 )
// only includes steps from Max

// push
const stepFromPushResponse = 'AAKyAgEBocjy5QqIEMShyPLlCo4Iocjy5QqPCAF0AaHI8uUKXQEEFQg3Al4BcAJ1CYIBAYUBAp0BAqkBE8oBAesBAfUBAvwBD60CAbICAroCAr8CA/ACAvMCBf8CAZMDErcDAbkDAb0DAcEDCekDBPEDAfsDAYYEDJwEDKkEAasEA74EAcUEAeMEAYkFAd8FAukFAfAFAv4FAZ8GAaUGAssGTpoHAeMHGooIBJAIBJgIAaMIA6sIAsgIAtQIBeoIAYYJAeMJAesJAfUJBPsJBIwKApkKCacKAq4KBMMKAsgKBeQKAugKA/QKBP0KAYQLD5gLAqsLA7sLBNgLAusLAYgMApgMAqoMA8wMAcANBMUNAuUNFPsNAoYOAYgOApsOAbkOAdAOAe0OAvUOAoUPAbsPAs8PBA=='
// empty sync
// empty sync
// save
// sync
const firstStepFromSyncAfterSave = 'AALHAgECocjy5QqJEIehyPLlCssOAwhsaXN0SXRlbQcAocjy5QqJEAMJcGFyYWdyYXBoAaHI8uUKXQEEFQg3Al4BcAJ1CYIBAYUBAp0BAqkBE8oBAesBAfUBAvwBD60CAbICAroCAr8CA/ACAvMCBf8CAZMDErcDAbkDAb0DAcEDCekDBPEDAfsDAYYEDJwEDKkEAasEA74EAcUEAeMEAYkFAd8FAukFAfAFAv4FAZ8GAaUGAssGTpoHAeMHGooIBJAIBJgIAaMIA6sIAsgIAtQIBeoIAYYJAeMJAesJAfUJBPsJBIwKApkKCacKAq4KBMMKAsgKBeQKAugKA/QKBP0KAYQLD5gLAqsLA7sLBNgLAusLAYgMApgMAqoMA8wMAcANBMUNAuUNFPsNAoYOAYgOApsOAbkOAdAOAe0OAvUOAoUPAbsPAs8PBA=='
// sync
const firstStepFromSyncBeforeQuery = 'AAK8AgEBocjy5Qr8EIShyPLlCvsQA3NpbgGhyPLlCmIBBBUINwJeAXACdQmCAQGFAQKdAQKpARPKAQHrAQH1AQL8AQ+tAgGyAgK6AgK/AgPwAgLzAgX/AgGTAxK3AwG5AwG9AwHBAwnpAwTxAwH7AwGGBAycBAypBAGrBAO+BAHFBAHjBAGJBQHfBQLpBQHwBQL+BQGfBgGlBgLLBk6aBwHjBxqKCASQCASYCAGjCAOrCALICALUCAXqCAGGCQHjCQHrCQH1CQT7CQSMCgKZCgmnCgKuCgTDCgLICgXkCgLoCgP0CgT9CgGECw+YCwKrCwO7CwTYCwLrCwGIDAKYDAKqDAPMDAHADQTFDQLlDRT7DQKGDgGIDgKbDgG5DgHQDgHtDgL1DgKFDwG7DwLPDwShEAGjEAGrEAK+EALyEAM='
// push query

describe('the query', () => {
	it('is base64 encoded', () => {
		const message = 'AAAQA6HI8uUKiRCJy4ShCjIAAQ=='
		const buf = decodeArrayBuffer(message)
		const decoder = decoding.createDecoder(buf)
		expect(decoding.readVarUint(decoder)).toBe(messageSync)
		expect(decoding.readVarUint(decoder)).toBe(messageYjsSyncStep1)
		expect(decoding.readVarUint(decoder)).toBe(16) // remaining bytes
		const stateVector = readStateVector({ restDecoder: decoder })
		expect(stateVector).toMatchInlineSnapshot(`
			Map {
			  2898043937 => 2057,
			  2753635721 => 50,
			  0 => 1,
			}
		`)

	})
})


describe('the first message of the sync that triggered the query', () => {
	it('has a higher clock than the query', () => {
		const buf = decodeArrayBuffer(firstStepFromSyncBeforeQuery)
		const decoder = decoding.createDecoder(buf)
		expect(decoding.readVarUint(decoder)).toBe(messageSync)
		expect(decoding.readVarUint(decoder)).toBe(messageYjsUpdate)
		expect(decoding.readVarUint(decoder)).toMatchInlineSnapshot(`316`) // remaining bytes
		// see readStructSet in yjs
		expect(decoding.readVarUint(decoder)).toBe(1) // one client
		expect(decoding.readVarUint(decoder)).toBe(1) // one struct
		expect(decoding.readVarUint(decoder)).toBe(2898043937) // client id
		expect(decoding.readVarUint(decoder)).toBe(2172) // client clock
	})
})

describe('the first message of the previous sync', () => {
	it('also has a higher clock than the query', () => {
		const buf = decodeArrayBuffer(firstStepFromSyncAfterSave)
		const decoder = decoding.createDecoder(buf)
		expect(decoding.readVarUint(decoder)).toBe(messageSync)
		expect(decoding.readVarUint(decoder)).toBe(messageYjsUpdate)
		expect(decoding.readVarUint(decoder)).toMatchInlineSnapshot(`327`) // remaining bytes
		// see readStructSet in yjs
		expect(decoding.readVarUint(decoder)).toBe(1) // one client
		expect(decoding.readVarUint(decoder)).toBe(2) // four structs
		expect(decoding.readVarUint(decoder)).toBe(2898043937) // client id
		expect(decoding.readVarUint(decoder)).toBe(2057) // client clock
	})
})

describe('the last step from max before the save', () => {
	it('has a clock one lower than the query', () => {
		const buf = decodeArrayBuffer(stepFromPushResponse)
		const decoder = decoding.createDecoder(buf)
		expect(decoding.readVarUint(decoder)).toBe(messageSync)
		expect(decoding.readVarUint(decoder)).toBe(messageYjsUpdate)
		expect(decoding.readVarUint(decoder)).toMatchInlineSnapshot(`306`) // remaining bytes
		// see readStructSet in yjs
		expect(decoding.readVarUint(decoder)).toBe(1) // one client
		expect(decoding.readVarUint(decoder)).toBe(1) // one struct
		expect(decoding.readVarUint(decoder)).toBe(2898043937) // client id
		expect(decoding.readVarUint(decoder)).toBe(2056) // client clock
	})
})

// Taken from yjs/src/utils/encoding.js

/**
 * Read state vector from Decoder and return as Map
 *
 * @param {DSDecoderV1 | DSDecoderV2} decoder
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */
export const readStateVector = decoder => {
  const ss = new Map()
  const ssLength = decoding.readVarUint(decoder.restDecoder)
  for (let i = 0; i < ssLength; i++) {
    const client = decoding.readVarUint(decoder.restDecoder)
    const clock = decoding.readVarUint(decoder.restDecoder)
    ss.set(client, clock)
  }
  return ss
}


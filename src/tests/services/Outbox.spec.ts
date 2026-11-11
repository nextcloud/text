/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import Outbox from '../../services/Outbox.ts'

// sync messages with yjs updates
const update = new Uint8Array([0, 2, 2, 0, 0])
const otherUpdate = new Uint8Array([0, 2, 2, 0, 1])
// sync step 1 message
const query = new Uint8Array([0, 0, 1, 0])
// awareness message
const awareness = new Uint8Array([1, 0])

describe('Outbox', () => {
	it('notifies when it gets an update and when the update was sent', () => {
		const onChange = vi.fn()
		const outbox = new Outbox({ onChange })
		outbox.storeStep(update)
		outbox.storeStep(otherUpdate)
		expect(onChange).toHaveBeenCalledExactlyOnceWith(true)
		outbox.clearSentData(outbox.getDataToSend())
		expect(onChange).toHaveBeenLastCalledWith(false)
		expect(onChange).toHaveBeenCalledTimes(2)
	})

	it('does not notify for sync queries and awareness', () => {
		const onChange = vi.fn()
		const outbox = new Outbox({ onChange })
		outbox.storeStep(query)
		outbox.storeStep(awareness)
		outbox.clearSentData(outbox.getDataToSend())
		expect(onChange).not.toHaveBeenCalled()
	})

	it('keeps the update that arrived while sending', () => {
		const onChange = vi.fn()
		const outbox = new Outbox({ onChange })
		outbox.storeStep(update)
		const sendable = outbox.getDataToSend()
		outbox.storeStep(otherUpdate)
		outbox.clearSentData(sendable)
		expect(onChange).toHaveBeenCalledExactlyOnceWith(true)
		expect(outbox.hasUpdate).toBe(true)
	})
})

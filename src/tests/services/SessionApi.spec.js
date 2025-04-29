/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, it, vi, expect } from 'vitest'
import axios from '@nextcloud/axios'
import SessionApi, { Connection } from '../../services/SessionApi.js'

vi.mock('@nextcloud/axios', () => {
	const put = vi.fn()
	return { default: { put } }
})

describe('Session api', () => {
	it('opens a connection', async () => {
		const api = new SessionApi()
		axios.put.mockResolvedValue({ data: { hasOwner: true } })
		const connection = await api.open({ fileId: 123, baseBersionEtag: 'abc' })
		expect(connection).toBeInstanceOf(Connection)
		expect(connection.isClosed).toBe(false)
		expect(connection.hasOwner).toBe(true)
	})
})


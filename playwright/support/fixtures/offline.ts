/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base, type CDPSession } from '@playwright/test'

interface OfflineFixture {
	setOffline: () => Promise<void>
	setOnline: () => Promise<void>
}

const setClientOnline = async (client: CDPSession): Promise<void> => {
	await client.send('Network.emulateNetworkConditions', {
		offline: false,
		latency: 0,
		downloadThroughput: -1,
		uploadThroughput: -1,
	})
	await client.send('Network.disable')
}

const setClientOffline = async (client: CDPSession): Promise<void> => {
	await client.send('Network.enable')
	await client.send('Network.emulateNetworkConditions', {
		offline: true,
		latency: 0,
		downloadThroughput: 0,
		uploadThroughput: 0,
	})
}

/**
 * setOffline will turn the network off for the rest of the test and then on again.
 */
export const test = base.extend<OfflineFixture>({
	setOffline: async ({ context, page }, use) => {
		const client = await context.newCDPSession(page)
		await use (() => setClientOffline(client))
		await setClientOnline(client)
	},
	setOnline: async ({ context, page }, use) => {
		const client = await context.newCDPSession(page)
		await use (() => setClientOnline(client))
	},
})

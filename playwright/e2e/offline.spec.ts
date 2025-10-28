/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type CDPSession, expect, mergeTests } from '@playwright/test'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(randomUserTest, uploadFileTest)

const setOnline = async (client: CDPSession, online: boolean): Promise<void> => {
	if (online) {
		await client.send('Network.emulateNetworkConditions', {
			offline: false,
			latency: 0,
			downloadThroughput: -1,
			uploadThroughput: -1,
		})
		await client.send('Network.disable')
	} else {
		await client.send('Network.enable')
		await client.send('Network.emulateNetworkConditions', {
			offline: true,
			latency: 0,
			downloadThroughput: 0,
			uploadThroughput: 0,
		})
	}
}

test.beforeEach(async ({ page, file }) => {
	await page.goto(`f/${file.fileId}`)
})

test.describe('Offline', () => {
	test('Offline state indicator', async ({ context, page }) => {
		await expect(page.locator('.session-list')).toBeVisible()
		await expect(page.locator('.offline-state')).not.toBeVisible()

		const client = await context.newCDPSession(page)
		await setOnline(client, false)

		await expect(page.locator('.session-list')).not.toBeVisible()
		await expect(page.locator('.offline-state')).toBeVisible()

		await setOnline(client, true)
	})

	test('Disabled upload and link file when offline', async ({ context, page }) => {
		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-link-file"] button'),
		).toBeEnabled()
		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-attachment"] button'),
		).toBeEnabled()

		const client = await context.newCDPSession(page)
		await setOnline(client, false)

		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-link-file"] button'),
		).toBeDisabled()
		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-attachment"] button'),
		).toBeDisabled()

		await setOnline(client, true)
	})
})

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as offlineTest } from '../support/fixtures/offline'
import { test as randomUserTest } from '../support/fixtures/random-user'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(offlineTest, randomUserTest, uploadFileTest)

test.beforeEach(async ({ page, file }) => {
	await page.goto(`f/${file.id}`)
})

test.describe('Offline', () => {
	test('Offline state indicator', async ({ page, setOffline }) => {
		await expect(page.locator('.session-list')).toBeVisible()
		await expect(page.locator('.offline-state')).not.toBeVisible()

		await setOffline()

		await expect(page.locator('.session-list')).not.toBeVisible()
		await expect(page.locator('.offline-state')).toBeVisible()
	})

	test('Disabled upload and link file when offline', async ({ page, setOffline }) => {
		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-link-file"] button'),
		).toBeEnabled()
		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-attachment"] button'),
		).toBeEnabled()

		await setOffline()

		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-link-file"] button'),
		).toBeDisabled()
		await page.locator('[data-text-action-entry="insert-link"]').click()
		await expect(
			page.locator('[data-text-action-entry="insert-attachment"] button'),
		).toBeDisabled()
	})
})

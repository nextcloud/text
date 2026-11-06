/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Page } from '@playwright/test'

import { expect, mergeTests } from '@playwright/test'
import { test as randomUserTest } from '../support/fixtures/random-user.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(randomUserTest, uploadFileTest)

// Choose another version for one end of the open comparison
async function choose(page: Page, end: 'from' | 'to', index: number) {
	await page.locator(`[data-comparison-picker="${end}"]`).getByRole('button').click()
	await page.getByRole('menuitemradio').nth(index).click()
}

const before = (page: Page) => page.getByRole('article', { name: 'Before' })
const after = (page: Page) => page.getByRole('article', { name: 'After' })

test.describe('Changing the versions compared', () => {
	test.use({
		fileName: 'picker.md',
		fileContent: '# V3',
		oldVersions: [
			[
				{ content: '# V1', mtime: 1691420501 },
				{ content: '# V2', mtime: 1691424242 },
			],
			{ scope: 'test' },
		],
	})

	test('changes either end in Files, side by side and in the list of changes', async ({ open, page, viewer }) => {
		await open()
		const versions = await viewer.openSidebarTab('Versions')
		await versions.getByRole('button').nth(2).click()
		await page.getByRole('menuitem', { name: 'Compare to current version' }).click()
		await expect(before(page).getByRole('heading', { name: 'V1' })).toBeVisible()

		// The older end: V2 instead of V1, slow to load, and the keyboard still comes back
		await page.route('**/remote.php/dav/versions/**', async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 2500))
			await route.continue()
		})
		await choose(page, 'from', 1)
		await expect(before(page).getByRole('heading', { name: 'V2' })).toBeVisible()
		await expect(after(page).getByRole('heading', { name: 'V3' })).toBeVisible()
		await expect(page.locator('[data-comparison-picker="from"]').getByRole('button')).toBeFocused()
		await expect(page.locator('[aria-live]').filter({ hasText: 'Comparing' })).toHaveText(/^Comparing .* with the current version$/)
		await page.unroute('**/remote.php/dav/versions/**')

		// The newer end can only be newer than the older one
		await page.locator('[data-comparison-picker="to"]').getByRole('button').click()
		await expect(page.getByRole('menuitemradio').nth(1)).toBeDisabled()
		await expect(page.getByRole('menuitemradio').nth(2)).toBeDisabled()
		await page.locator('[data-comparison-picker="to"]').getByRole('button').click()

		// The list of changes stays the view when the older end changes again
		await page.keyboard.press('d')
		await expect(page.locator('[data-comparison-select]')).toHaveCount(1)
		await choose(page, 'from', 2)
		await expect(page.locator('[data-comparison-select] del')).toHaveText('1')
		await expect(before(page)).toHaveCount(0)

		// The newer end: V2 instead of the current file
		await choose(page, 'to', 1)
		await expect(page.locator('[data-comparison-select] ins')).toHaveText('2')
		await expect(page.locator('[data-comparison-picker="to"]').getByRole('button')).toBeFocused()
	})

	test('fits a narrow window', async ({ open, page, viewer }) => {
		await open()
		const versions = await viewer.openSidebarTab('Versions')
		await versions.getByRole('button').nth(2).click()
		await page.getByRole('menuitem', { name: 'Compare to current version' }).click()
		await page.keyboard.press('d')
		await page.setViewportSize({ width: 600, height: 800 })

		const header = page.locator('.text-comparison__header')
		await expect(header.locator('[data-comparison-picker]')).toHaveCount(2)
		const { scrollWidth, clientWidth } = await header.evaluate((el) => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }))
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
	})
})

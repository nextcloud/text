/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from './upload-file'
import { expect } from '@playwright/test'

export interface FolderDescriptionFixture {
	fileName: string
	open: () => Promise<void>
}

/**
 * This test fixture creates a Readme.md in the user's root directory
 * Note: You can use the config options of upload-file (`fileContent`, `oldVersions`)
 *   except for the `fileName`, which is hardcoded to `Readme.md`.
 */
export const test = base.extend<FolderDescriptionFixture>({
	// eslint-disable-next-line no-empty-pattern
	fileName: ({ }, use) => use('Readme.md'),

	open: ({ file, page }, use) => use(async () => {
		// Make sure file is initialized.
		expect(file.name).toBe('Readme.md')
		await page.goto('/apps/files')
	}),

})

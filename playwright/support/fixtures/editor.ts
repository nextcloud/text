/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as baseTest } from '@playwright/test'
import { EditorSection } from '../sections/EditorSection'

interface EditorFixture {
	editor: EditorSection
}

export const test = baseTest.extend<EditorFixture>({
	editor: async ({ page }, use) => {
		const editor = new EditorSection(page)
		await use(editor)
	},
})

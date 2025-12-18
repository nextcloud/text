/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

type AxeFixture = {
	makeAxeBuilder: () => AxeBuilder
}

export const test = base.extend<AxeFixture>({
	makeAxeBuilder: async ({ page }, use) => {
		const makeAxeBuilder = () => new AxeBuilder({ page })
			// Test against WCAG 2.0 and 2.1 Level A and AA
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])

			// Use legacy mode for compatibility with custom Playwright fixtures
			// See: https://github.com/dequelabs/axe-core-npm/blob/develop/packages/playwright/error-handling.md
			.setLegacyMode()

			// TODO: Fix these accessibility issues in the application
			.exclude('input[data-cy-upload-picker-input]') // Upload input needs proper label

		await use(makeAxeBuilder)
	},
})

export { expect } from '@playwright/test'

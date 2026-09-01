/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { test as base } from '@playwright/test'
import { ComparisonHarness } from './support/comparisonHarness.ts'

interface ComparisonFixtures {
	comparison: ComparisonHarness
}

export const test = base.extend<ComparisonFixtures>({
	comparison: async ({ page }, use, testInfo) => {
		const comparison = new ComparisonHarness(page)
		try {
			await comparison.open()
			await use(comparison)
		} finally {
			await comparison.attachEvidence(testInfo)
			comparison.assertNoUnexpectedFailures()
		}
	},
})

export { expect } from '@playwright/test'

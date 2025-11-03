/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class EditorSection {
	public readonly locator: Locator
	public readonly contentLocator: Locator

	// eslint-disable-next-line no-useless-constructor
	constructor(public readonly page: Page) {
		this.locator = this.page.locator('.editor').first()
		this.contentLocator = this.locator.getByRole('textbox')
	}

	public async typeHeading(name: string): Promise<void> {
		await this.contentLocator.pressSequentially('## ')
		await this.contentLocator.pressSequentially(name)
		await expect(this.getHeading({ name }))
			.toBeVisible()
	}

	public getHeading(options: {} = {}): Locator {
		return this.contentLocator.getByRole('heading', options)
	}
}

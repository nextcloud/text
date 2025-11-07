/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class EditorSection {
	public readonly locator: Locator
	public readonly content: Locator
	public readonly sessionList: Locator
	public readonly offlineState: Locator
	public readonly saveIndicator: Locator

	// eslint-disable-next-line no-useless-constructor
	constructor(public readonly page: Page) {
		this.locator = this.page.locator('.editor').first()
		this.content = this.locator.getByRole('textbox')
		this.sessionList = this.locator.locator('.session-list')
		this.offlineState = this.locator.locator('.offline-state')
		this.saveIndicator = this.locator.locator('.save-status')
	}

	public async type(keys: string): Promise<void> {
		await this.content.pressSequentially(keys)
	}

	public async typeHeading(name: string): Promise<void> {
		await this.type('## ')
		await this.type(name)
		await expect(this.getHeading({ name })).toBeVisible()
	}

	public getMenu(name: string): Locator {
		return this.locator.locator(`[data-text-action-entry="${name}"] button`)
	}

	public async withOpenMenu(
		name: string,
		fn: () => Promise<unknown>,
	): Promise<void> {
		await this.getMenu(name).click() // open the menu
		await fn()
		await this.getMenu(name).click() // close the menu
	}

	public getHeading(options: object = {}): Locator {
		return this.content.getByRole('heading', options)
	}
}

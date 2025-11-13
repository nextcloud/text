/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class EditorSection {
	public readonly locator: Locator
	public readonly content: Locator
	public readonly formattingHelp: Locator
	public readonly offlineState: Locator
	public readonly referencePicker: Locator
	public readonly referenceWidget: Locator
	public readonly saveIndicator: Locator
	public readonly sessionList: Locator
	public readonly suggestions: Locator

	// eslint-disable-next-line no-useless-constructor
	constructor(public readonly page: Page) {
		this.locator = this.page.locator('.editor').first()
		this.content = this.locator.getByRole('textbox')
		this.formattingHelp = this.page.getByRole('dialog', {
			name: 'Formatting and shortcuts',
		})
		this.offlineState = this.locator.locator('.offline-state')
		this.referencePicker = this.page.locator('.reference-picker input')
		this.referenceWidget = this.page.locator('.reference-widget')
		this.saveIndicator = this.locator.locator('.save-status')
		this.sessionList = this.locator.locator('.session-list')
		this.suggestions = this.page.locator('.tippy-box .suggestion-list')
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

	public async clickMenu(...names: string[]): Promise<void> {
		names.forEach(async (name) => {
			await this.getMenu(name).click()
		})
	}

	public async withOpenMenu(
		name: string,
		fn: () => Promise<unknown>,
	): Promise<void> {
		await this.getMenu(name).click() // open the menu
		await fn()
		await this.getMenu(name).click() // close the menu
	}

	getHeading = (options: object = {}) => this.content.getByRole('heading', options)
	getSuggestion = (name: string) => this.suggestions.getByText(name)
}

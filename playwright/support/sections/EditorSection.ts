/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'

export class EditorSection {
	public readonly el: Locator
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
		this.el = this.page.locator('.editor').first()
		this.content = this.el.getByRole('textbox')
		this.formattingHelp = this.page.getByRole('dialog', {
			name: 'Formatting and shortcuts',
		})
		this.offlineState = this.el.locator('.offline-state')
		this.referencePicker = this.page.locator('.reference-picker input')
		this.referenceWidget = this.page.locator('.reference-widget')
		this.saveIndicator = this.el.locator('.save-status')
		this.sessionList = this.el.locator('.session-list')
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
		return this.el.getByRole('button', { name })
	}

	public getMenuItem(name: string): Locator {
		return this.el.getByRole('menuitem', { name })
	}

	public async clickMenu(menu: string, item: string): Promise<void> {
		await this.getMenu(menu).click()
		await this.getMenuItem(item).click()
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

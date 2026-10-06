/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

export class ViewerSection {
	public readonly el: Locator

	constructor(
		fileName: string,
		public readonly page: Page,
	) {
		this.el = this.page.getByRole('dialog', { name: fileName })
	}

	public async openSidebarTab(name: 'Versions') {
		// A button in the viewer's header, not an entry of its menu
		await this.el.getByRole('button', { name: 'Open sidebar' }).click()
		await this.page.getByRole('tab', { name }).click()
		return this.page.getByRole('tabpanel', { name })
	}

	public async clickAction(name: string): Promise<void> {
		await this.el.getByLabel('Actions', { exact: true }).click()
		await this.page.getByRole('menuitem', { name }).click()
	}

	public async close(): Promise<void> {
		await this.el.getByRole('button', { name: 'Close', exact: true }).click()
		await this.page.waitForRequest(/close/)
		await expect(this.el).not.toBeVisible()
	}
}

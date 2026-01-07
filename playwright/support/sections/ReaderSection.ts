/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator, Page } from '@playwright/test'

/**
 * Section for the read only editor
 *
 * Currently used to test the other version in conflict dialogs
 */
export class ReaderSection {
	public readonly el: Locator
	public readonly content: Locator

	// eslint-disable-next-line no-useless-constructor
	constructor(public readonly page: Page) {
		this.el = this.page.locator('#read-only-editor').first()
		this.content = this.el.getByRole('textbox')
	}

	getHeading = (options: object = {}) => this.content.getByRole('heading', options)
}

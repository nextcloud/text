/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Locator, Page } from '@playwright/test'

/**
 * Container of the editor and possibly conflict dialog, reader for the other version etc.
 *
 * Currently used to test the other version in conflict dialogs
 */
export class ContainerSection {
	public readonly el: Locator

	// eslint-disable-next-line no-useless-constructor
	constructor(public readonly page: Page) {
		this.el = this.page.locator('#editor-container').first()
	}

	getButton = (options: object = {}) => this.el.getByRole('button', options)
}

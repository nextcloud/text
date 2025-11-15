/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type Page } from '@playwright/test'
import type { User as Account } from '@nextcloud/e2e-test-server'
import { uploadFile } from './File'

export class User {

	constructor(
		public readonly account: Account,
		public readonly page: Page,
	) {
	}

	get request() {
		return this.page.request
	}

	uploadFile(name: string, content: string) {
		return uploadFile(name, content, this)
	}

}

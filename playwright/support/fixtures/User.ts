/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User as Account } from '@nextcloud/e2e-test-server'
import type { Page } from '@playwright/test'

import { runExec } from '@nextcloud/e2e-test-server/docker'
import { uploadFile } from './Node.ts'

export class User {
	constructor(
		public readonly account: Account,
		public readonly page: Page,
	) {
	}

	get request() {
		return this.page.request
	}

	uploadFile(upload: Omit<Parameters<typeof uploadFile>[0], 'owner'>) {
		return uploadFile({ ...upload, owner: this })
	}

	/**
	 * Write a file directly to the user's storage on the server, bypassing Nextcloud
	 * like a change on external storage would.
	 *
	 * @param options options for the write
	 * @param options.name Name of the file
	 * @param options.content File content
	 */
	async writeFileOutsideNextcloud({ name, content }: { name: string, content: string }) {
		await runExec(
			['sh', '-c', 'printf "%s" "$CONTENT" > "data/$OWNER/files/$NAME"'],
			{ env: [`CONTENT=${content}`, `OWNER=${this.account.userId}`, `NAME=${name}`] },
		)
	}
}

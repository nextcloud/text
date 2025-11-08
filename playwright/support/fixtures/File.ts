/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, type Page } from '@playwright/test'

export class File {
	name: string
	page: Page
	requestToken: string
	id?: number

	constructor(name: string, page: Page, requestToken: string) {
		this.name = name
		this.page = page
		this.requestToken = requestToken
	}

	async upload(fileContent: string) {

		// Upload file via WebDAV using page.request with requesttoken header
		const response = await this.page.request.put(
			`/remote.php/webdav/${this.name}`,
			{
				data: fileContent,
				headers: {
					'Content-Type': 'text/markdown',
					'requesttoken': this.requestToken,
				},
			},
		)

		if (!response.ok()) {
			throw new Error(`Failed to upload file: ${response.status()} ${response.statusText()}`)
		}

		// Extract file ID from response headers
		const ocFileId = response.headers()['oc-fileid']
		const fileId = ocFileId ? Number(ocFileId.split('oc')?.[0]) : 0
		this.id = fileId
	}

	async open() {
		await this.page.goto(`f/${this.id}`)
		await expect(this.page.getByLabel(this.name, { exact: true }))
			.toBeVisible()
	}

	async close() {
		await this.page.getByRole('button', { name: 'Close', exact: true }).click()
		await this.page.waitForRequest(/close/)
		await expect(this.page.getByLabel(this.name, { exact: true }))
			.not.toBeVisible()
	}

	async move(newName: string) {
		await this.page.request.fetch(
			`/remote.php/webdav/${this.name}`,
			{
			headers: {
				Destination: `/remote.php/webdav/${newName}`,
				'requesttoken': this.requestToken,
			},
			method: 'MOVE',
		})
		this.name = newName
	}
}

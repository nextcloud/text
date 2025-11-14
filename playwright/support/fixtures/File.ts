/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, type Page } from '@playwright/test'
import type { User } from './User'

/**
 * Upload a file to the cloud.
 * @param name Name of the file
 * @param content File content
 * @param user User who uploads the file
 * @return the file
 */
export async function uploadFile(name: string, content: string, user: User) {
	// Upload file via WebDAV using page.request with requesttoken header
	const response = await user.request.put(
		`/remote.php/webdav/${name}`,
		{
			data: content,
			headers: {
				'Content-Type': 'text/markdown',
			},
		},
	)
	if (!response.ok()) {
		throw new Error(`Failed to upload file: ${response.status()} ${response.statusText()}`)
	}
	// Extract file ID from response headers
	const ocFileId = response.headers()['oc-fileid']
	const id = ocFileId ? Number(ocFileId.split('oc')?.[0]) : 0
	return new File({ id, name, page: user.page })
}

export class File {
	name: string
	page: Page
	id: number

	constructor({ id, name, page }: { id: number, name: string, page: Page }) {
		this.id = id
		this.name = name
		this.page = page
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
			},
			method: 'MOVE',
		})
		this.name = newName
	}
}

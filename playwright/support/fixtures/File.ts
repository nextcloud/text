/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type Page } from '@playwright/test'
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

	async shareLink() {
		// const shareType = window.OC?.Share?.SHARE_TYPE_LINK ?? 3
		const shareType = 3
		const response = await this.page.request.post(
			'/ocs/v2.php/apps/files_sharing/api/v1/shares',
			{
				data: {
					shareType,
					path: `/${this.name}`,
				},
				headers: {
					Accept: 'application/json, text/plain, */*'
				},
			})
		const { ocs } = await response.json() as { ocs: { data: { token: string } } }
		return ocs.data.token
	}
}

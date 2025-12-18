/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, type Page } from '@playwright/test'
import type { User } from './User'


/**
 * Upload a file to the cloud.
 * @param options options for the file upload
 * @param options.name Name of the file
 * @param options.content File content
 * @param options.owner User who uploads the file
 * @param options.mtime Last modified time of the file
 * @return the file
 */
export async function uploadFile({ name, content = '', owner, mtime }: {
	content?: string
	name: string
	owner: User
	mtime?: number
}) {
// Upload file via WebDAV using page.request with requesttoken header
	const headers = {
		'Content-Type': 'text/markdown',
		...(mtime ? { 'x-oc-mtime': mtime.toString() } : {}),
	}
	const response = await owner.request.put(
		`/remote.php/webdav/${name}`,
		{ data: content, headers },
	)
	if (!response.ok()) {
		throw new Error(`Failed to upload file: ${response.status()} ${response.statusText()}`)
	}
	// Extract file ID from response headers
	const ocFileId = response.headers()['oc-fileid']
	const id = ocFileId ? Number(ocFileId.split('oc')?.[0]) : 0
	return new Node({ id, name, page: owner.page })
}

/**
 * Create a folder in the cloud.
 * @param options options for the file upload
 * @param options.name Name of the file
 * @param options.owner User who uploads the file
 * @return the folder
 */
export async function createFolder({ name, owner }: {
	name: string
	owner: User
}) {
	const rootPath = `/remote.php/dav/files/${encodeURIComponent(owner.account.userId)}`
	const dirPath = name.split('/').map(encodeURIComponent).join('/')
	const response = await owner.request.fetch(
		`${rootPath}/${dirPath}`,
		{ method: 'MKCOL' },
	)
	const id = parseInt(response.headers()['oc-fileid'])
	return new Node({ id, name, page: owner.page })
}

const ocsHeaders = {
	Accept: 'application/json, text/plain, */*'
}

export class Node {
	public readonly id: number
	public readonly name: string
	private readonly page: Page

	constructor({ id, name, page }: { id: number, name: string, page: Page }) {
		this.id = id
		this.name = name
		this.page = page
	}

	async open() {
		// loading the file list may take a while
		const timeout = 10_000
		await this.page.goto(`f/${this.id}`)
		await expect(this.page.getByLabel(this.name, { exact: true }))
			.toBeVisible({ timeout })
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
		return new Node({ ...this, page: this.page, name: newName })
	}

	async shareLink() {
		// const shareType = window.OC?.Share?.SHARE_TYPE_LINK ?? 3
		const shareType = 3
		const path = `/${this.name}`
		const response = await this.page.request.post(
			'/ocs/v2.php/apps/files_sharing/api/v1/shares',
			{
				data: { shareType, path },
				headers: ocsHeaders,
			})
		const { ocs } = await response.json() as { ocs: { data: { token: string, id: number } } }
		return ocs.data
	}

	async shareEditableLink() {
		const { token, id } = await this.shareLink()
		// Same permissions makeing the share editable in the UI would set
		// 1 = read; 2 = write; 16 = share;
		const permissions = 19
		await this.page.request.put(
			`/ocs/v2.php/apps/files_sharing/api/v1/shares/${id}`,
			{
				data: { permissions },
				headers: ocsHeaders,
			})
		return { token, id }
	}

}

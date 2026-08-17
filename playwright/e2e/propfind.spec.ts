/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect } from '@playwright/test'
import { createFolder, uploadFile } from '../support/fixtures/Node'
import { test } from '../support/fixtures/random-user'
import { setTextSetting } from '../support/fixtures/settings'
import {
	deleteWebDAVResource,
	PROPERTY_WORKSPACE,
	PROPERTY_WORKSPACE_FILE,
	PROPERTY_WORKSPACE_FILE_FLAT,
	PROPERTY_WORKSPACE_FLAT,
	propfindFolder,
} from '../support/fixtures/webdav'

test.describe('Text PROPFIND extension', () => {
	test.describe('with workspaces enabled', () => {
		test.beforeEach(async ({ user }) => {
			await setTextSetting(user, 'workspace_enabled', 1)
		})

		test('always adds rich workspace property', async ({ page, user }) => {
			const properties = [
				PROPERTY_WORKSPACE_FLAT,
				PROPERTY_WORKSPACE_FILE_FLAT,
			]
			const fiveSecondsAgo = Math.floor(Date.now() / 1000) - 5

			await page.goto('/apps/dashboard')
			await user.uploadFile({
				name: 'Readme.md',
				content: '',
				mtime: fiveSecondsAgo,
			})

			const [root1] = await propfindFolder(user, '/', 0, properties)
			expect(root1).toHaveProperty(PROPERTY_WORKSPACE_FLAT, '')

			await user.uploadFile({ name: 'Readme.md', content: '## Hello world\n' })
			const [root2] = await propfindFolder(user, '/', 0, properties)
			expect(root2).toHaveProperty(PROPERTY_WORKSPACE_FLAT, '## Hello world\n')

			await deleteWebDAVResource(user, '/Readme.md')
			const [root3] = await propfindFolder(user, '/', 0, properties)
			expect(root3).toHaveProperty(PROPERTY_WORKSPACE_FLAT, '')
		})

		test('never adds rich workspace property to nested folders for flat properties', async ({
			page,
			user,
		}) => {
			const properties = [
				PROPERTY_WORKSPACE_FLAT,
				PROPERTY_WORKSPACE_FILE_FLAT,
			]

			await page.goto('/apps/dashboard')
			await createFolder({ name: 'workspace-flat', owner: user })

			const results1 = await propfindFolder(user, '/', 1, properties)
			const folder1 = results1.find((r) =>
				r['d:href']?.endsWith('/workspace-flat/'),
			)
			expect(folder1).toHaveProperty(PROPERTY_WORKSPACE_FLAT, '')

			await uploadFile({
				name: 'workspace-flat/Readme.md',
				content: '## Hello world\n',
				owner: user,
			})
			const results2 = await propfindFolder(user, '/', 1, properties)
			const folder2 = results2.find((r) =>
				r['d:href']?.endsWith('/workspace-flat/'),
			)
			expect(folder2).toHaveProperty(PROPERTY_WORKSPACE_FLAT, '')
		})

		// Android app relies on this to detect rich workspace availability in subfolders properly
		test('adds rich workspace property to nested folders for the default properties', async ({
			page,
			user,
		}) => {
			const properties = [PROPERTY_WORKSPACE, PROPERTY_WORKSPACE_FILE]

			await page.goto('/apps/dashboard')
			await createFolder({ name: 'workspace', owner: user })

			const results1 = await propfindFolder(user, '/', 1, properties)
			const folder1 = results1.find((r) =>
				r['d:href']?.endsWith('/workspace/'),
			)
			expect(folder1).toHaveProperty(PROPERTY_WORKSPACE, '')

			await uploadFile({
				name: 'workspace/Readme.md',
				content: '## Hello world\n',
				owner: user,
			})
			const results2 = await propfindFolder(user, '/', 1, properties)
			const folder2 = results2.find((r) =>
				r['d:href']?.endsWith('/workspace/'),
			)
			expect(folder2).toHaveProperty(PROPERTY_WORKSPACE, '## Hello world\n')
		})
	})

	test.describe('with workspaces disabled', () => {
		test.beforeEach(async ({ user }) => {
			await setTextSetting(user, 'workspace_enabled', 0)
		})

		test('does not return a rich workspace property', async ({ page, user }) => {
			await page.goto('/apps/dashboard')

			const results1 = await propfindFolder(user, '/', 1, [
				PROPERTY_WORKSPACE_FLAT,
				PROPERTY_WORKSPACE_FILE_FLAT,
			])
			for (const result of results1) {
				expect(result).not.toHaveProperty(PROPERTY_WORKSPACE_FLAT)
			}

			await user.uploadFile({ name: 'Readme.md', content: '## Hello world\n' })
			const results2 = await propfindFolder(user, '/', 1, [
				PROPERTY_WORKSPACE_FLAT,
				PROPERTY_WORKSPACE_FILE_FLAT,
			])
			for (const result of results2) {
				expect(result).not.toHaveProperty(PROPERTY_WORKSPACE_FLAT)
			}

			await createFolder({ name: 'without-workspace', owner: user })
			const results3 = await propfindFolder(user, '/', 1)
			const folder = results3.find((r) =>
				r['d:href']?.endsWith('/without-workspace/'),
			)
			expect(folder).not.toHaveProperty(PROPERTY_WORKSPACE)
		})
	})
})

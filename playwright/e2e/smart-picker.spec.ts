/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const test = mergeTests(editorTest, uploadFileTest)

test.beforeEach(async ({ open }) => {
	await open()
})

test('See top options', async ({ editor }) => {
	await editor.type('/')
	await expect(editor.getSuggestion('To-Do list')).toBeVisible()
})

test('Create heading', async ({ editor }) => {
	await editor.type('/Heading')
	await editor.content.press('Enter')
	await editor.type('Hello world')
	await editor.content.press('Enter')
	await expect(editor.getHeading({ name: 'Hello world' })).toBeVisible()
})

test('Insert Link', async ({ editor }) => {
	await editor.type('/Any')
	await editor.getSuggestion('Any link').click()
	await editor.referencePicker.fill('https://github.com')
	await expect(editor.referenceWidget).toContainText('GitHub')
	await editor.referencePicker.press('Enter')
	await expect(editor.content.getByRole('link')).toContainText('github.com')
})

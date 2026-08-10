/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

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

test('Files provider is renamed to "Link a file"', async ({ editor }) => {
	await editor.type('/')
	await expect(editor.getSuggestion('Link a file')).toBeVisible()
})

test('Important items appear before remaining items', async ({ editor }) => {
	await editor.type('/')
	await expect(editor.getSuggestion('To-Do list')).toBeVisible()
	const allTexts = await editor.suggestions
		.locator('.suggestion-list__item')
		.allTextContents()

	const todoIdx = allTexts.findIndex((t) => t.includes('To-Do list'))
	const tableIdx = allTexts.findIndex((t) => t.includes('Table'))
	const filesIdx = allTexts.findIndex((t) => t.includes('Link a file'))
	const heading1Idx = allTexts.findIndex((t) => t.includes('Heading 1'))

	expect(todoIdx).toBeLessThan(filesIdx)
	expect(todoIdx).toBeLessThan(heading1Idx)
	expect(tableIdx).toBeLessThan(filesIdx)
	expect(tableIdx).toBeLessThan(heading1Idx)
	expect(filesIdx).toBeLessThan(heading1Idx)
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { test as editorTest } from '../support/fixtures/editor.ts'
import { test as uploadFileTest } from '../support/fixtures/upload-file.ts'

const test = mergeTests(editorTest, uploadFileTest)

test.describe('renders comments from Markdown', () => {
	test.use({
		fileContent: 'The quick[^comment-1] brown fox.\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Comment by Jane\n',
	})

	test('shows reference from Markdown', async ({ editor, open }) => {
		await open()
		await expect(editor.getCommentReference('comment-1')).toBeVisible()
	})

	test('opens bubble with thread content on click', async ({ editor, open }) => {
		await open()
		await editor.getCommentReference('comment-1').click()
		await expect(editor.commentBubble).toBeVisible()
		await expect(editor.commentBubble).toContainText('Comment by Jane')
	})

	test('closes bubble when close button is clicked', async ({ editor, open }) => {
		await open()
		await editor.getCommentReference('comment-1').click()
		await expect(editor.commentBubble).toBeVisible()
		await editor.commentBubble.getByRole('button', { name: 'Close' }).click({ force: true })
		await expect(editor.commentBubble).not.toBeVisible()
	})
})

test('inserts comment via keyboard shortcut', async ({ editor, open }) => {
	await open()
	await editor.type('Some text')
	await editor.press('ControlOrMeta+Alt+m')
	await expect(editor.commentReferences.first()).toBeVisible()
	await expect(editor.commentBubble).toBeVisible()
})

test('inserts comment via [?] input rule', async ({ editor, open }) => {
	await open()
	await editor.type('hello[?]')
	await expect(editor.commentReferences.first()).toBeVisible()
	await expect(editor.commentBubble).toBeVisible()
})

test('adds a reply to a comment', async ({ editor, open }) => {
	await open()
	await editor.type('Test[?]')
	await expect(editor.commentBubble).toBeVisible()

	const composerInput = editor.commentBubble
		.locator('.comment-bubble__composer-input [contenteditable]')
	await composerInput.fill('My first reply')
	await editor.commentBubble.getByRole('button', { name: 'Reply' }).click()
	await expect(editor.commentBubble).toContainText('My first reply')
})

test('edits an existing comment', async ({ editor, open }) => {
	await open()
	await editor.type('Test[?]')
	await expect(editor.commentBubble).toBeVisible()

	// Submit initial reply
	const composerInput = editor.commentBubble
		.locator('.comment-bubble__composer-input [contenteditable]')
	await composerInput.fill('Original text')
	await editor.commentBubble.getByRole('button', { name: 'Reply' }).click()
	await expect(editor.commentBubble).toContainText('Original text')

	// Edit the reply
	await editor.commentBubble.getByRole('button', { name: 'Edit' }).click()
	const editInput = editor.commentBubble
		.locator('.comment-bubble__body-edit [contenteditable]')
	await editInput.clear()
	await editInput.fill('Updated text')
	await editor.commentBubble.getByRole('button', { name: 'Save' }).click()
	await expect(editor.commentBubble).toContainText('Updated text')
	await expect(editor.commentBubble).not.toContainText('Original text')
})

test.describe('deletes a comment reply', () => {
	test.use({
		fileContent: 'Test[^comment-1]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      First reply\n'
			+ '    - @[bob](mention://user/bob) *(2026-07-17T11:11Z)*\n'
			+ '      Second reply\n',
	})

	test('deletes one reply from a multi-reply thread', async ({ editor, open }) => {
		await open()
		await editor.getCommentReference('comment-1').click()
		await expect(editor.commentBubble).toContainText('First reply')
		await expect(editor.commentBubble).toContainText('Second reply')

		// Delete the first reply
		await editor.commentBubble.getByRole('button', { name: 'Delete' }).first().click()

		await expect(editor.commentBubble).not.toContainText('First reply')
		await expect(editor.commentBubble).toContainText('Second reply')

		// Reference still in the editor (thread still has one reply)
		await expect(editor.getCommentReference('comment-1')).toBeVisible()
	})
})

test.describe('deletes last comment reply', () => {
	test.use({
		fileContent: 'Test[^comment-1]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-16T13:12Z)*\n'
			+ '      Only reply\n',
	})

	test('removes reference when last reply is deleted', async ({ editor, open }) => {
		await open()
		await editor.getCommentReference('comment-1').click()
		await expect(editor.commentBubble).toContainText('Only reply')

		await editor.commentBubble.getByRole('button', { name: 'Delete' }).click()

		// Bubble should close and reference should be gone
		await expect(editor.commentBubble).not.toBeVisible()
		await expect(editor.commentReferences.first()).not.toBeVisible()
	})
})

test('hides and shows comment references via annotations toggle', async ({ editor, open }) => {
	await open()
	await editor.type('Test[?]')
	await expect(editor.commentReferences.first()).toBeVisible()

	await editor.clickMenu('Annotations', 'Hide annotations')
	await expect(editor.commentReferences.first()).toBeHidden()

	await editor.clickMenu('Annotations', 'Show annotations')
	await expect(editor.commentReferences.first()).toBeVisible()
})

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeTests } from '@playwright/test'
import { test as accessibilityTest, expect } from '../support/fixtures/accessibility'
import { test as editorTest } from '../support/fixtures/editor'
import { test as uploadFileTest } from '../support/fixtures/upload-file'
import {
	formatViolations,
	getAccessibilitySummary,
} from '../support/utils/accessibility'

const test = mergeTests(accessibilityTest, editorTest, uploadFileTest)

test.describe('Editor Accessibility', () => {
	test('should not have automatically detectable accessibility violations on the full page', async ({
		page,
		open,
		makeAxeBuilder,
	}, testInfo) => {
		await open()

		// Wait for the editor to be fully loaded
		await page.waitForSelector('.text-editor', { state: 'visible' })

		// Run the accessibility scan
		const accessibilityScanResults = await makeAxeBuilder().analyze()

		// Attach the full scan results for debugging
		await testInfo.attach('accessibility-scan-results', {
			body: JSON.stringify(accessibilityScanResults, null, 2),
			contentType: 'application/json',
		})

		// Attach a summary for quick overview
		const summary = getAccessibilitySummary(accessibilityScanResults)
		await testInfo.attach('accessibility-summary', {
			body: JSON.stringify(summary, null, 2),
			contentType: 'application/json',
		})

		// Expect no violations
		expect(
			accessibilityScanResults.violations,
			formatViolations(accessibilityScanResults),
		).toEqual([])
	})

	test('should not have accessibility violations in the editor content area', async ({
		page,
		open,
		makeAxeBuilder,
		editor,
	}, testInfo) => {
		await open()
		await editor.type('Test content')

		// Wait for the editor to be ready
		await page.waitForSelector('.text-editor', { state: 'visible' })

		// Scan only the editor content area
		const accessibilityScanResults = await makeAxeBuilder()
			.include('.text-editor')
			.analyze()

		await testInfo.attach('editor-content-scan-results', {
			body: JSON.stringify(accessibilityScanResults, null, 2),
			contentType: 'application/json',
		})

		expect(
			accessibilityScanResults.violations,
			formatViolations(accessibilityScanResults),
		).toEqual([])
	})

	test('should not have accessibility violations in the menu bar', async ({
		page,
		open,
		makeAxeBuilder,
	}, testInfo) => {
		await open()

		// Wait for the menu bar to be visible
		await page.waitForSelector('.text-menubar', { state: 'visible' })

		// Scan only the menu bar
		const accessibilityScanResults = await makeAxeBuilder()
			.include('.text-menubar')
			.analyze()

		await testInfo.attach('menubar-scan-results', {
			body: JSON.stringify(accessibilityScanResults, null, 2),
			contentType: 'application/json',
		})

		expect(
			accessibilityScanResults.violations,
			formatViolations(accessibilityScanResults),
		).toEqual([])
	})

	test('should have proper keyboard navigation support', async ({
		page,
		open,
		makeAxeBuilder,
	}, testInfo) => {
		await open()

		// Wait for the editor to be fully loaded
		await page.waitForSelector('.text-editor', { state: 'visible' })

		// Check for keyboard-specific accessibility issues
		const accessibilityScanResults = await makeAxeBuilder()
			// Focus on keyboard accessibility rules (WCAG only, not best-practice)
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.analyze()

		await testInfo.attach('keyboard-navigation-scan-results', {
			body: JSON.stringify(accessibilityScanResults, null, 2),
			contentType: 'application/json',
		})

		// Check that interactive elements are keyboard accessible
		expect(
			accessibilityScanResults.violations,
			formatViolations(accessibilityScanResults),
		).toEqual([])
	})

	test('should have proper ARIA labels on interactive elements', async ({
		page,
		open,
		makeAxeBuilder,
		editor,
	}, testInfo) => {
		await open()

		// Open a menu to check its accessibility
		const boldButton = editor.getMenu('Bold')
		await expect(boldButton).toBeVisible()

		// Wait for all menu items to be rendered
		await page.waitForSelector('[role="button"], button', { state: 'attached' })

		// Scan for ARIA-related issues
		const accessibilityScanResults = await makeAxeBuilder()
			.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
			.analyze()

		await testInfo.attach('aria-labels-scan-results', {
			body: JSON.stringify(accessibilityScanResults, null, 2),
			contentType: 'application/json',
		})

		expect(
			accessibilityScanResults.violations,
			formatViolations(accessibilityScanResults),
		).toEqual([])
	})

	test('should maintain accessibility after text formatting', async ({
		page,
		open,
		makeAxeBuilder,
		editor,
	}, testInfo) => {
		await open()

		// Type some text and format it
		await editor.type('Format me')
		const CtrlOrCmd = process.platform === 'darwin' ? 'Meta' : 'Control'
		await editor.content.press(CtrlOrCmd + '+a')
		await editor.getMenu('Bold').click()
		await editor.getMenu('Italic').click()

		// Wait for formatting to be applied
		await page.waitForSelector('strong', { state: 'attached' })
		await page.waitForSelector('em', { state: 'attached' })

		// Scan after formatting operations
		const accessibilityScanResults = await makeAxeBuilder()
			.include('.text-editor')
			.analyze()

		await testInfo.attach('formatted-content-scan-results', {
			body: JSON.stringify(accessibilityScanResults, null, 2),
			contentType: 'application/json',
		})

		expect(
			accessibilityScanResults.violations,
			formatViolations(accessibilityScanResults),
		).toEqual([])
	})
})

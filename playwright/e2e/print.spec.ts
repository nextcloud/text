/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, mergeTests } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { hostname } from 'node:os'
import { join } from 'node:path'
import { test as editorTest } from '../support/fixtures/editor'
import { loadFixture } from '../support/fixtures/loadFixture'
import { test as sharedFileTest } from '../support/fixtures/shared-file'
import { test as uploadFileTest } from '../support/fixtures/upload-file'

const fileTest = mergeTests(editorTest, uploadFileTest)
const shareTest = mergeTests(editorTest, sharedFileTest)
const host = process.env.CI ? 'ci' : hostname()

const hasPdftoppm = (() => {
	try {
		execFileSync('pdftoppm', ['-v'], { stdio: 'ignore' })
		return true
	} catch {
		return false
	}
})()

/**
 *
 * @param pdf - the pdf file
 * @param dir - the directory
 */
function renderPdfPages(pdf: Buffer, dir: string): Buffer[] {
	const pdfPath = join(dir, 'print.pdf')
	writeFileSync(pdfPath, pdf)
	execFileSync('pdftoppm', ['-r', '96', '-png', pdfPath, join(dir, 'page')])
	return readdirSync(dir)
		.filter((f) => f.endsWith('.png'))
		.sort()
		.map((f) => readFileSync(join(dir, f)))
}

new Map([
	[`Own file on ${host}`, fileTest],
	[`Shared file on ${host}`, shareTest],
]).forEach((test, name) => {
	test.use({ fileContent: loadFixture('print.md') })

	test(name, async ({ open, page, editor }, testInfo) => {
		test.skip(!hasPdftoppm, 'pdftoppm (poppler-utils) is not installed')
		await open()
		await expect(editor.getHeading({ name: 'Print test' })).toBeVisible()
		// Goes through the real print pipeline: fires beforeprint/afterprint and paginates
		const pdf = await page.pdf({ preferCSSPageSize: true })
		const pages = renderPdfPages(pdf, testInfo.outputPath())

		expect(pages).toHaveLength(5)
		pages.forEach((png, index) => {
			expect(png).toMatchSnapshot(`${name}-page-${index + 1}.png`)
		})

		await page.emulateMedia({ media: 'print' })
		await expect(page).toHaveScreenshot({ fullPage: true })
	})
})

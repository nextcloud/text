/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { CDPSession, Page, TestInfo } from '@playwright/test'
import type { ComparisonContents, ComparisonHarness, ComparisonMeasurement } from './support/comparisonHarness.ts'

import { expect, test } from './fixtures.ts'

const CELL_LEDGER = 40_000
const MAXIMUM_SQUARE_AXIS = Math.floor(Math.sqrt(CELL_LEDGER))
const CORE_LOGO = '/core/img/logo/logo.svg'
const HIGH_CARDINALITY_CHANGES = 6_490
const MAXIMUM_HIGH_CARDINALITY_HEAP_DELTA = 256_000_000

const headingReplacement: ComparisonContents = {
	before: 'A semantic block',
	after: '# A semantic block',
}
const retainedTableCellEdit: ComparisonContents = {
	before: '| Name | Value |\n| --- | --- |\n| retained | old value |\n| stable | same |',
	after: '| Name | Value |\n| --- | --- |\n| retained | new value |\n| stable | same |',
}

test.describe('Text comparison production bundle acceptance', () => {
	test('A12: the largest admitted square gap remains precise', async ({ comparison, page }) => {
		test.setTimeout(180_000)
		await mountMaximumSquare(comparison)

		await expect(page.locator('.text-comparison > [data-comparison-source-fallback]')).toHaveCount(0)
		await expect(page.locator('[data-comparison-select]')).toHaveCount(80)
		await expect(page.getByRole('navigation', { name: 'Change pages' })).toContainText(`of ${MAXIMUM_SQUARE_AXIS}`)
	})

	test('T07: one edited retained table column is precise at cell altitude', async ({ comparison, page }) => {
		await comparison.mount(retainedTableCellEdit)

		const change = page.locator('[data-comparison-select]')
		await expect(change).toHaveCount(1)
		await change.click()
		const changedCells = page.locator('td.text-comparison-change, td .text-comparison-change')
		await expect(changedCells).toHaveCount(2)
		await expect(page.locator('.text-comparison__document--before td').filter({ hasText: 'old value' })).toContainText('old value')
		await expect(page.locator('.text-comparison__document--after td').filter({ hasText: 'new value' })).toContainText('new value')
	})

	test('T18: a later over-budget table coarsens without corrupting the admitted table plan', async ({ comparison, page }) => {
		test.setTimeout(180_000)
		await comparison.mount(tableLedgerFixture())

		const changes = page.locator('[data-comparison-select]')
		const pages = page.getByRole('navigation', { name: 'Change pages' })
		await expect(changes).toHaveCount(80)
		await expect(pages).toContainText('of 201')
		await pages.getByRole('button', { name: 'Next' }).click()
		await pages.getByRole('button', { name: 'Next' }).click()
		await expect(changes).toHaveCount(41)
		await expect(changes.last()).toContainText(/Structure changed|Table changed/)
		await changes.last().click()
		const current = page.locator('[data-comparison-change][aria-current="true"]')
		await expect(current).toHaveCount(2)
		expect(await current.evaluateAll((elements) => elements.every((element) => element.closest('table') === element.parentElement?.closest('table')))).toBe(true)
	})

	test('V01: one first-class edit owns one row, ordinal, identity, and complete target set', async ({ comparison, page }) => {
		await comparison.mount(headingReplacement)

		const row = page.locator('[data-comparison-select]')
		await expect(row).toHaveCount(1)
		await expect(row).toHaveAttribute('aria-current', 'true')
		await expect(row).toHaveAttribute('aria-label', /Changed|Heading|Structure/)
		await expect(page.locator('.text-comparison__sr-only')).toContainText('Change 1 of 1')
		await row.click()
		const identities = await page.locator('.text-comparison__documents [data-comparison-change]').evaluateAll((elements) => (
			[...new Set(elements.map((element) => element.getAttribute('data-comparison-change')))]
		))
		expect(identities).toHaveLength(1)
		await expect(page.locator('.text-comparison__documents [data-comparison-change]')).toHaveCount(2)
	})

	test('V02: filtering moves current selection next and then previous when needed', async ({ comparison, page }) => {
		await assertFormattingFilterMove(comparison, page, {
			before: 'Old first.\n\nFormatting only.\n\nOld last.',
			after: 'New first.\n\n**Formatting only.**\n\nNew last.',
		}, 'next')
		await comparison.destroy()
		await assertFormattingFilterMove(comparison, page, {
			before: 'Old first.\n\nFormatting only.',
			after: 'New first.\n\n**Formatting only.**',
		}, 'previous')
	})

	test('V03: selecting a Changes row activates the identical edit in both Documents panes', async ({ comparison, page }) => {
		await comparison.mount({ before: 'Old first.\n\nOld second.', after: 'New first.\n\nNew second.' })

		const selectedEdit = page.locator('[data-comparison-select]').nth(1)
		await selectedEdit.click()
		const currentBySide: string[] = []
		for (const side of ['before', 'after']) {
			const current = page.locator(`.text-comparison__document--${side} [data-comparison-change][aria-current="true"]`)
			await expect(current).toHaveCount(1)
			currentBySide.push((await current.getAttribute('data-comparison-change')) ?? '')
		}
		expect(currentBySide[0]).toBe(currentBySide[1])
	})

	test('V04: an empty-side change has no synthetic marker and remains navigable', async ({ comparison, page }) => {
		await comparison.mount({ before: '# Removed first\n\n# Removed second', after: '' })

		await page.locator('[data-comparison-select]').first().click()
		await expect(page.locator('.text-comparison__document--after [data-comparison-change]')).toHaveCount(0)
		await expect(page.locator('.text-comparison__document--after [data-comparison-placeholder], .text-comparison__document--after .text-comparison-placeholder')).toHaveCount(0)
		const announcement = page.locator('.text-comparison__sr-only')
		const firstAnnouncement = await announcement.textContent()
		await page.getByRole('button', { name: 'Next' }).click()
		await expect(announcement).not.toHaveText(firstAnnouncement ?? '')
		await expect(page.locator('.text-comparison__document--before [data-comparison-change][aria-current="true"]')).toHaveCount(1)
	})

	test('V05: paired Documents panes preserve independent scroll positions', async ({ comparison, page }) => {
		const paragraphs = Array.from({ length: 100 }, (_, index) => `Paragraph ${index}.`).join('\n\n')
		await comparison.mount({ before: `Old first.\n\n${paragraphs}\n\nOld tail.`, after: `New first.\n\n${paragraphs}\n\nNew tail.` })

		await page.locator('[data-comparison-select]').first().click()
		const beforeScroller = page.locator('.text-comparison__document--before .text-comparison__document-scroller')
		const afterScroller = page.locator('.text-comparison__document--after .text-comparison__document-scroller')
		await beforeScroller.evaluate((element) => {
			element.scrollTop = 120
		})
		await afterScroller.evaluate((element) => {
			element.scrollTop = 360
		})
		expect(await beforeScroller.evaluate(({ scrollTop }) => scrollTop)).not.toBe(await afterScroller.evaluate(({ scrollTop }) => scrollTop))
		await page.getByRole('button', { name: 'Next' }).click()
		expect(await beforeScroller.evaluate(({ scrollTop }) => scrollTop)).not.toBe(await afterScroller.evaluate(({ scrollTop }) => scrollTop))
	})

	test('V06: responsive single-pane Documents retain side and selection state', async ({ comparison, page }) => {
		await comparison.mount({ before: 'Old first.\n\nOld second.', after: 'New first.\n\nNew second.', width: 620 })

		await page.locator('[data-comparison-select]').nth(1).click()
		await expect(page.locator('.text-comparison')).toHaveClass(/text-comparison--single/)
		const sideTabs = page.getByRole('tablist', { name: 'Version to display' })
		const beforeCurrent = page.locator('.text-comparison__document--before [data-comparison-change][aria-current="true"]')
		await expect(beforeCurrent).toBeVisible()
		const identity = await beforeCurrent.getAttribute('data-comparison-change')
		await sideTabs.getByRole('tab', { name: 'After' }).click()
		await expect(sideTabs.getByRole('tab', { name: 'After' })).toHaveAttribute('aria-selected', 'true')
		const afterCurrent = page.locator('.text-comparison__document--after [data-comparison-change][aria-current="true"]')
		await expect(afterCurrent).toBeVisible()
		await expect(afterCurrent).toHaveAttribute('data-comparison-change', identity ?? '')
		await page.locator('#text-comparison-harness').evaluate((element: HTMLElement) => {
			element.style.inlineSize = '390px'
		})
		await expect.poll(() => page.locator('.toolbar').evaluate(({ clientWidth, scrollWidth }) => scrollWidth <= clientWidth)).toBe(true)
		const viewTabsTop = await page.getByRole('tablist', { name: 'Comparison view' }).evaluate((element) => (element as HTMLElement).offsetTop)
		const navigationTop = await page.getByLabel('Change navigation').evaluate((element) => (element as HTMLElement).offsetTop)
		expect(navigationTop).toBeGreaterThan(viewTabsTop)
	})

	test('AUD-24: narrow Documents show the side that contains a one-sided edit', async ({ comparison, page }) => {
		await comparison.mount({ before: '', after: '# Added first\n\n# Added second', width: 620 })

		await page.locator('[data-comparison-select]').first().click()
		const sideTabs = page.getByRole('tablist', { name: 'Version to display' })
		await expect(sideTabs.getByRole('tab', { name: 'After' })).toHaveAttribute('aria-selected', 'true')
		await expect(page.locator('.text-comparison__document--after [data-comparison-change][aria-current="true"]')).toBeVisible()
		await expect(page.locator('.text-comparison__document--before')).toBeHidden()

		await comparison.destroy()
		await comparison.mount({ before: '# Removed first\n\n# Removed second', after: '', width: 620 })
		await page.locator('[data-comparison-select]').first().click()
		const deletionTabs = page.getByRole('tablist', { name: 'Version to display' })
		await deletionTabs.getByRole('tab', { name: 'After' }).click()
		await page.getByRole('tab', { name: 'Changes' }).click()
		await page.locator('[data-comparison-select]').nth(1).click()
		await expect(deletionTabs.getByRole('tab', { name: 'Before' })).toHaveAttribute('aria-selected', 'true')
		await expect(page.locator('.text-comparison__document--before [data-comparison-change][aria-current="true"]')).toBeVisible()
		await expect(page.locator('.text-comparison__document--after')).toBeHidden()
	})

	test('V06a: desktop comparison fills a flex mount host', async ({ comparison, page }) => {
		await comparison.mount({ before: 'Old document.', after: 'New document.', width: 1100 })
		await page.locator('#text-comparison-harness').evaluate((host) => {
			host.style.display = 'flex'
		})

		await expect(page.locator('.text-comparison-root')).toHaveCSS('width', '1100px')
		await expect(page.locator('.text-comparison')).toHaveClass(/text-comparison--paired/)
	})

	test('V06b: desktop Changes rows keep the reviewed full-width list presentation', async ({ comparison, page }) => {
		await comparison.mount({ before: '# Old heading\n\nOld paragraph.', after: '# New heading\n\nNew paragraph.', width: 1100 })

		const host = page.locator('#text-comparison-harness')
		const section = page.locator('.text-comparison__section-toggle').first()
		const row = page.locator('[data-comparison-select]').first()
		const [hostBox, sectionBox, rowBox] = await Promise.all([host.boundingBox(), section.boundingBox(), row.boundingBox()])
		expect(hostBox).not.toBeNull()
		expect(sectionBox).not.toBeNull()
		expect(rowBox).not.toBeNull()
		expect(rowBox!.width).toBeGreaterThanOrEqual(900)
		expect(sectionBox!.width).toBe(rowBox!.width)
		expect(Math.abs(rowBox!.x + rowBox!.width / 2 - (hostBox!.x + hostBox!.width / 2))).toBeLessThan(2)
		await expect(section).toHaveCSS('border-radius', '0px')
		await expect(row).toHaveCSS('border-radius', '0px')
	})

	test('V07: tabs, navigation, focus, and announcements expose accessible state', async ({ comparison, page }) => {
		await comparison.mount({ before: 'Old first.\n\nOld second.', after: 'New first.\n\nNew second.' })
		await comparison.assertAccessibleComparison()

		await page.locator('[data-comparison-select]').first().click()
		const announcement = page.locator('.text-comparison__sr-only')
		const initialAnnouncement = await announcement.textContent()
		await page.getByRole('button', { name: 'Next' }).click()
		await expect(announcement).not.toHaveText(initialAnnouncement ?? '')
		await page.getByRole('button', { name: 'Previous' }).click()
		await expect(announcement).toHaveText(initialAnnouncement ?? '')
		const documentsTab = page.getByRole('tab', { name: 'Full documents' })
		await documentsTab.press('End')
		await expect(page.getByRole('tab', { name: 'Markdown source' })).toBeFocused()
		await page.getByRole('tab', { name: 'Markdown source' }).press('Home')
		await expect(page.getByRole('tab', { name: 'Changes' })).toBeFocused()
		await expect(announcement).toHaveAttribute('aria-live', 'polite')
		await expect(announcement).toHaveAttribute('aria-atomic', 'true')
	})

	test('V08: a changed real image node-view receives scoped visible treatment', async ({ comparison, page }, testInfo) => {
		await comparison.mount({
			before: `![Before logo](${CORE_LOGO})\n\nOld paragraph.`,
			after: `![After logo](${CORE_LOGO})\n\nNew paragraph.`,
		})
		const changes = page.locator('[data-comparison-select]')
		await expect(changes).toHaveCount(2)
		await changes.first().click()

		const wrappers = page.locator('[data-node-view-wrapper].text-comparison-change:has(img)')
		await expect(wrappers).toHaveCount(2)
		for (const wrapper of await wrappers.all()) {
			await expect(wrapper.locator('figure[data-component="image-view"] img')).toHaveCount(1)
			await expect(wrapper).toHaveClass(/text-comparison-change--current/)
			const boxShadow = await wrapper.evaluate((element) => getComputedStyle(element).boxShadow)
			expect(boxShadow).not.toBe('none')
			expect(boxShadow).toMatch(/inset/)
		}
		await testInfo.attach('real-image-node-view.png', {
			body: await page.locator('#text-comparison-harness').screenshot(),
			contentType: 'image/png',
		})

		await page.getByRole('button', { name: 'Next' }).click()
		for (const wrapper of await wrappers.all()) {
			await expect(wrapper).not.toHaveClass(/text-comparison-change--current/)
			const boxShadow = await wrapper.evaluate((element) => getComputedStyle(element).boxShadow)
			expect(boxShadow).not.toBe('none')
			expect(boxShadow).toMatch(/inset/)
		}

		await comparison.destroy()
		await comparison.mount({
			before: '| Name |\n| --- |\n| retained |\n| removed |',
			after: '| Name |\n| --- |\n| retained |',
		})
		await page.locator('[data-comparison-select]').click()
		const structuralRow = page.locator('tr.text-comparison-change')
		await expect(structuralRow).toHaveCount(1)
		const structuralTreatment = await structuralRow.evaluate((element) => getComputedStyle(element).boxShadow)
		expect(structuralTreatment).not.toBe('none')
		expect(structuralTreatment).toMatch(/inset/)
	})

	test('V09: syntax-only Markdown reports no semantic edit and opens Source', async ({ comparison, page }) => {
		await comparison.mount({ before: '*same rendered text*', after: '_same rendered text_' })

		await expect(page.getByRole('status')).toContainText('No rendered differences')
		await expect(page.locator('[data-comparison-select]')).toHaveCount(0)
		await page.getByRole('button', { name: 'Open Markdown source' }).click()
		await expect(page.getByRole('tab', { name: 'Markdown source' })).toHaveAttribute('aria-selected', 'true')
		await expect(page.locator('[data-source-hunk]')).toHaveCount(1)
	})

	test('V10: Source preserves literal EOL, tab, trailing-space, control, and final-newline differences', async ({ comparison, page }) => {
		await comparison.mount({ before: 'first\tline  \r\nzero\u200Bwidth', after: 'first\tline \nzero\u200Cwidth\n' })
		await page.getByRole('tab', { name: 'Markdown source' }).click()

		const source = page.locator('.text-source-comparison')
		for (const token of ['TAB', 'ZWSP', 'ZWNJ', 'CRLF', 'LF', 'TRAILING SPACE', 'No newline at end of file']) {
			await expect(source).toContainText(token)
		}
		const sourceText = await source.textContent()
		expect(sourceText).not.toContain('\u200B')
		expect(sourceText).not.toContain('\u200C')
	})

	test('V11: Source processing limits retain complete before and after fallback text', async ({ comparison, page }) => {
		const before = Array.from({ length: 3000 }, (_, index) => `before-${index}`).join('\n')
		const after = Array.from({ length: 3000 }, (_, index) => `after-${index}`).join('\n')
		await comparison.mount({ before, after })
		await page.getByRole('tab', { name: 'Markdown source' }).click()

		await expect(page.locator('[data-source-limited]')).toBeVisible()
		const fallback = page.locator('[data-comparison-source-fallback]')
		await expect(fallback).toContainText('before-0')
		await expect(fallback).toContainText('before-2999')
		await expect(fallback).toContainText('after-0')
		await expect(fallback).toContainText('after-2999')
	})

	test('V12: repeated idempotent destroy leaves no editors, observers, or root DOM', async ({ comparison, page }) => {
		await comparison.open()
		const baseline = await comparison.observerCounts()

		for (let iteration = 0; iteration < 2; iteration++) {
			const measurement = await comparison.mount({ before: `Before ${iteration}`, after: `After ${iteration}` })
			expect(measurement.rootCount).toBe(1)
			expect(measurement.proseMirrorCount).toBe(0)
			await page.getByRole('tab', { name: 'Full documents' }).click()
			await expect(page.locator('.ProseMirror')).toHaveCount(2)
			await comparison.destroy(2)
			await expect(page.locator('#text-comparison-harness')).toBeEmpty()
			expect(await comparison.observerCounts()).toEqual(baseline)
		}
	})

	test('F05: editor initialization failure mounts complete literal Source for both snapshots', async ({ comparison, page }) => {
		let fallbackChunkRequests = 0
		await page.route('**/*MarkdownSourceFallback*', async (route) => {
			fallbackChunkRequests++
			await route.abort('failed')
		})
		await comparison.forceEditorInitializationFailure()
		await comparison.mount({ before: '<b>complete before</b>', after: '<i>complete after</i>' })

		const fallback = page.locator('[data-comparison-source-fallback]')
		await expect(fallback).toContainText('<b>complete before</b>')
		await expect(fallback).toContainText('<i>complete after</i>')
		await expect(page.locator('.ProseMirror')).toHaveCount(0)
		expect(fallbackChunkRequests).toBe(0)
	})

	test('F06: projection failure mounts Source without partial Documents', async ({ comparison, page }) => {
		await comparison.forceProjectionFailure()
		await comparison.mount({ before: 'Projection before', after: 'Projection after' })
		await page.getByRole('tab', { name: 'Full documents' }).click()

		const fallback = page.locator('[data-comparison-source-fallback]')
		await expect(fallback).toContainText('Projection before')
		await expect(fallback).toContainText('Projection after')
		await expect(page.locator('.text-comparison__documents .ProseMirror')).toHaveCount(0)
		await expect(page.locator('.text-comparison__documents [data-comparison-change]')).toHaveCount(0)
	})

	test('F11: normal comparison modes emit no unexplained browser or network failures', async ({ comparison, page }) => {
		comparison.resetCapture()
		await comparison.mount({ before: 'Old content.', after: '**New content.**' })
		await page.locator('[data-comparison-select]').click()
		await page.getByRole('tab', { name: 'Markdown source' }).click()
		await expect(page.locator('[data-source-hunk]')).toBeVisible()

		expect(comparison.failures).toEqual([])
		expect(comparison.consoleMessages.filter(({ type }) => type === 'error')).toEqual([])
		expect(comparison.network.filter(({ failure, status }) => failure || (status ?? 200) >= 400)).toEqual([])
	})

	test('P01: the near-line-floor one-change fixture stays precise with bounded readiness', async ({ comparison, page }, testInfo) => {
		test.setTimeout(180_000)
		const measurement = await comparison.mount(nearLineFloorFixture())

		await expect(page.locator('[data-comparison-select]')).toHaveCount(1)
		await attachMeasurement(testInfo, 'near-line-floor', measurement, { weightedDebit: 0 })
	})

	test('AUD-02: pre-mount selection and filtering initialize both Documents decoration plugins', async ({ comparison, page }) => {
		for (const width of [1000, 620]) {
			await comparison.mount({ before: 'Old first.\n\nOld second.', after: 'New first.\n\nNew second.', width })
			await page.locator('[data-comparison-select]').nth(1).click()
			for (const side of ['before', 'after']) {
				await expect(page.locator(`.text-comparison__document--${side} [data-comparison-change="change-1"][aria-current="true"]`)).toHaveCount(1)
			}
			await comparison.destroy()

			await comparison.mount({ before: 'Formatting only.\n\nOld content.', after: '**Formatting only.**\n\nNew content.', width })
			await page.getByRole('checkbox', { name: 'Hide formatting-only changes' }).check()
			await page.getByRole('tab', { name: 'Full documents' }).click()
			await expect(page.locator('.text-comparison__documents .text-comparison-change--formatting')).toHaveCount(0)
			for (const side of ['before', 'after']) {
				await expect(page.locator(`.text-comparison__document--${side} [data-comparison-change][aria-current="true"]`)).toHaveCount(1)
			}
			await comparison.destroy()
		}
	})

	test('AUD-05: Source visibly exposes side, operation, whitespace, EOL, control, and final-newline semantics', async ({ comparison, page }) => {
		await comparison.mount({ before: 'old\t\u200B\r\ntrail  ', after: 'new\ntrail\n' })
		await page.getByRole('tab', { name: 'Markdown source' }).click()

		const source = page.locator('.text-source-comparison')
		await expect(source.locator('[data-source-side="before"]')).toHaveText('Before')
		await expect(source.locator('[data-source-side="after"]')).toHaveText('After')
		await expect(source.locator('[data-source-operation="removed"]').first()).toHaveAttribute('aria-label', /Removed line/)
		await expect(source.locator('[data-source-operation="added"]').first()).toHaveAttribute('aria-label', /Added line/)
		await expect(source.locator('[data-source-operation="removed"] [data-source-cue]').first()).toHaveText('−')
		await expect(source.locator('[data-source-operation="added"] [data-source-cue]').first()).toHaveText('+')
		for (const token of ['TAB', 'ZWSP', 'CRLF', 'LF', '2 TRAILING SPACES', 'No newline at end of file']) {
			await expect(source).toContainText(token)
		}
	})

	test('AUD-09: settled image dialog focus is contained and restored on close', async ({ comparison, page }, testInfo) => {
		await comparison.mount({ before: `![Before logo](${CORE_LOGO})`, after: `![After logo](${CORE_LOGO})` })
		await page.locator('[data-comparison-select]').first().click()
		const action = page.getByRole('button', { name: 'Open image Before logo' })
		await action.focus()
		await action.press('Enter')

		const dialog = page.getByRole('dialog')
		await expect(dialog).toBeVisible()
		await expect.poll(() => page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false)).toBe(true)
		if (testInfo.project.name.includes('chromium')) {
			await page.keyboard.press('Tab')
			await expect.poll(() => page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false)).toBe(true)
		}
		await page.keyboard.press('Escape')
		await expect(dialog).toBeHidden()
		await expect(action).toBeFocused()
	})

	test('AUD-10: Changes tokens wrap with spacing and selected tabs have visible treatment', async ({ comparison, page }) => {
		await comparison.mount({ before: 'A short value.', after: '**A substantially longer changed value that must remain readable.**' })

		const item = page.locator('.text-comparison__change-item')
		const content = item.locator('.text-comparison__change-item-content')
		const itemStyle = await item.evaluate((element) => {
			const style = getComputedStyle(element)
			return { columnGap: style.columnGap, display: style.display, rowGap: style.rowGap }
		})
		const contentStyle = await content.evaluate((element) => {
			const style = getComputedStyle(element)
			return { display: style.display, gap: style.gap, overflowWrap: style.overflowWrap }
		})
		expect(itemStyle.display).toBe('grid')
		expect(itemStyle.columnGap).not.toBe('0px')
		expect(contentStyle.display).toBe('flex')
		expect(contentStyle.gap).not.toBe('0px')
		expect(contentStyle.overflowWrap).toBe('anywhere')

		const selectedTab = page.getByRole('tab', { name: 'Changes' })
		const selectedStyle = await selectedTab.evaluate((element) => {
			const style = getComputedStyle(element)
			return {
				borderRadius: style.borderRadius,
				borderWidth: style.borderBottomWidth,
				boxShadow: style.boxShadow,
				fontWeight: style.fontWeight,
			}
		})
		expect(selectedStyle.borderRadius).toBe('0px')
		expect(Number.parseFloat(selectedStyle.borderWidth)).toBeGreaterThan(0)
		expect(selectedStyle.boxShadow).toBe('none')
		expect(Number.parseInt(selectedStyle.fontWeight, 10)).toBeGreaterThanOrEqual(700)

		await comparison.destroy()
		await comparison.mount({
			before: '# B1 duplicate-body deletion\n\n| A | B | C |\n| --- | --- | --- |\n| x | x | x |\n| x | x | x |',
			after: '# B1 duplicate-body deletion\n\n| A | B |\n| --- | --- |\n| x | x |\n| x | x |',
			width: 340,
		})
		await expect(page.locator('.text-comparison')).toHaveClass(/text-comparison--single/)
		const narrowItem = page.locator('.text-comparison__change-item').first()
		const narrowLabel = narrowItem.getByText('Table column removed', { exact: true })
		await expect(narrowLabel).toBeVisible()
		await expect(narrowItem.locator('.badge')).toHaveCount(2)
		expect(await narrowLabel.evaluate((element) => {
			const range = document.createRange()
			range.selectNodeContents(element)
			return range.getClientRects().length
		})).toBe(1)
		expect(await narrowItem.locator('.title').evaluate((element) => {
			const bounds = element.getBoundingClientRect()
			return [...element.children].every((child) => {
				const rect = child.getBoundingClientRect()
				return rect.left >= bounds.left && rect.right <= bounds.right
			})
		})).toBe(true)
		expect(await narrowItem.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
	})

	test('AUD-11: revealing a responsive hidden side locates the already-current edit', async ({ comparison, page }) => {
		const middle = Array.from({ length: 120 }, (_, index) => `Stable paragraph ${index}.`).join('\n\n')
		await comparison.mount({ before: `Old first.\n\n${middle}\n\nOld tail.`, after: `New first.\n\n${middle}\n\nNew tail.`, width: 620, height: 360 })
		await page.locator('[data-comparison-select]').nth(1).click()

		await expect(page.locator('.text-comparison')).toHaveClass(/text-comparison--single/)
		await expect(page.locator('.text-comparison__document--after')).toBeHidden()
		const afterScroller = page.locator('.text-comparison__document--after .text-comparison__document-scroller')
		await afterScroller.evaluate((element) => {
			element.scrollTop = 0
		})
		await page.locator('#text-comparison-harness').evaluate((element: HTMLElement) => {
			element.style.inlineSize = '900px'
		})
		await expect(page.locator('.text-comparison')).toHaveClass(/text-comparison--paired/)
		await expect(page.locator('.text-comparison__document--after [data-comparison-change][aria-current="true"]')).toBeVisible()
		await expect.poll(() => afterScroller.evaluate(({ scrollTop }) => scrollTop)).toBeGreaterThan(0)
	})

	test('AUD-13: audited bidi and control characters render only as visible inert tokens', async ({ comparison, page }) => {
		const controls = '\u061C\u00AD\u200E\u200F\u0085\u2028\u2029'
		await comparison.mount({ before: `old${controls}`, after: 'new\n' })
		await page.getByRole('tab', { name: 'Markdown source' }).click()

		const source = page.locator('.text-source-comparison')
		for (const token of ['ALM', 'SHY', 'LRM', 'RLM', 'NEL', 'LS', 'PS']) {
			await expect(source).toContainText(token)
		}
		const text = await source.textContent()
		for (const control of controls) {
			expect(text).not.toContain(control)
		}
	})

	test('AUD-14: high-cardinality Changes, Documents, and Source stay within explicit budgets', { tag: '@memory' }, async ({ comparison, page }, testInfo) => {
		test.setTimeout(180_000)
		expect(testInfo.project.name).toBe('comparison-chromium-memory')
		const cdp = await page.context().newCDPSession(page)
		await cdp.send('Performance.enable')
		const heapBeforeBytes = await readChromiumHeap(cdp)
		const before = Array.from({ length: HIGH_CARDINALITY_CHANGES }, (_, index) => `# Removed section ${index}`).join('\n')
		const measurement = await comparison.mount({ before, after: '' })

		await expect(page.locator('[data-comparison-select]')).toHaveCount(80)
		const changesDomCount = await page.locator('.text-comparison__changes *').count()
		expect(changesDomCount).toBeLessThanOrEqual(1_500)

		const documentsStarted = await page.evaluate(() => performance.now())
		await page.getByRole('tab', { name: 'Full documents' }).click()
		await expect(page.locator('.text-comparison__document--before h1')).toHaveCount(HIGH_CARDINALITY_CHANGES)
		const documentsMilliseconds = await page.evaluate((started) => performance.now() - started, documentsStarted)
		const documentsDomCount = await page.locator('.text-comparison__documents *').count()
		expect(documentsDomCount).toBeLessThanOrEqual(20_000)

		const sourceStarted = await page.evaluate(() => performance.now())
		await page.getByRole('tab', { name: 'Markdown source' }).click()
		const source = page.locator('[data-comparison-source-fallback]')
		await expect(source).toBeVisible()
		const sourceMilliseconds = await page.evaluate((started) => performance.now() - started, sourceStarted)
		const sourceDomCount = await source.locator('*').count()
		const sourceCharacters = await source.evaluate((element) => element.textContent?.length ?? 0)
		expect(sourceDomCount).toBeLessThanOrEqual(50)
		expect(sourceCharacters).toBeLessThanOrEqual(2_000_000)

		const heapAfterModes = await readChromiumHeap(cdp)
		const heapDeltaBytes = heapAfterModes - heapBeforeBytes
		expect(heapDeltaBytes).toBeLessThan(MAXIMUM_HIGH_CARDINALITY_HEAP_DELTA)
		await testInfo.attach('high-cardinality-metrics.json', {
			body: Buffer.from(JSON.stringify({ changesDomCount, documentsDomCount, documentsMilliseconds, heapAfterModes, heapBeforeBytes, heapDeltaBytes, memoryMetric: 'chromium-cdp/Performance.JSHeapUsedSize', mountMilliseconds: measurement.durationMilliseconds, sourceCharacters, sourceDomCount, sourceMilliseconds }, null, 2)),
			contentType: 'application/json',
		})
	})

	test('AUD-18: read-only image action is named, focusable, rendered, and operable with Enter', async ({ comparison, page }) => {
		await comparison.mount({ before: `![Before logo](${CORE_LOGO})`, after: `![After logo](${CORE_LOGO})` })
		await page.locator('[data-comparison-select]').first().click()
		const action = page.getByRole('button', { name: 'Open image Before logo' })

		await expect(action.locator('img')).toBeVisible()
		await action.focus()
		await expect(action).toBeFocused()
		await action.press('Enter')
		await expect(page.getByRole('dialog')).toBeVisible()
	})

	test('AUD-18: read-only attachment action retains its preview and operates with Space', async ({ comparison, page }) => {
		const attachmentPath = '/Documents/document.pdf'
		await page.route('**/apps/text/attachments', async (route) => route.fulfill({
			json: [{ davPath: attachmentPath, fullUrl: '/document.pdf', isImage: false, metadata: null, mimetype: 'application/pdf', name: 'document.pdf', previewUrl: CORE_LOGO, size: 100 }],
		}))
		await page.evaluate(() => {
			sessionStorage.removeItem('attachment-viewer-path')
			Object.assign(window.OCA, {
				Viewer: {
					file: null,
					mimetypes: ['application/pdf'],
					open: ({ path }: { path: string }) => sessionStorage.setItem('attachment-viewer-path', path),
				},
			})
		})
		await comparison.mount({ before: '![Before document](.attachments.123/document.pdf)', after: '![After document](.attachments.123/document.pdf)', fileId: 123 })
		await page.locator('[data-comparison-select]').first().click()
		const action = page.getByRole('button', { name: 'Open attachment Before document' })

		await expect(action.locator('img')).toBeVisible()
		await action.focus()
		await expect(action).toBeFocused()
		await action.press('Space')
		await expect.poll(() => page.evaluate(() => sessionStorage.getItem('attachment-viewer-path'))).toBe(attachmentPath)
	})

	test('AUD-21: a rejected loaded callback settles once and keeps the comparison', async ({ comparison, page }) => {
		const measurement = await comparison.mount({ before: 'Before callback.', after: 'After callback.', rejectLoaded: true })

		expect(measurement.loadedCallbackCalls).toBe(1)
		await expect(page.locator('.text-comparison')).toBeVisible()
		await expect(page.locator('[data-comparison-source-fallback]')).toHaveCount(0)
		await expect(page.locator('[data-comparison-select]')).toHaveCount(1)
		await expect(page.locator('.ProseMirror')).toHaveCount(0)
	})

	test('AUD-22: complete Source fallback responds to host width instead of viewport width', async ({ comparison, page }) => {
		const oversized = Array.from({ length: 6501 }, (_, index) => `line ${index}`).join('\n')
		await page.setViewportSize({ width: 1280, height: 800 })

		for (const [width, columns] of [[620, 1], [900, 2]] as const) {
			await comparison.mount({ before: oversized, after: `${oversized}\nchanged`, width })
			const documents = page.locator('.text-source-fallback__documents')
			await expect(documents).toBeVisible()
			const tracks = await documents.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)
			expect(tracks).toBe(columns)
			await comparison.destroy()
		}
	})

	test('oversized source lines fall back without blocking the page', async ({ comparison, page }) => {
		const before = `# Oversized source fallback\n\n\`\`\`\n${'\t'.repeat(200_000)}😀\n\`\`\``
		const after = `${before}\n\ncurrent marker`
		await comparison.mount({ before, after })
		await expect(page.locator('[data-comparison-source-fallback]')).toBeVisible()
		await expect(page.getByText('Source preview was truncated to the display limit.')).toBeVisible()
	})

	test('AUD-23: Source rows and navigation retain deliberate geometry', async ({ comparison, page }) => {
		const middle = Array.from({ length: 10 }, (_, index) => `stable ${index}`).join('\n')
		await comparison.mount({ before: `stable first\r\nold value  \r\n${middle}\r\nold tail`, after: `stable first\nnew value \n${middle}\nnew tail\n` })
		await page.getByRole('tab', { name: 'Markdown source' }).click()

		const source = page.locator('.text-source-comparison')
		const changed = source.locator('[data-source-operation="removed"]').first()
		const unchanged = source.locator('.text-source-comparison__line').filter({ hasText: 'stable first' }).first()
		const changedGeometry = await changed.evaluate((element) => [...element.children].map((child) => {
			const rect = child.getBoundingClientRect()
			return { left: rect.left, top: rect.top }
		}))
		const unchangedGeometry = await unchanged.evaluate((element) => [...element.children].map((child) => child.getBoundingClientRect().left))
		expect(changedGeometry).toHaveLength(5)
		expect(new Set(changedGeometry.map(({ top }) => Math.round(top))).size).toBe(1)
		expect(Math.round(changedGeometry[1]!.left)).toBe(Math.round(unchangedGeometry[0]!))
		expect(Math.round(changedGeometry[2]!.left)).toBe(Math.round(unchangedGeometry[1]!))

		const navigation = source.locator('.text-source-comparison__navigation')
		const navigationCenters = await navigation.evaluate((element) => [...element.children].map((child) => {
			const rect = child.getBoundingClientRect()
			return rect.top + rect.height / 2
		}))
		expect(Math.max(...navigationCenters) - Math.min(...navigationCenters)).toBeLessThan(4)
		for (const button of await navigation.getByRole('button').all()) {
			await expect(button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
		}
		const sourceFontSize = await source.evaluate((element) => getComputedStyle(element).fontSize)
		await expect(source.locator('[data-source-side="before"]')).toHaveCSS('font-size', sourceFontSize)
		await expect(source.locator('[data-source-side="after"]')).toHaveCSS('font-size', sourceFontSize)
		await expect(source.locator('[data-source-hunk]').first().getByRole('button')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
		await navigation.getByRole('button', { name: 'Next' }).click()
		await expect(navigation).toContainText('Source change 2 of 2')

		await comparison.destroy()
		await comparison.mount({ before: `old value  \r\n${middle}\r\nold tail`, after: `new value \n${middle}\nnew tail\n`, width: 390 })
		await page.getByRole('tab', { name: 'Markdown source' }).click()
		const narrowNavigation = source.locator('.text-source-comparison__navigation')
		const narrowTops = await narrowNavigation.evaluate((element) => [...element.children].map((child) => Math.round(child.getBoundingClientRect().top)))
		expect(narrowTops[0]).toBe(narrowTops[2])
		expect(narrowTops[1]).toBeGreaterThan(narrowTops[0]!)
		const sourceSideTabs = page.getByRole('tablist', { name: 'Source version to display' })
		const removedLine = source.locator('[data-source-operation="removed"]').first()
		const addedLine = source.locator('[data-source-operation="added"]').first()
		await expect(removedLine).toBeVisible()
		await expect(addedLine).toBeHidden()
		await sourceSideTabs.getByRole('tab', { name: 'After' }).click()
		await expect(removedLine).toBeHidden()
		await expect(addedLine).toBeVisible()
	})

	test('AUD-24: Full document headings align in paired and single layouts', async ({ comparison, page }) => {
		for (const width of [1100, 620]) {
			await comparison.mount({ before: 'Old document.', after: 'New document.', width })
			await page.getByRole('tab', { name: 'Full documents' }).click()
			const sideTabs = page.getByRole('tablist', { name: 'Version to display' })
			if (width === 1100) {
				await expect(page.locator('.text-comparison__document--before')).toBeVisible()
				await expect(page.locator('.text-comparison__document--after')).toBeVisible()
				for (const button of await page.getByLabel('Change navigation').getByRole('button').all()) {
					await expect(button).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
				}
			}
			for (const side of ['before', 'after']) {
				if (width === 620) {
					await sideTabs.getByRole('tab', { name: side === 'before' ? 'Before' : 'After' }).click()
				}
				const article = page.locator(`.text-comparison__document--${side}`)
				await expect(article).toBeVisible()
				const header = page.locator(`.text-comparison__document--${side} > header`)
				const headings = header.locator('.document-heading > span, .document-heading > h2, .document-legend')
				await expect(headings).toHaveCount(3)
				await expect(header.getByRole('heading', { level: 2 })).toHaveCSS(
					'font-size',
					await article.evaluate((element) => getComputedStyle(element).fontSize),
				)
				const rectangles = await headings.evaluateAll((elements) => elements.map((element) => {
					const rect = element.getBoundingClientRect()
					return { width: rect.width, height: rect.height, center: rect.top + rect.height / 2 }
				}))
				expect(rectangles.every(({ width, height }) => width > 0 && height > 0)).toBe(true)
				const centers = rectangles.map(({ center }) => center)
				expect(Math.max(...centers) - Math.min(...centers)).toBeLessThan(4)
			}
			await comparison.destroy()
		}
	})
})

async function assertFormattingFilterMove(comparison: ComparisonHarness, page: Page, contents: ComparisonContents, direction: 'next' | 'previous') {
	await comparison.mount(contents)
	const rows = page.locator('[data-comparison-select]')
	const formatting = rows.filter({ hasText: /Bold changed/ })
	await expect(formatting).toHaveCount(1)
	const ids = await rows.evaluateAll((elements) => elements.map((element) => element.getAttribute('data-comparison-select') ?? ''))
	const formattingId = await formatting.getAttribute('data-comparison-select')
	const formattingIndex = ids.indexOf(formattingId ?? '')
	const expectedIndex = direction === 'next' ? formattingIndex + 1 : formattingIndex - 1
	await formatting.click()
	await page.getByRole('checkbox', { name: 'Hide formatting-only changes' }).check()
	const current = page.locator('[data-comparison-select][aria-current="true"]')
	await expect(current).toHaveCount(1)
	await expect(current).toHaveAttribute('data-comparison-select', ids[expectedIndex]!)
}

async function mountMaximumSquare(comparison: ComparisonHarness) {
	const maximumBefore = axis('maximum', MAXIMUM_SQUARE_AXIS, 'before')
	const maximumAfter = axis('maximum', MAXIMUM_SQUARE_AXIS, 'after')
	return comparison.mount(maximumSquareFixture(maximumBefore, maximumAfter))
}

async function attachMeasurement(testInfo: TestInfo, fixture: string, measurement: ComparisonMeasurement, work?: Record<string, number>) {
	await testInfo.attach(`${fixture}-measurement.json`, {
		body: Buffer.from(JSON.stringify({ measurement, work }, null, 2)),
		contentType: 'application/json',
	})
}

async function readChromiumHeap(cdp: CDPSession) {
	const { metrics } = await cdp.send('Performance.getMetrics')
	const heap = metrics.find(({ name }) => name === 'JSHeapUsedSize')?.value
	if (typeof heap !== 'number' || !Number.isFinite(heap)) {
		throw new Error('AUD-14 requires Chromium CDP Performance.JSHeapUsedSize memory evidence')
	}
	return heap
}

function nearLineFloorFixture(): ComparisonContents {
	const before = Array.from({ length: 6490 }, (_, index) => `# fixed floor ${index}`).join('\n')
	const after = before.replace('# fixed floor 3245', '# changed floor 3245')
	return { before, after }
}

function maximumSquareFixture(maximumBefore: readonly string[], maximumAfter: readonly string[]): ComparisonContents {
	const before = ['# exact start', ...maximumBefore, '# exact end'].join('\n\n')
	const after = ['# exact start', ...maximumAfter, '# exact end'].join('\n\n')
	return { before, after }
}

function tableLedgerFixture(): ComparisonContents {
	return {
		before: `${ledgerTable(200, 12, 'a')}\n\n# exact table separator\n\n${ledgerTable(10, 12, 'c')}`,
		after: `${ledgerTable(200, 12, 'b')}\n\n# exact table separator\n\n${ledgerTable(10, 12, 'd')}`,
	}
}

function ledgerTable(columns: number, textLength: number, suffix: string) {
	const cell = (column: number) => {
		const prefix = `000-${column.toString().padStart(3, '0')}-`
		return `${prefix}${suffix.repeat(textLength - prefix.length)}`
	}
	const header = Array.from({ length: columns }, (_value, column) => ` ${cell(column)} `).join('|')
	const divider = Array.from({ length: columns }, () => ' --- ').join('|')
	return `|${header}|\n|${divider}|`
}

function axis(prefix: string, count: number, suffix: string) {
	const axisId = prefix.match(/\d+/)?.[0] ?? prefix[0]
	return Array.from({ length: count }, (_, index) => `${axisId}:${index.toString(36)}:${suffix[0]}`)
}

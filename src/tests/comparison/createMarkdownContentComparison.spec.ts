/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as markdownComparison from '../../comparison/markdownComparison.ts'
import { RENDERED_COMPARISON_LIMITS } from '../../comparison/renderedComparisonLimit.ts'
import { createMarkdownContentComparison } from '../../createMarkdownContentComparison.ts'
import {
	ATLAS_CURRENT_CONTENT,
	ATLAS_INITIAL_CONTENT,
} from './fixtures/atlasComparison.ts'

const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo')

beforeEach(() => {
	Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
		configurable: true,
		value: vi.fn(),
		writable: true,
	})
})

afterEach(() => {
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
	if (originalScrollTo) {
		Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo)
	} else {
		delete (HTMLElement.prototype as { scrollTo?: typeof HTMLElement.prototype.scrollTo }).scrollTo
	}
})

/**
 * @param root Comparison host
 * @param label Exact tab label
 */
function tab(root: HTMLElement, label: string) {
	const match = [...root.querySelectorAll<HTMLButtonElement>('.text-comparison__view-tabs [role="tab"]')]
		.find((button) => button.textContent?.trim() === label)
	expect(match, `Missing ${label} tab`).toBeDefined()
	return match!
}

/**
 * @param root Comparison host
 * @param text Visible button text
 */
function button(root: HTMLElement, text: string) {
	const match = [...root.querySelectorAll<HTMLButtonElement>('button')]
		.find((candidate) => candidate.textContent?.includes(text))
	expect(match, `Missing ${text} button`).toBeDefined()
	return match!
}

/**
 * @param root Comparison host
 * @param label Exact single-pane tab label
 */
function sideTab(root: HTMLElement, label: string) {
	const match = [...root.querySelectorAll<HTMLButtonElement>('.text-comparison__side-tabs [role="tab"]')]
		.find((candidate) => candidate.textContent?.trim() === label)
	expect(match, `Missing ${label} side tab`).toBeDefined()
	return match!
}

/**
 * @param root Comparison host
 * @param checked Desired filter state
 */
function setFormattingFilter(root: HTMLElement, checked: boolean) {
	const filter = root.querySelector<HTMLInputElement>('input[type="checkbox"]')!
	filter.checked = checked
	filter.dispatchEvent(new Event('change', { bubbles: true }))
}

/**
 * Give one document target deterministic pane-local geometry.
 *
 * @param root Comparison host
 * @param side Document side
 * @param id Descriptor ID
 * @param targetTop Target viewport top
 * @param initialScrollTop Initial pane scroll
 */
function documentGeometry(
	root: HTMLElement,
	side: 'before' | 'after',
	id: string,
	targetTop: number,
	initialScrollTop: number,
) {
	const pane = root.querySelector<HTMLElement>(`.text-comparison__document--${side}`)!
	const scroller = pane.querySelector<HTMLElement>('.text-comparison__document-scroller')!
	const target = [...pane.querySelectorAll<HTMLElement>('[data-comparison-change]')]
		.find((candidate) => candidate.dataset.comparisonChange === id)!
	expect(target).toBeDefined()
	Object.defineProperties(scroller, {
		clientHeight: { configurable: true, value: 400 },
		scrollHeight: { configurable: true, value: 3000 },
		scrollTop: { configurable: true, value: initialScrollTop, writable: true },
	})
	vi.spyOn(scroller, 'getBoundingClientRect').mockReturnValue({
		bottom: 500,
		height: 400,
		top: 100,
	} as DOMRect)
	vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
		bottom: targetTop + 20,
		height: 20,
		top: targetTop,
	} as DOMRect)
	const scrollTo = vi.fn((options: ScrollToOptions) => {
		scroller.scrollTop = options.top ?? scroller.scrollTop
	})
	Object.defineProperty(scroller, 'scrollTo', { configurable: true, value: scrollTo })
	return { pane, scroller, scrollTo, target }
}

describe('createMarkdownContentComparison', { timeout: 30_000 }, () => {
	it.each([
		[{ beforeContent: null, afterContent: '' }],
		[{ beforeContent: '', afterContent: undefined }],
	])('rejects missing comparison content', async (content) => {
		await expect(createMarkdownContentComparison({
			el: document.createElement('div'),
			...content,
		} as never)).rejects.toThrow('must be strings')
	})

	it('defaults identical snapshots to Changes with one concise empty state', async () => {
		const el = document.createElement('div')
		const onLoaded = vi.fn()
		const comparison = await createMarkdownContentComparison({
			afterContent: '',
			beforeContent: '',
			el,
			onLoaded,
		})

		expect(onLoaded).toHaveBeenCalledOnce()
		expect(tab(el, 'Changes').getAttribute('aria-selected')).toBe('true')
		expect(el.querySelector('[data-comparison-empty="identical"]')?.textContent).toContain('No differences.')
		expect(el.querySelector('[data-comparison-empty-action]')).toBeNull()
		expect(Object.keys(comparison)).toEqual(['destroy'])
		comparison.destroy()
		comparison.destroy()
		expect(el.childElementCount).toBe(0)
	})

	it('skips rendered editors above the pre-parse limit and defaults to Source', async () => {
		const oversized = 'a'.repeat(RENDERED_COMPARISON_LIMITS.maximumCharactersPerSnapshot + 1)
		const el = document.createElement('div')
		const onLoaded = vi.fn()
		const comparison = await createMarkdownContentComparison({
			afterContent: `${oversized}b`,
			beforeContent: oversized,
			el,
			onLoaded,
		})

		expect(onLoaded).toHaveBeenCalledOnce()
		expect(tab(el, 'Changes').disabled).toBe(true)
		expect(tab(el, 'Full documents').disabled).toBe(true)
		expect(tab(el, 'Markdown source').getAttribute('aria-selected')).toBe('true')
		expect(el.querySelector('[data-comparison-rendered-limit]')?.textContent)
			.toContain('too large for rendered views')
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(0)
		expect(el.textContent).toContain('Source compares literal Markdown')
		comparison.destroy()
	})
	it('falls back to Source when change density reaches the model limit', async () => {
		vi.spyOn(markdownComparison, 'createMarkdownComparisonModel').mockImplementationOnce(() => {
			throw new markdownComparison.ComparisonModelLimitError()
		})
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			afterContent: 'After',
			beforeContent: 'Before',
			el,
		})

		expect(tab(el, 'Changes').disabled).toBe(true)
		expect(tab(el, 'Full documents').disabled).toBe(true)
		expect(tab(el, 'Markdown source').getAttribute('aria-selected')).toBe('true')
		expect(el.querySelector('[data-comparison-rendered-limit]')?.textContent)
			.toContain('too many changes for rendered views')
		expect(el.querySelector('[data-comparison-rendered-limit]')?.textContent)
			.not.toContain('too large')
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(0)
		comparison.destroy()
	})

	it('keeps syntax-only differences in Changes and offers one Source action', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: '# Heading',
			afterContent: '# Heading #',
			el,
		})

		expect(tab(el, 'Changes').getAttribute('aria-selected')).toBe('true')
		expect(el.querySelector('[data-comparison-empty="syntax"]')?.textContent)
			.toContain('No rendered differences — Markdown syntax differs.')
		const action = el.querySelector<HTMLButtonElement>('[data-comparison-empty-action]')!
		expect(action.textContent).toContain('Open Markdown source')
		action.click()
		await vi.waitFor(() => expect(tab(el, 'Markdown source').getAttribute('aria-selected')).toBe('true'))
		expect(el.textContent).toContain('Source compares literal Markdown')
		await vi.waitFor(() => expect(el.textContent).toContain('# Heading #'))
		comparison.destroy()
	})

	it('uses exactly three peer ARIA tabs with wrapping Arrow, Home, and End behavior', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Before one\n\nBefore two',
			afterContent: 'After one\n\nAfter two',
			el,
		})
		const tabs = [...el.querySelectorAll<HTMLButtonElement>('.text-comparison__view-tabs [role="tab"]')]
		expect(tabs.map(({ textContent }) => textContent?.trim())).toEqual([
			'Changes',
			'Full documents',
			'Markdown source',
		])
		expect(el.querySelectorAll('[role="tablist"]')).toHaveLength(1)
		const selectedId = el.querySelector('[aria-current="true"][data-comparison-select]')?.getAttribute('data-comparison-select')

		tab(el, 'Changes').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
		await vi.waitFor(() => expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true'))
		tab(el, 'Full documents').dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
		await vi.waitFor(() => expect(tab(el, 'Markdown source').getAttribute('aria-selected')).toBe('true'))
		tab(el, 'Markdown source').dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
		await vi.waitFor(() => expect(tab(el, 'Changes').getAttribute('aria-selected')).toBe('true'))
		tab(el, 'Changes').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
		await vi.waitFor(() => expect(tab(el, 'Markdown source').getAttribute('aria-selected')).toBe('true'))
		tab(el, 'Markdown source').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
		await vi.waitFor(() => expect(tab(el, 'Changes').getAttribute('aria-selected')).toBe('true'))
		expect(el.querySelector(`[aria-current="true"][data-comparison-select="${selectedId}"]`)).not.toBeNull()
		expect(el.querySelector('[aria-label="Rendered comparison mode"]')).toBeNull()
		comparison.destroy()
	})

	it('renders Atlas as one compact, complete, ordered changelog', async () => {
		class ResizeObserverMock {
			observe() {}
			disconnect() {}
			unobserve() {}
		}
		vi.stubGlobal('ResizeObserver', ResizeObserverMock)
		const el = document.createElement('div')
		document.body.append(el)
		const comparison = await createMarkdownContentComparison({
			beforeContent: ATLAS_INITIAL_CONTENT,
			afterContent: ATLAS_CURRENT_CONTENT,
			el,
		})
		const list = el.querySelector('.text-comparison__change-list')!
		const records = [...list.querySelectorAll<HTMLElement>('[data-comparison-select]')]
		expect(records.length).toBeLessThan(35)
		expect(records.length).toBeGreaterThan(10)
		expect(el.querySelector('.text-comparison__changes-count')?.textContent).toContain(`${records.length} changes`)
		for (const record of records) {
			expect(record.querySelector('.text-comparison__operation')).not.toBeNull()
			expect(record.querySelector('.text-comparison__change-label')?.textContent?.trim()).not.toBe('')
			expect(record.querySelector('.text-comparison__change-context')?.textContent?.trim()).not.toBe('')
			expect(record.querySelector('.text-comparison__preview')?.textContent?.trim()).not.toBe('')
			expect(record.getAttribute('aria-label')).toContain(record.querySelector('.text-comparison__preview')?.textContent?.trim())
			const blockLevel = Boolean(record.querySelector('.text-comparison__detail-badge'))
			expect(record.getAttribute('aria-label')?.includes('Block-level; fine inline detail is unavailable'))
				.toBe(blockLevel)
		}
		expect(records.some((record) => record.textContent?.includes('edits'))).toBe(true)
		expect(records[0]?.getAttribute('aria-current')).toBe('true')
		comparison.destroy()
		el.remove()
	})

	it('preserves every inline preview when one paragraph contains multiple edits', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Keep old middle stale end',
			afterContent: 'Keep new middle fresh end',
			el,
		})
		const records = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')]
		expect(records).toHaveLength(1)
		expect(records[0]!.querySelector('.text-comparison__change-label')?.textContent).toContain('2 edits')
		expect([...records[0]!.querySelectorAll('del')].map(({ textContent }) => textContent)).toEqual(['old', 'stale'])
		expect([...records[0]!.querySelectorAll('ins')].map(({ textContent }) => textContent)).toEqual(['new', 'fresh'])
		expect(records[0]!.getAttribute('aria-label')).toContain('old → new')
		expect(records[0]!.getAttribute('aria-label')).toContain('stale → fresh')
		comparison.destroy()
	})

	it('uses a heading rename only on the heading row and names its section once above the rows', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: '# Release plan\n\nBefore objective\n\nBefore owner',
			afterContent: '# Launch plan\n\nAfter objective\n\nAfter owner',
			el,
		})
		const records = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')]
		const heading = records.find((record) => record.querySelector('.text-comparison__change-label')?.textContent?.includes('Heading'))
		expect(heading?.querySelector('.text-comparison__change-context')?.textContent)
			.toBe('Release plan → Launch plan')
		// The renamed section is named once, by its heading, rather than repeated on every row.
		expect([...el.querySelectorAll<HTMLElement>('.text-comparison__section-title')]
			.map((section) => section.textContent?.trim()))
			.toEqual(['Launch plan'])
		const descendants = records.filter((record) => record !== heading)
		expect(descendants).toHaveLength(2)
		expect(descendants.every((record) => record.querySelector('.text-comparison__change-context')?.textContent === 'Paragraph'))
			.toBe(true)
		comparison.destroy()
	})

	it('does not describe an inserted heading as a rename from its absent-side anchor', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: '# Alpha\n\nalpha body\n\n# Beta\n\nbeta body',
			afterContent: '# Alpha\n\nalpha body\n\n# Inserted\n\nfresh body\n\n# Beta\n\nbeta body',
			el,
		})
		const heading = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')]
			.find((record) => record.querySelector('.text-comparison__change-label')?.textContent === 'Heading added')

		expect(heading).toBeDefined()
		expect(heading!.querySelector('.text-comparison__change-context')?.textContent).toBe('Heading')
		expect(heading!.getAttribute('aria-label')).not.toContain('Beta → Inserted')
		comparison.destroy()
	})

	it('names a deleted paragraph by what it was, not by where it collapsed to', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: '# Alpha\n\nremove me\n\nstable anchor',
			afterContent: '# Alpha\n\nstable anchor',
			el,
		})
		const labels = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')]
			.map((record) => record.querySelector('.text-comparison__change-label')?.textContent)
		// A delete's After context is the heading it collapsed into, so reading
		// that side reports a removed paragraph as "Heading removed".
		expect(labels).toContain('Paragraph removed')
		expect(labels).not.toContain('Heading removed')
		comparison.destroy()
	})

	it('leads with the label when the passage reads the same on both sides', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Follow the [operator runbook](https://example.invalid/a).',
			afterContent: 'Follow the [operator runbook](https://example.invalid/b).',
			el,
		})
		const record = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')]
			.find((candidate) => candidate.querySelector('.text-comparison__change-label')?.textContent === 'Link target changed')
		expect(record).toBeDefined()
		// Only the href moved, so the row must not read "operator runbook → operator runbook"
		// with the words in its most prominent slot and the actual change buried beneath.
		expect(record!.querySelector('.text-comparison__preview')?.textContent).not.toContain('→')
		expect(record!.getAttribute('aria-label')).not.toContain('operator runbook → operator runbook')
		expect([...record!.querySelector('.text-comparison__change-copy')!.classList])
			.toContain('text-comparison__change-copy--label-first')
		comparison.destroy()
	})

	it('exposes each section as a heading whose name carries the kinds its swatch shows', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: '# Alpha\n\nplain body text\n\n# Beta\n\nuntouched tail',
			afterContent: '# Alpha\n\nrewritten body text\n\n# Beta\n\nuntouched tail',
			el,
		})
		const toggle = el.querySelector<HTMLElement>('[data-comparison-section]')!
		expect(toggle.closest('h3')).not.toBeNull()
		expect(toggle.getAttribute('aria-expanded')).toBe('true')
		// The coloured dots are aria-hidden, so the kinds must survive in the name.
		expect(toggle.getAttribute('aria-label')).toContain('Alpha')
		expect(toggle.getAttribute('aria-label')).toContain('Content')
		expect(el.querySelectorAll('.text-comparison__kind-dot').length).toBeGreaterThan(0)
		comparison.destroy()
	})

	it('distinguishes repeated semantic labels by section heading and preview', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: '# Alpha\n\n- [ ] Publish alpha\n\n# Beta\n\n- [ ] Publish beta',
			afterContent: '# Alpha\n\n- [x] Publish alpha\n\n# Beta\n\n- [x] Publish beta',
			el,
		})
		expect([...el.querySelectorAll<HTMLElement>('.text-comparison__section-title')]
			.map((section) => section.textContent?.trim()))
			.toEqual(expect.arrayContaining(['Alpha', 'Beta']))
		const records = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')]
			.filter((record) => record.querySelector('.text-comparison__change-label')?.textContent === 'Task state changed')
		expect(records).toHaveLength(2)
		expect(new Set(records.map((record) => record.querySelector('.text-comparison__preview')?.textContent)).size).toBe(2)
		// The section reaches assistive technology once, through the group each
		// row sits in, rather than being repeated on every row's own label.
		const sections = records.map((record) => {
			const group = record.closest('[role="group"]')!
			return el.querySelector(`[id="${group.getAttribute('aria-labelledby')}"]`)?.textContent ?? ''
		})
		expect(sections[0]).toContain('Alpha')
		expect(sections[1]).toContain('Beta')
		expect(records.every((record) => !record.getAttribute('aria-label')?.includes('Section:'))).toBe(true)
		comparison.destroy()
	})

	it('shows Block-level only for coarse descriptors', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: `Before ${'a'.repeat(4600)}\n\nKeep before`,
			afterContent: `After ${'b'.repeat(4600)}\n\nKeep after`,
			el,
		})
		const records = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')]
		expect(records.some((record) => record.querySelector('.text-comparison__detail-badge'))).toBe(true)
		expect(records.some((record) => !record.querySelector('.text-comparison__detail-badge'))).toBe(true)
		for (const record of records) {
			const badge = record.querySelector('.text-comparison__detail-badge')
			if (badge) {
				expect(badge.textContent).toBe('Block-level')
				expect(record.getAttribute('aria-label')).toContain('Block-level; fine inline detail is unavailable')
			}
		}
		comparison.destroy()
	})

	it('filters formatting records with deterministic next-then-previous fallback', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Plain first\n\nKeep second\n\nBefore third',
			afterContent: '**Plain first**\n\nKeep second\n\nAfter third',
			el,
		})
		const records = [...el.querySelectorAll<HTMLButtonElement>('[data-comparison-select]')]
		const formatting = records.find((record) => record.textContent?.includes('Bold added'))!
		expect(formatting).toBeDefined()
		expect(formatting.querySelector('.text-comparison__preview')?.textContent?.trim()).toBe('Plain first')
		expect(formatting.getAttribute('aria-label')).not.toContain('→')
		const formattingIndex = records.indexOf(formatting)
		const expected = records.slice(formattingIndex + 1).find((record) => record !== formatting)
			?? records.slice(0, formattingIndex).at(-1)!
		formatting.click()
		await vi.waitFor(() => expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true'))
		tab(el, 'Changes').click()
		await vi.waitFor(() => expect(tab(el, 'Changes').getAttribute('aria-selected')).toBe('true'))
		setFormattingFilter(el, true)
		await vi.waitFor(() => expect(el.querySelector(`[data-comparison-select="${formatting.dataset.comparisonSelect}"]`)).toBeNull())
		expect(el.querySelector('[aria-current="true"][data-comparison-select]')?.getAttribute('data-comparison-select'))
			.toBe(expected.dataset.comparisonSelect)
		comparison.destroy()
	})

	it('replaces a pending single-pane target when filtering its descriptor', async () => {
		const callbacks: ResizeObserverCallback[] = []
		class ResizeObserverMock {
			constructor(callback: ResizeObserverCallback) { callbacks.push(callback) }
			observe() {}
			disconnect() {}
			unobserve() {}
		}
		vi.stubGlobal('ResizeObserver', ResizeObserverMock)
		const el = document.createElement('div')
		document.body.append(el)
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Plain first\n\nBefore second',
			afterContent: '**Plain first**\n\nAfter second',
			el,
		})
		callbacks[0]!([{ contentRect: { width: 700 } } as ResizeObserverEntry], {} as ResizeObserver)
		await Promise.resolve()
		const records = [...el.querySelectorAll<HTMLButtonElement>('[data-comparison-select]')]
		const formatting = records.find((record) => record.textContent?.includes('Bold added'))!
		const formattingIndex = records.indexOf(formatting)
		const fallback = records.slice(formattingIndex + 1).find((record) => record !== formatting)
			?? records.slice(0, formattingIndex).at(-1)!
		const afterGeometry = documentGeometry(el, 'after', fallback.dataset.comparisonSelect!, 900, 0)

		formatting.click()
		await vi.waitFor(() => expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true'))
		expect(afterGeometry.scrollTo).not.toHaveBeenCalled()
		tab(el, 'Changes').click()
		await vi.waitFor(() => expect(tab(el, 'Changes').getAttribute('aria-selected')).toBe('true'))
		setFormattingFilter(el, true)
		await vi.waitFor(() => expect(el.querySelector('[aria-current="true"][data-comparison-select]')?.getAttribute('data-comparison-select'))
			.toBe(fallback.dataset.comparisonSelect))
		tab(el, 'Full documents').click()
		sideTab(el, 'After').click()
		await vi.waitFor(() => expect(afterGeometry.scrollTo).toHaveBeenCalledOnce())

		comparison.destroy()
		el.remove()
	})

	it('shows a focused filtered-empty state for formatting-only changes', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Release ready',
			afterContent: 'Release **ready**',
			el,
		})
		setFormattingFilter(el, true)
		await vi.waitFor(() => expect(el.querySelector('[data-comparison-empty="filtered"]')?.textContent)
			.toContain('All rendered changes are formatting-only and hidden'))
		expect(el.querySelector('[data-comparison-select]')).toBeNull()
		expect(el.querySelector('[data-comparison-change]')).toBeNull()
		comparison.destroy()
	})

	it('selecting a distant move opens Full documents and independently centers both sides', async () => {
		const before = '# Start\n\nStart text\n\n## Moved\n\nMoved text\n\n## End\n\nEnd text'
		const after = '## Moved\n\nMoved text\n\n# Start\n\nStart text\n\n## End\n\nEnd text'
		const el = document.createElement('div')
		document.body.append(el)
		const comparison = await createMarkdownContentComparison({ beforeContent: before, afterContent: after, el })
		const record = [...el.querySelectorAll<HTMLButtonElement>('[data-comparison-select]')]
			.find((candidate) => candidate.textContent?.includes('Moved section'))!
		expect(record).toBeDefined()
		const id = record.dataset.comparisonSelect!
		const beforeGeometry = documentGeometry(el, 'before', id, 1500, 40)
		const afterGeometry = documentGeometry(el, 'after', id, 700, 90)

		record.focus()
		record.click()
		await vi.waitFor(() => expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true'))
		expect(beforeGeometry.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 1250 }))
		expect(afterGeometry.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 500 }))
		expect(document.activeElement).toBe(record)
		expect(el.querySelector('[aria-live="polite"]')?.textContent).toContain('Moved section')
		expect(el.querySelectorAll(`.text-comparison-change--current[data-comparison-change="${id}"]`).length)
			.toBeGreaterThanOrEqual(2)
		comparison.destroy()
		el.remove()
	})

	it('keeps the document navigation live region mounted before the first selection', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el })
		const liveRegion = el.querySelector('[data-comparison-announcement][aria-live="polite"]')
		expect(liveRegion).not.toBeNull()
		expect(liveRegion?.textContent).toBe('')

		el.querySelector<HTMLButtonElement>('[data-comparison-select]')!.click()
		await vi.waitFor(() => expect(liveRegion?.textContent).toContain('Change 1 of 1'))
		expect(liveRegion).toBe(el.querySelector('[data-comparison-announcement]'))
		comparison.destroy()
	})

	it('locates an insertion through its compact empty-side boundary target', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Before\n\nAfter anchor',
			afterContent: 'Before\n\nInserted\n\nAfter anchor',
			el,
		})
		const record = [...el.querySelectorAll<HTMLButtonElement>('[data-comparison-select]')]
			.find((candidate) => candidate.textContent?.includes('added'))!
		const id = record.dataset.comparisonSelect!
		const beforeGeometry = documentGeometry(el, 'before', id, 600, 0)
		const afterGeometry = documentGeometry(el, 'after', id, 900, 0)
		expect(beforeGeometry.target.classList).toContain('text-comparison-change--empty')
		expect(beforeGeometry.target.getAttribute('role')).toBe('note')
		record.click()
		await vi.waitFor(() => expect(beforeGeometry.scrollTo).toHaveBeenCalled())
		expect(afterGeometry.scrollTo).toHaveBeenCalled()
		const currentEmptyTarget = `[data-comparison-change="${id}"].text-comparison-change--empty[aria-current="true"]`
		await vi.waitFor(() => expect(el.querySelector(currentEmptyTarget)).not.toBeNull())
		comparison.destroy()
	})

	it('uses the same two-pane location path for Previous and Next', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Before one\n\nSame\n\nBefore two',
			afterContent: 'After one\n\nSame\n\nAfter two',
			el,
		})
		tab(el, 'Full documents').click()
		await vi.waitFor(() => expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true'))
		const ids = [...el.querySelectorAll<HTMLElement>('[data-comparison-select]')].map(({ dataset }) => dataset.comparisonSelect!)
		expect(ids).toHaveLength(2)
		const nextBefore = documentGeometry(el, 'before', ids[1]!, 800, 0)
		const nextAfter = documentGeometry(el, 'after', ids[1]!, 1000, 0)
		button(el, 'Next').click()
		await vi.waitFor(() => expect(nextBefore.scrollTo).toHaveBeenCalled())
		expect(nextAfter.scrollTo).toHaveBeenCalled()
		expect(el.querySelector(`[data-comparison-change="${ids[1]}"][aria-current="true"]`)).not.toBeNull()

		const previousBefore = documentGeometry(el, 'before', ids[0]!, 500, 0)
		const previousAfter = documentGeometry(el, 'after', ids[0]!, 650, 0)
		button(el, 'Previous').click()
		await vi.waitFor(() => expect(previousBefore.scrollTo).toHaveBeenCalled())
		expect(previousAfter.scrollTo).toHaveBeenCalled()
		comparison.destroy()
	})

	it('disables document navigation when only one change is available', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Before',
			afterContent: 'After',
			el,
		})
		tab(el, 'Full documents').click()
		await vi.waitFor(() => expect(tab(el, 'Full documents').getAttribute('aria-selected')).toBe('true'))
		expect(button(el, 'Previous').disabled).toBe(true)
		expect(button(el, 'Next').disabled).toBe(true)
		comparison.destroy()
	})

	it('reports hidden formatting in Full documents and offers Show', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Plain first\n\nBefore second',
			afterContent: '**Plain first**\n\nAfter second',
			el,
		})
		setFormattingFilter(el, true)
		tab(el, 'Full documents').click()
		await vi.waitFor(() => expect(el.querySelector('[data-comparison-hidden-formatting]')?.textContent)
			.toContain('1 formatting change hidden'))
		button(el, 'Show').click()
		await vi.waitFor(() => expect(el.querySelector('[data-comparison-hidden-formatting]')).toBeNull())
		tab(el, 'Changes').click()
		await vi.waitFor(() => expect(el.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked).toBe(false))
		comparison.destroy()
	})

	it('preserves paired scroll positions through view switches', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el })
		tab(el, 'Full documents').click()
		const beforeScroller = el.querySelector<HTMLElement>('.text-comparison__document--before .text-comparison__document-scroller')!
		const afterScroller = el.querySelector<HTMLElement>('.text-comparison__document--after .text-comparison__document-scroller')!
		beforeScroller.scrollTop = 125
		afterScroller.scrollTop = 475
		tab(el, 'Changes').click()
		tab(el, 'Full documents').click()
		await Promise.resolve()
		expect(beforeScroller.scrollTop).toBe(125)
		expect(afterScroller.scrollTop).toBe(475)
		comparison.destroy()
	})

	it('keeps a pending target and separate scroll position for each single pane', async () => {
		const callbacks: ResizeObserverCallback[] = []
		class ResizeObserverMock {
			constructor(callback: ResizeObserverCallback) { callbacks.push(callback) }
			observe() {}
			disconnect() {}
			unobserve() {}
		}
		vi.stubGlobal('ResizeObserver', ResizeObserverMock)
		const el = document.createElement('div')
		document.body.append(el)
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'Before one\n\nBefore two',
			afterContent: 'After one\n\nAfter two',
			el,
		})
		callbacks[0]!([{ contentRect: { width: 700 } } as ResizeObserverEntry], {} as ResizeObserver)
		await Promise.resolve()
		const record = el.querySelector<HTMLButtonElement>('[data-comparison-select]')!
		const id = record.dataset.comparisonSelect!
		const beforeGeometry = documentGeometry(el, 'before', id, 700, 10)
		const afterGeometry = documentGeometry(el, 'after', id, 1100, 30)
		record.click()
		await vi.waitFor(() => expect(beforeGeometry.scrollTo).toHaveBeenCalledOnce())
		expect(afterGeometry.scrollTo).not.toHaveBeenCalled()
		beforeGeometry.scroller.scrollTop = 321
		const beforeTab = sideTab(el, 'Before')
		beforeTab.focus()
		beforeTab.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
		await vi.waitFor(() => expect(afterGeometry.scrollTo).toHaveBeenCalledOnce())
		expect(sideTab(el, 'After').getAttribute('aria-selected')).toBe('true')
		expect(document.activeElement).toBe(sideTab(el, 'After'))
		afterGeometry.scroller.scrollTop = 654
		sideTab(el, 'Before').click()
		await Promise.resolve()
		expect(beforeGeometry.scrollTo).toHaveBeenCalledOnce()
		expect(beforeGeometry.scroller.scrollTop).toBe(321)
		sideTab(el, 'After').click()
		await Promise.resolve()
		expect(afterGeometry.scrollTo).toHaveBeenCalledOnce()
		expect(afterGeometry.scroller.scrollTop).toBe(654)
		comparison.destroy()
		el.remove()
	})

	it('derives paired and single geometry only from the comparison container', async () => {
		const callbacks: ResizeObserverCallback[] = []
		class ResizeObserverMock {
			constructor(callback: ResizeObserverCallback) { callbacks.push(callback) }
			observe() {}
			disconnect() {}
			unobserve() {}
		}
		vi.stubGlobal('ResizeObserver', ResizeObserverMock)
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el })
		const root = el.querySelector<HTMLElement>('.text-comparison')!
		const resize = async (containerWidth: number, viewportWidth: number) => {
			Object.defineProperty(window, 'innerWidth', { configurable: true, value: viewportWidth })
			callbacks[0]!([{ contentRect: { width: containerWidth } } as ResizeObserverEntry], {} as ResizeObserver)
			await Promise.resolve()
		}
		expect(callbacks).toHaveLength(1)
		await resize(1200, 500)
		expect(root.classList).toContain('text-comparison--paired')
		await resize(900, 1600)
		expect(root.classList).toContain('text-comparison--paired')
		await resize(0, 1600)
		expect(root.classList).toContain('text-comparison--paired')
		await resize(700, 1600)
		expect(root.classList).toContain('text-comparison--single')
		tab(el, 'Full documents').click()
		await vi.waitFor(() => expect(el.querySelector('[aria-label="Version to display"]')).not.toBeNull())
		comparison.destroy()
	})

	it('renders complete original documents in independent scrollers', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: 'A old\n\nB\n\nC\n\nD\n\nE\n\nF\n\nG\n\nH',
			afterContent: 'A new\n\nB\n\nC\n\nD\n\nE\n\nF\n\nG\n\nInserted\n\nH',
			el,
		})
		for (const editor of el.querySelectorAll('.ProseMirror')) {
			expect(editor.textContent).toContain('C')
			expect(editor.textContent).toContain('G')
		}
		expect(el.querySelectorAll('.text-comparison__document-scroller')).toHaveLength(2)
		const scrollHints = [...el.querySelectorAll('[data-comparison-independent-scrolling]')]
		expect(scrollHints).toHaveLength(2)
		expect(scrollHints.every(({ textContent }) => textContent?.includes('Independent scroll'))).toBe(true)
		expect(el.querySelector('.text-comparison__document-guidance')).toBeNull()
		expect(el.querySelector('.text-comparison__document--before .text-comparison__sr-only')?.textContent)
			.toContain('line-through')
		expect(el.querySelector('.text-comparison__documents')?.parentElement?.classList).toContain('text-comparison')
		comparison.destroy()
	})

	it('owns exactly one root ResizeObserver and disconnects it on destroy', async () => {
		const observers: Array<{ disconnect: ReturnType<typeof vi.fn>, observe: ReturnType<typeof vi.fn> }> = []
		class ResizeObserverMock {
			disconnect = vi.fn()
			observe = vi.fn()
			unobserve = vi.fn()
			constructor() { observers.push(this) }
		}
		vi.stubGlobal('ResizeObserver', ResizeObserverMock)
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el })
		expect(observers).toHaveLength(1)
		expect(observers[0]!.observe).toHaveBeenCalledWith(el.querySelector('.text-comparison'))
		comparison.destroy()
		expect(observers[0]!.disconnect).toHaveBeenCalledOnce()
	})

	it('renders HTML-like source literally without creating executable elements', async () => {
		const el = document.createElement('div')
		const comparison = await createMarkdownContentComparison({
			beforeContent: '<script>globalThis.pwned = true</script>',
			afterContent: '<img src=x onerror="globalThis.pwned = true">',
			el,
		})
		tab(el, 'Markdown source').click()
		await vi.waitFor(() => expect(el.textContent).toContain('onerror'))
		expect(el.querySelector('script')).toBeNull()
		expect(el.querySelector('img')).toBeNull()
		expect((globalThis as { pwned?: boolean }).pwned).toBeUndefined()
		comparison.destroy()
	})

	it('unmounts and removes its root when onLoaded fails', async () => {
		const el = document.createElement('div')
		await expect(createMarkdownContentComparison({
			afterContent: 'After',
			beforeContent: 'Before',
			el,
			onLoaded() {
				throw new Error('loaded callback failed')
			},
		})).rejects.toThrow('loaded callback failed')
		expect(el.childElementCount).toBe(0)
	})
})

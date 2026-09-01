/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/vue-3'
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import * as markdownComparison from '../../comparison/markdownComparison.ts'
import { createMarkdownContentComparison } from '../../createMarkdownContentComparison.ts'

const originalScrollTo = HTMLElement.prototype.scrollTo

beforeAll(async () => {
	HTMLElement.prototype.scrollTo = vi.fn()
	await Promise.all([
		import('../../components/MarkdownContentComparison.vue'),
		import('../../components/MarkdownSourceFallback.vue'),
	])
})

afterAll(() => {
	if (originalScrollTo) {
		HTMLElement.prototype.scrollTo = originalScrollTo
	} else {
		delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTo
	}
})

afterEach(() => vi.restoreAllMocks())

describe('Markdown comparison factory fallback and lifecycle', () => {
	it('V09 reports syntax-only Markdown as no semantic edit and opens Source', async () => {
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({
			beforeContent: '*same rendered text*',
			afterContent: '_same rendered text_',
			el,
		})

		expect(el.querySelectorAll('[data-comparison-change]')).toHaveLength(0)
		expect(el.querySelector('[role="status"]')?.textContent).toContain('No rendered differences')
		const openSource = el.querySelector<HTMLButtonElement>('[data-comparison-empty-action]')
		expect(openSource).not.toBeNull()
		openSource!.click()
		await nextTick()
		expect([...el.querySelectorAll<HTMLElement>('[role="tab"]')]
			.find(({ textContent }) => textContent?.trim() === 'Markdown source')
			?.getAttribute('aria-selected')).toBe('true')
		instance.destroy()
	})

	it('F05 remounts complete Source when rendered editor initialization fails', async () => {
		vi.spyOn(Editor.prototype, 'mount').mockImplementation(() => {
			throw new Error('forced mount failure')
		})
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({ beforeContent: '<b>before</b>', afterContent: '<i>after</i>', el })
		expect(el.querySelector('[data-comparison-source-fallback]')).not.toBeNull()
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(0)
		expect(el.textContent).toContain('<b>before</b>')
		expect(el.textContent).toContain('<i>after</i>')
		instance.destroy()
		instance.destroy()
		expect(el.childElementCount).toBe(0)
	})

	it('F06 remounts complete Source without partial Documents when projection fails', async () => {
		const originalSetAttribute = Element.prototype.setAttribute
		vi.spyOn(Element.prototype, 'setAttribute').mockImplementation(function(this: Element, name, value) {
			if (name === 'data-comparison-change') {
				throw new Error('forced projection failure')
			}
			return originalSetAttribute.call(this, name, value)
		})
		const beforeContent = 'Complete projection before'
		const afterContent = 'Complete projection after'
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({ beforeContent, afterContent, el })
		const fullDocuments = [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
			.find(({ textContent }) => textContent?.trim() === 'Full documents')

		fullDocuments!.click()
		await vi.waitFor(() => {
			expect(el.querySelector('[data-comparison-source-fallback]')).not.toBeNull()
		})
		expect(el.querySelectorAll('.text-comparison__documents .ProseMirror')).toHaveLength(0)
		expect(el.textContent).toContain(beforeContent)
		expect(el.textContent).toContain(afterContent)
		instance.destroy()
	})

	it('V12 can reopen the same pair after idempotent destroy without leaking root DOM', async () => {
		const el = document.createElement('div')
		for (let index = 0; index < 2; index++) {
			const instance = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el })
			expect(el.querySelectorAll('.text-comparison-root')).toHaveLength(1)
			instance.destroy()
			instance.destroy()
			expect(el.childElementCount).toBe(0)
		}
	})

	it('keeps both document editors alive while switching views', async () => {
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el })
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(0)
		expect(el.querySelectorAll('[data-comparison-source-fallback]')).toHaveLength(0)
		const selectTab = async (label: string) => {
			const tab = [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
				.find(({ textContent }) => textContent?.trim() === label)
			expect(tab).toBeDefined()
			tab!.click()
			await nextTick()
		}

		await selectTab('Full documents')
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(2)
		await selectTab('Changes')
		await selectTab('Full documents')

		expect(el.querySelector('.text-comparison > [data-comparison-source-fallback]')).toBeNull()
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(2)
		instance.destroy()
	})

	it('omits duplicate heading anchors from the two comparison documents', async () => {
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({
			beforeContent: '# Shared heading\n\nBefore',
			afterContent: '# Shared heading\n\nAfter',
			el,
		})
		const documents = [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
			.find(({ textContent }) => textContent?.trim() === 'Full documents')

		documents!.click()
		await nextTick()

		await vi.waitFor(() => expect(el.querySelectorAll('.ProseMirror')).toHaveLength(2))
		await new Promise((resolve) => setTimeout(resolve, 0))
		expect(el.querySelectorAll('.text-comparison__documents .heading-anchor[id]')).toHaveLength(0)
		instance.destroy()
	})

	it('AUD-02 publishes the current selection when Documents mounts lazily', async () => {
		const originalScrollTo = HTMLElement.prototype.scrollTo
		const scrollTo = vi.fn()
		HTMLElement.prototype.scrollTo = scrollTo
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({
			beforeContent: 'Old first.\n\nOld second.',
			afterContent: 'New first.\n\nNew second.',
			el,
		})
		const secondEdit = el.querySelectorAll<HTMLButtonElement>('[data-comparison-select]')[1]

		secondEdit!.click()
		await vi.waitFor(() => {
			expect(el.querySelectorAll('[data-comparison-change="change-1"][aria-current="true"]')).toHaveLength(2)
		})
		await vi.waitFor(() => expect(scrollTo).toHaveBeenCalled())
		instance.destroy()
		if (originalScrollTo) {
			HTMLElement.prototype.scrollTo = originalScrollTo
		} else {
			delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTo
		}
	})

	it('AUD-11 locates the current edit on the newly visible side after a single-to-paired resize', async () => {
		const originalResizeObserver = globalThis.ResizeObserver
		const originalScrollTo = HTMLElement.prototype.scrollTo
		const scrollTo = vi.fn()
		let resizeTo!: (width: number) => void
		HTMLElement.prototype.scrollTo = scrollTo
		globalThis.ResizeObserver = class {
			constructor(private readonly callback: ResizeObserverCallback) {}

			observe(target: Element) {
				resizeTo = (width) => this.callback([{ target, contentRect: { width } } as ResizeObserverEntry], this)
				resizeTo(600)
			}

			disconnect() {}

			unobserve() {}
		} as typeof ResizeObserver
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({
			beforeContent: 'Old first.\n\nOld second.',
			afterContent: 'New first.\n\nNew second.',
			el,
		})
		try {
			el.querySelectorAll<HTMLButtonElement>('[data-comparison-select]')[1]!.click()
			await vi.waitFor(() => expect(el.querySelector('.text-comparison--single')).not.toBeNull())
			const afterScroller = el.querySelector<HTMLElement>('.text-comparison__document--after .text-comparison__document-scroller')!
			await vi.waitFor(() => expect(scrollTo).toHaveBeenCalled())
			expect(scrollTo.mock.contexts).not.toContain(afterScroller)

			resizeTo(900)
			await vi.waitFor(() => expect(el.querySelector('.text-comparison--paired')).not.toBeNull())

			expect(scrollTo.mock.contexts).toContain(afterScroller)
		} finally {
			instance.destroy()
			globalThis.ResizeObserver = originalResizeObserver
			if (originalScrollTo) {
				HTMLElement.prototype.scrollTo = originalScrollTo
			} else {
				delete (HTMLElement.prototype as Partial<HTMLElement>).scrollTo
			}
		}
	})

	it('keeps the working comparison when the loaded callback throws', async () => {
		const el = document.createElement('div')
		const creation = createMarkdownContentComparison({
			beforeContent: 'Before',
			afterContent: 'After',
			el,
			onLoaded: () => { throw new Error('callback failure') },
		})
		const instance = await Promise.race([
			creation,
			new Promise<null>((resolve) => setTimeout(() => resolve(null), 1000)),
		])
		expect(instance).not.toBeNull()
		expect(el.querySelector('.text-comparison')).not.toBeNull()
		expect(el.querySelector('[data-comparison-source-fallback]')).toBeNull()
		instance?.destroy()
	})

	it('AUD-21 awaits a rejected loaded callback and keeps the working comparison', async () => {
		const el = document.createElement('div')
		let rejectLoaded!: (error: Error) => void
		const onLoaded = vi.fn(() => new Promise<void>((_resolve, reject) => {
			rejectLoaded = reject
		}))
		const creation = createMarkdownContentComparison({
			beforeContent: 'Before',
			afterContent: 'After',
			el,
			onLoaded,
		})
		let creationSettled = false
		void creation.then(() => {
			creationSettled = true
		})
		await new Promise((resolve) => setTimeout(resolve, 0))

		expect(onLoaded).toHaveBeenCalledOnce()
		expect(creationSettled).toBe(false)
		rejectLoaded(new Error('async callback failure'))
		const instance = await creation

		expect(el.querySelector('.text-comparison')).not.toBeNull()
		expect(el.querySelector('[data-comparison-source-fallback]')).toBeNull()
		instance.destroy()
	})

	it('F07 routes a descriptor model limit to complete Source', async () => {
		vi.spyOn(markdownComparison, 'createMarkdownComparisonModel').mockImplementation(() => {
			throw new markdownComparison.ComparisonModelLimitError()
		})
		const beforeContent = '# Complete before snapshot\n\nBefore body\n'
		const afterContent = '# Complete after snapshot\n\nAfter body\n'
		const el = document.createElement('div')

		const instance = await createMarkdownContentComparison({ beforeContent, afterContent, el })

		expect(el.querySelector('[data-comparison-source-fallback]')).not.toBeNull()
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(0)
		expect(el.textContent).toContain('Detailed rendered comparison unavailable')
		expect(el.textContent).not.toContain('No rendered changes')
		expect(el.textContent).toContain(beforeContent)
		expect(el.textContent).toContain(afterContent)
		instance.destroy()
	})
})

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

afterEach(() => {
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
})

describe('Markdown comparison factory fallback and lifecycle', () => {
	it.each([1100, 620].flatMap((width) => ['wheel', 'touchstart', 'pointerdown', 'keydown', 'settled geometry', 'three attempts']
		.map((stop) => ({ width, stop }))))('waits for usable attachment at $width px and stops opening corrections on $stop', async ({ width: initialWidth, stop }) => {
		let width = initialWidth
		let height = 0
		let resize!: () => void
		const disconnected = vi.fn()
		const frames = new Map<number, FrameRequestCallback>()
		let frameId = 0
		vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
			frames.set(++frameId, callback)
			return frameId
		})
		vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id))
		vi.stubGlobal('ResizeObserver', class {
			constructor(private readonly callback: ResizeObserverCallback) {}

			observe(target: Element) {
				resize = () => this.callback([{ target, contentRect: { width, height } } as ResizeObserverEntry], this)
			}

			disconnect = disconnected
			unobserve() {}
		})
		vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function(this: HTMLElement) {
			return this.isConnected ? width : 0
		})
		vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function(this: HTMLElement) {
			return this.isConnected ? height : 0
		})
		vi.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(2000)
		const scroll = vi.spyOn(HTMLElement.prototype, 'scrollTo').mockClear()
		const frame = async () => {
			await nextTick()
			const queued = [...frames.values()]
			frames.clear()
			for (const callback of queued) {
				await callback(0)
			}
			await nextTick()
		}
		const detached = document.createElement('div')
		const host = document.createElement('div')
		const instance = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el: detached })
		try {
			resize()
			await frame()
			expect(scroll).not.toHaveBeenCalled()
			document.body.append(host)
			host.replaceChildren(...detached.childNodes)
			resize()
			await frame()
			expect(scroll).not.toHaveBeenCalled()

			height = 300
			resize()
			await frame()
			expect(scroll).toHaveBeenCalled()
			expect(scroll.mock.calls.every(([options]) => (options as ScrollToOptions).behavior === 'auto')).toBe(true)
			const firstCalls = scroll.mock.calls.length
			width -= 40
			height = 260
			resize()
			await frame()
			expect(scroll).toHaveBeenCalledTimes(firstCalls * 2)
			if (initialWidth < 760) {
				const hidden = host.querySelector('.text-comparison__document--after .text-comparison__document-scroller')
				expect(scroll.mock.contexts).not.toContain(hidden)
			}

			if (stop === 'three attempts') {
				height = 240
				resize()
				await frame()
				expect(scroll).toHaveBeenCalledTimes(firstCalls * 3)
				height = 220
				resize()
				await frame()
				expect(scroll).toHaveBeenCalledTimes(firstCalls * 3)
			} else if (stop === 'settled geometry') {
				await frame()
				expect(scroll).toHaveBeenCalledTimes(firstCalls * 2)
			} else {
				host.querySelector('.text-comparison')!.dispatchEvent(new Event(stop))
			}
			expect(frames.size).toBe(0)
			const callsAfterStop = scroll.mock.calls.length
			height = 240
			resize()
			await frame()
			expect(scroll).toHaveBeenCalledTimes(callsAfterStop)
			instance.destroy()
			await frame()
			expect(frames.size).toBe(0)
			expect(disconnected).toHaveBeenCalledOnce()
		} finally {
			instance.destroy()
			host.remove()
		}
	})

	it.each([
		['ordinary', 'Before', 'After'],
		['formatting-only', 'Same text', '**Same text**'],
	])('opens %s changes in Documents without moving focus', async (_kind, beforeContent, afterContent) => {
		const opener = document.createElement('button')
		document.body.append(opener)
		opener.focus()
		const el = document.createElement('div')
		const onLoaded = vi.fn()
		const instance = await createMarkdownContentComparison({ beforeContent, afterContent, el, onLoaded })

		expect(el.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim()).toBe('Full documents')
		expect(el.querySelectorAll('.text-comparison__documents .ProseMirror')).toHaveLength(2)
		expect(el.querySelector('[data-comparison-change][aria-current="true"]')).not.toBeNull()
		expect(document.activeElement).toBe(opener)
		expect(onLoaded).toHaveBeenCalledOnce()
		instance.destroy()
		instance.destroy()
		opener.remove()
	})

	it('opens identical documents in Changes with the no-differences message', async () => {
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({ beforeContent: 'Same', afterContent: 'Same', el })
		expect(el.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.trim()).toBe('Changes')
		expect(el.querySelector('[role="status"]')?.textContent).toContain('No differences.')
		expect(el.querySelectorAll('.ProseMirror')).toHaveLength(0)
		instance.destroy()
	})

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
		const editors = [...el.querySelectorAll('.ProseMirror')]
		expect(editors).toHaveLength(2)
		expect(el.querySelectorAll('[data-comparison-source-fallback]')).toHaveLength(0)
		const selectTab = async (label: string) => {
			const tab = [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
				.find(({ textContent }) => textContent?.trim() === label)
			expect(tab).toBeDefined()
			tab!.click()
			await nextTick()
		}

		await selectTab('Changes')
		await selectTab('Markdown source')
		await selectTab('Full documents')

		expect(el.querySelector('.text-comparison > [data-comparison-source-fallback]')).toBeNull()
		expect([...el.querySelectorAll('.ProseMirror')]).toEqual(editors)
		instance.destroy()
	})

	it('measures Documents after revealing its persistent editors during navigation', async () => {
		const el = document.createElement('div')
		const instance = await createMarkdownContentComparison({ beforeContent: 'Before', afterContent: 'After', el })
		const selectTab = async (label: string) => {
			const tab = [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')]
				.find(({ textContent }) => textContent?.trim() === label)!
			tab.click()
			await nextTick()
		}
		try {
			await selectTab('Changes')
			const measuredDisplays: string[] = []
			vi.spyOn(HTMLElement.prototype, 'scrollTo').mockImplementation(function(this: HTMLElement) {
				measuredDisplays.push(this.closest<HTMLElement>('.text-comparison__documents')!.style.display)
			})
			await selectTab('Full documents')
			expect(measuredDisplays).toHaveLength(2)
			expect(measuredDisplays).not.toContain('none')
		} finally {
			instance.destroy()
		}
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

	it('AUD-02 updates the current selection in the mounted Documents', async () => {
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

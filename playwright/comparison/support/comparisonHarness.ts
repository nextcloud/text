/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ConsoleMessage, Page, Request, Response, TestInfo } from '@playwright/test'

import AxeBuilder from '@axe-core/playwright'
import { expect } from '@playwright/test'

const HARNESS_PATH = '/index.php/login'

export interface ComparisonContents {
	before: string
	after: string
	fileId?: number
	rejectLoaded?: boolean
	width?: number
	height?: number
}

export interface ComparisonMeasurement {
	durationMilliseconds: number
	loadedCallbackCalls: number
	rootCount: number
	proseMirrorCount: number
}

interface RuntimeFailure {
	type: 'console' | 'pageerror' | 'requestfailed' | 'response'
	message: string
	url?: string
	status?: number
}

interface ObserverCounts {
	resize: number
	mutation: number
}

export class ComparisonHarness {
	readonly page: Page
	readonly failures: RuntimeFailure[] = []
	readonly consoleMessages: Array<{ type: string, text: string }> = []
	readonly network: Array<{ method: string, status?: number, url: string, failure?: string }> = []
	#allowedFailures: RegExp[] = []

	constructor(page: Page) {
		this.page = page
		page.on('console', (message) => this.#captureConsole(message))
		page.on('pageerror', (error) => this.failures.push({ type: 'pageerror', message: error.message }))
		page.on('requestfailed', (request) => this.#captureFailedRequest(request))
		page.on('response', (response) => this.#captureResponse(response))
	}

	async open() {
		await this.page.route(`**${HARNESS_PATH}`, async (route) => {
			const response = await route.fetch()
			const headers = response.headers()
			const policy = headers['content-security-policy'] ?? ''
			if (policy && !policy.includes('worker-src')) {
				headers['content-security-policy'] = `${policy}; worker-src 'self'`
			}
			await route.fulfill({ response, headers })
		})
		await this.page.goto(HARNESS_PATH, { waitUntil: 'domcontentloaded' })
		await this.page.waitForFunction(() => Boolean(window.OC?.filePath && window.OCA))
		const textRoot = (await this.page.evaluate(() => (
			window as typeof window & { OC: { appswebroots: Record<string, string> } }
		).OC.appswebroots.text)).replace(/\/$/, '')
		const editorBundle = `${textRoot}/js/text-editor.mjs`
		await this.page.evaluate(async ({ bundle, root }) => {
			const entryUrl = new URL(`${root}/css/text-editor.css`, location.href)
			const entryResponse = await fetch(entryUrl)
			if (!entryResponse.ok) {
				throw new Error('Could not load the Text editor stylesheet entry')
			}
			const imports = [...(await entryResponse.text()).matchAll(/@import\s+['"]([^'"]+)['"]/g)]
			await Promise.all(imports.map(([, path]) => new Promise<void>((resolve, reject) => {
				const stylesheet = document.createElement('link')
				stylesheet.rel = 'stylesheet'
				stylesheet.href = new URL(path, entryUrl).href
				stylesheet.addEventListener('load', () => resolve(), { once: true })
				stylesheet.addEventListener('error', () => reject(new Error('Could not load a Text editor stylesheet chunk')), { once: true })
				document.head.append(stylesheet)
			})))
			await import(bundle)
		}, { bundle: editorBundle, root: textRoot })
		await expect.poll(() => this.page.evaluate(() => typeof window.OCA?.Text?.createMarkdownContentComparison), {
			message: `The mounted production bundle ${editorBundle} must expose the public comparison factory`,
		}).toBe('function')
		await this.page.evaluate((root) => {
			const appRoot = new URL(`${root}/`, location.href).href
			document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
				.forEach((link) => !link.href.startsWith(appRoot) && link.remove())
			const style = document.createElement('style')
			style.textContent = `
				html, body {
					--color-element-info: #007aa3;
					--color-error: #f0b5b5;
					--color-error-hover: #fbeaea;
					--color-main-background: #fff;
					--color-main-text: #222;
					--color-primary-element: #00679e;
					--color-primary-element-light: #e5f2f8;
					--color-success: #b5dfb8;
					--color-success-hover: #eaf5eb;
					--color-text-maxcontrast: #4a4a4a;
					--color-warning: #8a6116;
					block-size: 100%;
					margin: 0;
				}
				body { background: var(--color-main-background); color: var(--color-main-text); }
				#text-comparison-harness {
					box-sizing: border-box;
					color: var(--color-main-text);
					margin: 0 auto;
					overflow: hidden;
				}
			`
			const host = document.createElement('main')
			host.id = 'text-comparison-harness'
			document.head.append(style)
			document.body.removeAttribute('id')
			document.body.removeAttribute('class')
			document.body.replaceChildren(host)

			const state = {
				instances: [] as Array<{ destroy: () => void }>,
				resizeObservers: new Set<ResizeObserver>(),
				mutationObservers: new Set<MutationObserver>(),
			}
			Object.assign(window, { __textComparisonAcceptance: state })

			if (typeof ResizeObserver !== 'undefined') {
				const originalObserve = ResizeObserver.prototype.observe
				const originalDisconnect = ResizeObserver.prototype.disconnect
				ResizeObserver.prototype.observe = function(target, options) {
					state.resizeObservers.add(this)
					return originalObserve.call(this, target, options)
				}
				ResizeObserver.prototype.disconnect = function() {
					state.resizeObservers.delete(this)
					return originalDisconnect.call(this)
				}
			}
			if (typeof MutationObserver !== 'undefined') {
				const originalObserve = MutationObserver.prototype.observe
				const originalDisconnect = MutationObserver.prototype.disconnect
				MutationObserver.prototype.observe = function(target, options) {
					state.mutationObservers.add(this)
					return originalObserve.call(this, target, options)
				}
				MutationObserver.prototype.disconnect = function() {
					state.mutationObservers.delete(this)
					return originalDisconnect.call(this)
				}
			}
		}, textRoot)
		await this.page.waitForLoadState('networkidle')
		await this.page.waitForTimeout(500)
		this.resetCapture()
	}

	resetCapture() {
		this.failures.splice(0)
		this.consoleMessages.splice(0)
		this.network.splice(0)
		this.#allowedFailures = []
	}

	allowFailure(pattern: RegExp) {
		this.#allowedFailures.push(pattern)
	}

	async mount(contents: ComparisonContents): Promise<ComparisonMeasurement> {
		if (contents.rejectLoaded) {
			this.allowFailure(/acceptance forced loaded callback failure/)
		}
		return this.page.evaluate(async ({ before, after, fileId, rejectLoaded = false, width = 1100, height = 760 }) => {
			const state = window.__textComparisonAcceptance
			const host = document.querySelector<HTMLElement>('#text-comparison-harness')!
			host.style.inlineSize = `${width}px`
			host.style.blockSize = `${height}px`
			const started = performance.now()
			let loadedCallbackCalls = 0
			const instance = await window.OCA.Text.createMarkdownContentComparison({
				afterContent: after,
				beforeContent: before,
				el: host,
				fileId,
				noLazyImages: true,
				onLoaded: rejectLoaded
					? async () => {
						loadedCallbackCalls++
						throw new Error('acceptance forced loaded callback failure')
					}
					: undefined,
			})
			const durationMilliseconds = performance.now() - started
			state.instances.push(instance)
			await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
			return {
				durationMilliseconds,
				loadedCallbackCalls,
				rootCount: host.querySelectorAll('.text-comparison-root').length,
				proseMirrorCount: host.querySelectorAll('.ProseMirror').length,
			}
		}, contents)
	}

	async destroy(times = 2) {
		await this.page.evaluate((count) => {
			const state = window.__textComparisonAcceptance
			for (const instance of state.instances.splice(0)) {
				for (let index = 0; index < count; index++) {
					instance.destroy()
				}
			}
		}, times)
	}

	async observerCounts(): Promise<ObserverCounts> {
		return this.page.evaluate(() => ({
			mutation: window.__textComparisonAcceptance.mutationObservers.size,
			resize: window.__textComparisonAcceptance.resizeObservers.size,
		}))
	}

	async forceEditorInitializationFailure() {
		await this.page.evaluate(() => {
			const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML')!
			Object.defineProperty(Element.prototype, 'innerHTML', {
				...descriptor,
				set(value: string) {
					void value
					Object.defineProperty(Element.prototype, 'innerHTML', descriptor)
					throw new Error('acceptance forced editor initialization failure')
				},
			})
		})
		this.allowFailure(/acceptance forced editor initialization failure/)
	}

	async forceProjectionFailure() {
		await this.page.evaluate(() => {
			const original = Element.prototype.setAttribute
			Element.prototype.setAttribute = function(name, value) {
				if (name === 'data-comparison-change') {
					Element.prototype.setAttribute = original
					throw new Error('acceptance forced projection failure')
				}
				return original.call(this, name, value)
			}
		})
		this.allowFailure(/acceptance forced projection failure/)
	}

	async assertAccessibleComparison() {
		const violations = await this.page.locator('#text-comparison-harness').evaluate((root) => {
			const visible = (element: HTMLElement) => Boolean(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
			const violations: string[] = []
			const ids = [...root.querySelectorAll<HTMLElement>('[id]')].map(({ id }) => id)
			for (const id of new Set(ids)) {
				if (ids.filter((candidate) => candidate === id).length > 1) {
					violations.push(`duplicate id: ${id}`)
				}
			}
			for (const button of root.querySelectorAll<HTMLButtonElement>('button')) {
				if (visible(button) && !(button.getAttribute('aria-label') || button.textContent?.trim() || button.title)) {
					violations.push('visible button has no accessible name')
				}
			}
			for (const tablist of root.querySelectorAll<HTMLElement>('[role="tablist"]')) {
				const selected = [...tablist.querySelectorAll<HTMLElement>('[role="tab"]')].filter((tab) => tab.getAttribute('aria-selected') === 'true')
				if (visible(tablist) && selected.length !== 1) {
					violations.push('visible tablist must have exactly one selected tab')
				}
			}
			const liveRegion = root.querySelector('[aria-live="polite"][aria-atomic="true"]')
			if (!liveRegion) {
				violations.push('comparison has no polite atomic live region')
			}
			return violations
		})
		expect(violations).toEqual([])
		const axe = await new AxeBuilder({ page: this.page })
			.include('#text-comparison-harness')
			.analyze()
		expect(axe.violations, 'axe accessibility violations').toEqual([])
	}

	async attachEvidence(testInfo: TestInfo) {
		await testInfo.attach('comparison-console-network.json', {
			body: Buffer.from(JSON.stringify({ console: this.consoleMessages, failures: this.failures, network: this.network }, null, 2)),
			contentType: 'application/json',
		})
	}

	assertNoUnexpectedFailures() {
		const unexpected = this.failures.filter(({ message }) => !this.#allowedFailures.some((pattern) => pattern.test(message)))
		expect(unexpected, 'unexpected browser console, page, or network failures').toEqual([])
	}

	#captureConsole(message: ConsoleMessage) {
		this.consoleMessages.push({ type: message.type(), text: message.text() })
		if (message.type() === 'error') {
			this.failures.push({ type: 'console', message: message.text() })
		}
	}

	#captureFailedRequest(request: Request) {
		const failure = request.failure()?.errorText ?? 'request failed'
		this.network.push({ method: request.method(), url: request.url(), failure })
		this.failures.push({ type: 'requestfailed', message: failure, url: request.url() })
	}

	#captureResponse(response: Response) {
		this.network.push({ method: response.request().method(), status: response.status(), url: response.url() })
		if (response.status() >= 400) {
			this.failures.push({ type: 'response', message: `HTTP ${response.status()}`, status: response.status(), url: response.url() })
		}
	}
}

declare global {
	interface Window {
		OC?: { filePath?: (...parts: string[]) => string }
		__textComparisonAcceptance: {
			instances: Array<{ destroy: () => void }>
			resizeObservers: Set<ResizeObserver>
			mutationObservers: Set<MutationObserver>
		}
	}
}

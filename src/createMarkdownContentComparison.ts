/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp } from 'vue'
import { OPEN_LINK_HANDLER } from './composables/useOpenLinkHandler.ts'
import { openLink } from './helpers/links.js'

export interface MarkdownContentComparisonOptions {
	el: HTMLElement
	beforeContent: string
	afterContent: string
	fileId?: number
	filePath?: string
	shareToken?: string
	noLazyImages?: boolean
	openLinkHandler?: (href: string) => void
	onLoaded?: () => void
}

export interface MarkdownContentComparisonInstance {
	destroy: () => void
}

/**
 * Create and mount an immutable semantic Markdown comparison.
 *
 * @param options Comparison options
 */
export async function createMarkdownContentComparison(options: MarkdownContentComparisonOptions): Promise<MarkdownContentComparisonInstance> {
	if (!(options?.el instanceof HTMLElement)) {
		throw new TypeError('Comparison el must be an HTMLElement')
	}
	if (typeof options.beforeContent !== 'string' || typeof options.afterContent !== 'string') {
		throw new TypeError('beforeContent and afterContent must be strings')
	}

	const { default: MarkdownContentComparison } = await import('./components/MarkdownContentComparison.vue')
	let resolveLoaded: () => void
	let rejectLoaded: (error: unknown) => void
	let loaded = false
	const loadedPromise = new Promise<void>((resolve, reject) => {
		resolveLoaded = resolve
		rejectLoaded = reject
	})
	const onReady = () => {
		if (loaded) {
			return
		}
		loaded = true
		try {
			options.onLoaded?.()
			resolveLoaded()
		} catch (error) {
			rejectLoaded(error)
		}
	}
	const app = createApp(MarkdownContentComparison, {
		afterContent: options.afterContent,
		beforeContent: options.beforeContent,
		fileId: options.fileId,
		filePath: options.filePath,
		noLazyImages: options.noLazyImages ?? false,
		onReady,
		openLinkHandler: options.openLinkHandler ?? openLink,
		shareToken: options.shareToken,
	})
	app.config.errorHandler = (error) => {
		if (!loaded) {
			rejectLoaded(error)
			return
		}
		throw error
	}
	app.provide(OPEN_LINK_HANDLER, {
		openLink: options.openLinkHandler ?? openLink,
	})

	options.el.replaceChildren()
	const root = document.createElement('div')
	root.className = 'text-comparison-root'
	options.el.appendChild(root)
	let destroyed = false

	try {
		app.mount(root)
		await loadedPromise
	} catch (error) {
		try {
			app.unmount()
		} catch {
			// Preserve the comparison initialization error.
		}
		root.remove()
		throw error
	}

	return {
		destroy() {
			if (destroyed) {
				return
			}
			destroyed = true
			app.unmount()
			root.remove()
		},
	}
}

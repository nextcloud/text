/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp } from 'vue'
import MarkdownSourceFallback from './components/MarkdownSourceFallback.vue'
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
	onLoaded?: () => void | Promise<void>
}

export interface MarkdownContentComparisonInstance {
	destroy: () => void
}

export async function createMarkdownContentComparison(options: MarkdownContentComparisonOptions): Promise<MarkdownContentComparisonInstance> {
	if (!(options?.el instanceof HTMLElement)) {
		throw new TypeError('Comparison el must be an HTMLElement')
	}
	if (
		typeof options.beforeContent !== 'string'
		|| typeof options.afterContent !== 'string'
	) {
		throw new TypeError('beforeContent and afterContent must be strings')
	}

	const root = document.createElement('div')
	root.className = 'text-comparison-root'
	options.el.replaceChildren(root)
	let app: ReturnType<typeof createApp> | null = null
	let destroyed = false
	let fallbackPromise: Promise<void> | null = null
	let resolveReady!: () => void
	const ready = new Promise<void>((resolve) => {
		resolveReady = resolve
	})
	const onReady = () => {
		if (!destroyed) {
			resolveReady()
		}
	}
	const provide = (nextApp: ReturnType<typeof createApp>) => nextApp.provide(OPEN_LINK_HANDLER, {
		openLink: options.openLinkHandler ?? openLink,
	})

	const mountFallback = () => {
		fallbackPromise ??= (async () => {
			try {
				app?.unmount()
			} catch (error) {
				void error
			}
			root.replaceChildren()
			if (destroyed) {
				return
			}
			app = provide(createApp(MarkdownSourceFallback, {
				beforeContent: options.beforeContent,
				afterContent: options.afterContent,
			}))
			app.mount(root)
			onReady()
		})()
		return fallbackPromise
	}

	try {
		const { default: MarkdownContentComparison }
			= await import('./components/MarkdownContentComparison.vue')
		if (destroyed) {
			return { destroy() {} }
		}
		app = provide(createApp(MarkdownContentComparison, {
			beforeContent: options.beforeContent,
			afterContent: options.afterContent,
			fileId: options.fileId,
			filePath: options.filePath,
			shareToken: options.shareToken,
			noLazyImages: options.noLazyImages ?? false,
			openLinkHandler: options.openLinkHandler ?? openLink,
			onReady,
		}))
		app.config.errorHandler = () => {
			void mountFallback()
		}
		app.mount(root)
		await ready
	} catch {
		await mountFallback()
		await ready
	}
	try {
		await options.onLoaded?.()
	} catch (error) {
		void error
	}

	return {
		destroy() {
			if (destroyed) {
				return
			}
			destroyed = true
			try {
				app?.unmount()
			} finally {
				root.remove()
			}
			app = null
		},
	}
}

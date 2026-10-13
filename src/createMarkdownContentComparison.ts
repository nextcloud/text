/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp, nextTick } from 'vue'
import { OPEN_LINK_HANDLER } from './composables/useOpenLinkHandler.ts'
import { openLink } from './helpers/links.js'
import { logger } from './helpers/logger.ts'

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

/**
 * Show a comparison of two Markdown documents inside the given element, replacing its children.
 * The element may be detached from the page. Invalid options reject. The loaded callback is
 * awaited, and an error in it does not remove the comparison.
 *
 * @param options Mount element, both contents and optional file context.
 */
export async function createMarkdownContentComparison(options: MarkdownContentComparisonOptions): Promise<MarkdownContentComparisonInstance> {
	if (!(options?.el instanceof HTMLElement)) {
		throw new TypeError('Comparison el must be an HTMLElement')
	}
	if (typeof options.beforeContent !== 'string' || typeof options.afterContent !== 'string') {
		throw new TypeError('beforeContent and afterContent must be strings')
	}

	const { default: MarkdownContentComparison } = await import('./components/MarkdownContentComparison.vue')
	const root = document.createElement('div')
	root.className = 'text-comparison-root'
	options.el.replaceChildren(root)

	const app = createApp(MarkdownContentComparison, {
		beforeContent: options.beforeContent,
		afterContent: options.afterContent,
		fileId: options.fileId,
		filePath: options.filePath,
		shareToken: options.shareToken,
		noLazyImages: options.noLazyImages ?? false,
		openLinkHandler: options.openLinkHandler ?? openLink,
	})
	app.provide(OPEN_LINK_HANDLER, { openLink: options.openLinkHandler ?? openLink })
	app.mount(root)
	await nextTick()
	try {
		await options.onLoaded?.()
	} catch (error) {
		logger.error('The callback for a loaded comparison failed', { error })
	}

	return {
		destroy() {
			app.unmount()
			root.remove()
		},
	}
}

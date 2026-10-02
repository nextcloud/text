/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp, nextTick } from 'vue'
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

/**
 * Show a comparison of two Markdown documents inside the given element.
 *
 * @param options Mount element, both contents and optional file context.
 */
export async function createMarkdownContentComparison(options: MarkdownContentComparisonOptions): Promise<MarkdownContentComparisonInstance> {
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
	await options.onLoaded?.()

	return {
		destroy() {
			app.unmount()
			root.remove()
		},
	}
}

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare module '*?raw' {
	const content: string
	export default content
}

declare module '@nextcloud/vue/composables/useIsMobile' {
	import type { Ref } from 'vue'
	export function useIsMobile(): Ref<boolean>
}

declare module '@quartzy/markdown-it-mentions' {
	import type { MarkdownIt } from 'markdown-it'
	const plugin: (md: MarkdownIt) => void
	export default plugin
}

declare module 'markdown-it-image-figures' {
	import type { MarkdownIt } from 'markdown-it'
	const plugin: (md: MarkdownIt) => void
	export default plugin
}

declare module 'markdown-it-mark' {
	import type { MarkdownIt } from 'markdown-it'
	const plugin: (md: MarkdownIt) => void
	export default plugin
}

declare module 'vite/modulepreload-polyfill'

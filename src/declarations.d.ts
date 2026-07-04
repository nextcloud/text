/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare module '*?raw' {
	const content: string
	export default content
}

declare module '@nextcloud/vue/composables/useIsMobile' {
	import { Ref } from 'vue'
	export function useIsMobile(): Ref<boolean>
}

// We use `StateInline` in our custom referenceLinks markdown-it plugin
declare module 'markdown-it/lib/rules_inline/link.mjs' {
	import type StateInline from 'markdown-it/lib/rules_inline/state_inline.mjs'
	const rule: (state: StateInline, silent: boolean) => boolean
	export default rule
}

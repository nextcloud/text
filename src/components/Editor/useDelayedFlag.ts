/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ref, watch, type Ref } from 'vue'

/**
 * Delay the changing of the boolean
 * @param input - ref to react to
 */
export function useDelayedFlag(input: Ref<boolean>): { delayed: Ref<boolean> } {
	let timeout: ReturnType<typeof setTimeout> | undefined
	const delayed = ref(input.value)

	watch(input, (val) => {
		if (timeout) {
			clearTimeout(timeout)
		}
		const delay = val ? 5000 : 200
		timeout = setTimeout(() => {
			delayed.value = val
		}, delay)
	})

	return { delayed }
}

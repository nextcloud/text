/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { subscribe } from '@nextcloud/event-bus'
import { computed, ref } from 'vue'

declare module '@nextcloud/event-bus' {
	export interface NextcloudEvents {
		networkOnline: { success: boolean }
	}
}

/**
 * Get network online/offline state
 */
export function useNetworkState() {
	const offlineSince = ref(navigator.onLine ? null : Date.now())
	const networkOnline = computed(() => !offlineSince.value)

	subscribe('networkOnline', (event) => {
		if (event.success) {
			offlineSince.value = null
		}
	})
	subscribe('networkOffline', () => {
		offlineSince.value = Date.now()
	})

	return { networkOnline, offlineSince }
}

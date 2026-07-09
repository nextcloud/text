/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import { computed, onUnmounted, ref } from 'vue'

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

	const onNetworkOnline = (event: { success: boolean }) => {
		if (event.success) {
			offlineSince.value = null
		}
	}
	const onNetworkOffline = () => {
		offlineSince.value = Date.now()
	}
	subscribe('networkOnline', onNetworkOnline)
	subscribe('networkOffline', onNetworkOffline)
	onUnmounted(() => {
		unsubscribe('networkOnline', onNetworkOnline)
		unsubscribe('networkOffline', onNetworkOffline)
	})

	return { networkOnline, offlineSince }
}

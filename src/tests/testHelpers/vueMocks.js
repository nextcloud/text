/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { vi } from 'vitest'
import { ref } from 'vue'

vi.mock('vue', async () => {
	const Vue = await vi.importActual('vue')
	Vue.default.config.productionTip = false
	Vue.default.config.devtools = false
	return Vue
})

// Mock useIsMobile composable from @nextcloud/vue
vi.mock('@nextcloud/vue/composables/useIsMobile', () => ({
	useIsMobile: () => ref(false),
}))

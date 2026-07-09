/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { vi } from 'vitest'
import { ref } from 'vue'

// Mock useIsMobile composable from @nextcloud/vue
vi.mock('@nextcloud/vue/composables/useIsMobile', () => ({
	useIsMobile: () => ref(false),
}))

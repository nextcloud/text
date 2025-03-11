/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { vi } from 'vitest'

vi.mock('vue', async () => {
	const Vue = await vi.importActual('vue')
	Vue.default.config.productionTip = false
	Vue.default.config.devtools = false
	return Vue
})

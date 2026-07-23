/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { subscribe } from '@nextcloud/event-bus'
import { ref } from 'vue'

export const annotationsHidden = ref(false)

subscribe('text:annotations:toggle-visibility', () => {
	annotationsHidden.value = !annotationsHidden.value
})

/**
 * the useAnnotationsVisibility composable function
 */
export function useAnnotationsVisibility() {
	return { annotationsHidden }
}

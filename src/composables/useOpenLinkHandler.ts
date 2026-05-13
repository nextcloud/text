/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { inject } from 'vue'
import { openLink } from '../helpers/links.js'

export const OPEN_LINK_HANDLER = Symbol('editor:open-link-handler')

/**
 * Inject provided link handler
 */
export function useOpenLinkHandler() {
	const openLinkHandler = inject(OPEN_LINK_HANDLER, { openLink })
	return { openLinkHandler }
}

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { logger } from '../helpers/logger.ts'

/**
 * Put text on the clipboard. The clipboard API exists only on HTTPS, so on
 * plain HTTP the text is selected and copied the old way.
 *
 * @param text What to copy.
 * @param container Where to select it the old way: inside a dialog, which keeps the focus.
 * @return Whether it was copied.
 */
export async function copyText(text: string, container: HTMLElement = document.body): Promise<boolean> {
	if (navigator.clipboard?.writeText) {
		try {
			await navigator.clipboard.writeText(text)
			return true
		} catch (error) {
			logger.debug('Clipboard API refused, copying the old way', { error })
		}
	}
	const area = document.createElement('textarea')
	area.value = text
	area.setAttribute('readonly', '')
	area.style.position = 'fixed'
	area.style.opacity = '0'
	container.appendChild(area)
	area.select()
	try {
		return document.execCommand('copy')
	} finally {
		area.remove()
	}
}

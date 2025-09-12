/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { logger } from './logger.js'

export const isMobileApp = () => {
	return (
		window.DirectEditingMobileInterface
		|| (window.webkit
			&& window.webkit.messageHandlers
			&& window.webkit.messageHandlers.DirectEditingMobileInterface)
	)
}

export const callMobileMessage = (messageName, attributes) => {
	logger.debug(`callMobileMessage ${messageName}`, { attributes })
	let message = messageName
	if (typeof attributes !== 'undefined') {
		message = {
			MessageName: messageName,
			Values: attributes,
		}
	}
	let attributesString = null
	try {
		attributesString = JSON.stringify(attributes)
	} catch (e) {
		attributesString = null
	}

	// Forward to mobile handler
	if (
		window.DirectEditingMobileInterface
		&& typeof window.DirectEditingMobileInterface[messageName] === 'function'
	) {
		if (attributesString === null || typeof attributesString === 'undefined') {
			window.DirectEditingMobileInterface[messageName]()
		} else {
			window.DirectEditingMobileInterface[messageName](attributesString)
		}
	}

	// iOS webkit fallback
	if (
		window.webkit
		&& window.webkit.messageHandlers
		&& window.webkit.messageHandlers.DirectEditingMobileInterface
	) {
		window.webkit.messageHandlers.DirectEditingMobileInterface.postMessage(
			message,
		)
	}

	window.postMessage(message)
}

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Callback that should be executed after the document is ready
 *
 * @param callback
 */

const documentReady = function(callback) {
	const fn = () => setTimeout(callback, 0)
	if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
		fn()
	} else {
		document.addEventListener('DOMContentLoaded', callback)
	}
}

export {
	documentReady,
}

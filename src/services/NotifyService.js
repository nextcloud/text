/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import mitt from 'mitt'
import { listen } from '@nextcloud/notify_push'
import { loadState } from '@nextcloud/initial-state'

if (!window._nc_text_notify) {
	const isPushEnabled = loadState('text', 'notify_push', false)
	const useNotifyPush = isPushEnabled
		? listen('text_steps', (messageType, messageBody) => {
			window._nc_text_notify?.emit('notify_push', { messageType, messageBody })
		})
		: undefined
	window._nc_text_notify = useNotifyPush ? mitt() : null
}

export default () => {
	return window._nc_text_notify
}

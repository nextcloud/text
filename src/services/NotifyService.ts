/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import mitt, { type Emitter } from 'mitt'
import { listen } from '@nextcloud/notify_push'
import { loadState } from '@nextcloud/initial-state'

export declare type EventTypes = {
	notify_push: { messageType: unknown; messageBody: object }
}

declare global {
	interface Window {
		_nc_text_notify?: Emitter<EventTypes>
	}
}

if (!window._nc_text_notify) {
	const isPushEnabled = loadState('text', 'notify_push', false)
	const useNotifyPush = isPushEnabled
		? listen('text_steps', (messageType, messageBody) => {
				window._nc_text_notify?.emit('notify_push', {
					messageType,
					messageBody,
				})
			})
		: undefined
	window._nc_text_notify = useNotifyPush ? mitt() : undefined
}

export default () => {
	return window._nc_text_notify
}

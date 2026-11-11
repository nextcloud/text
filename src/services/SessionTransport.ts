/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { InjectionKey } from 'vue'

import { close, openContext } from '../apis/connect.ts'
import { save } from '../apis/save.ts'
import { push, sync } from '../apis/sync.ts'

/** Per-editor transport. Hosts must bind requests to their account and file. */
export interface SessionTransport {
	openContext: typeof openContext
	sync: typeof sync
	push: typeof push
	save: typeof save
	close: typeof close
}

export const browserSessionTransport: SessionTransport = { openContext, sync, push, save, close }
export const sessionTransportKey = Symbol('text:session-transport') as InjectionKey<SessionTransport>

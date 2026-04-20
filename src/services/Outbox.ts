/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { encodeArrayBuffer } from '../helpers/base64'
import { logger } from '../helpers/logger.js'

type Sendable = {
	steps: string[]
	awareness: string
}

export default class Outbox {
	#awarenessUpdate = ''
	#syncUpdate = ''
	#syncQuery = ''
	#recoveryAttemptCounter = 0
	#isRecoveringSync = false

	storeStep(step: Uint8Array<ArrayBufferLike>) {
		const encoded = encodeArrayBuffer(step)
		if (encoded < 'AAA' || encoded > 'Ag') {
			logger.warn('Unexpected step type:', { step, encoded })
			return
		}
		if (encoded < 'AAE') {
			this.#syncQuery = encoded
			return
		}
		if (encoded < 'AQ') {
			this.#syncUpdate = encoded
			return
		}
		this.#awarenessUpdate = encoded
	}

	setRecoveringSync() {
		this.#isRecoveringSync = true
		this.#recoveryAttemptCounter++
	}

	getDataToSend(): Sendable {
		return {
			steps: [this.#syncUpdate, this.#syncQuery].filter((s) => s),
			awareness: this.#awarenessUpdate,
			...this.recoveryData,
		}
	}

	get recoveryData(): { recoveryAttempt?: number } {
		return this.#isRecoveringSync
			? { recoveryAttempt: this.#recoveryAttemptCounter }
			: {}
	}

	get hasUpdate(): boolean {
		return !!this.#syncUpdate
	}

	/*
	 * Clear data that has just been sent.
	 *
	 * Only clear data that has not changed in the meantime.
	 * @param {Sendable} - data that was to the server
	 */
	clearSentData({ steps, awareness }: Sendable) {
		if (steps.includes(this.#syncUpdate)) {
			this.#syncUpdate = ''
		}
		if (steps.includes(this.#syncQuery)) {
			this.#syncQuery = ''
			this.#isRecoveringSync = false
		}
		if (this.#awarenessUpdate === awareness) {
			this.#awarenessUpdate = ''
		}
	}
}

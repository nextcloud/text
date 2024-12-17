/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { encodeArrayBuffer } from '../helpers/base64.js'
import { logger } from '../helpers/logger.js'

type Sendable = {
	steps: string[], awareness: string
}

export default class Outbox {

	#awarenessUpdate = ''
	#syncUpdate = ''
	#syncQuery = ''

	storeStep(step: ArrayBuffer) {
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

	getDataToSend(): Sendable {
		return {
			steps: [this.#syncUpdate, this.#syncQuery].filter(s => s),
			awareness: this.#awarenessUpdate,
		}
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
		}
		if (this.#awarenessUpdate === awareness) {
			this.#awarenessUpdate = ''
		}
	}

}

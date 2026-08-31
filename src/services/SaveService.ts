/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Ref, ShallowRef } from 'vue'
import type { SaveData } from '../apis/save.ts'
import type { Connection } from '../composables/useConnection.ts'
import type { Document } from './SyncService.ts'

import { showError } from '@nextcloud/dialogs'
import debounce from 'debounce'
import mitt from 'mitt'
import { save, saveViaSendBeacon } from '../apis/save.ts'
import { logger } from '../helpers/logger.js'
import { ERROR_TYPE } from './SyncService.ts'

// Time constants in seconds:
// Only autosave after 1 second typing breaks
const AUTOSAVE_DEBOUNCE = 1
// Server only accepts auutosaves every 10 seconds
const SERVER_AUTOSAVE_INTERVAL = 10

type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE]

export declare type EventTypes = {
	/* error */
	error: { type: ErrorType, data?: object }

	/* Emitted after successful save */
	save: { document: Document }
}

class SaveService {
	bus = mitt<EventTypes>()
	connection: ShallowRef<Connection | undefined>
	document: Ref<Document | undefined>
	lastSaveAttempt = 0
	pendingAutosave = 0
	getSaveData
	autosave
	autosaveOnChangesPushed
	clear
	#skipNextAutosaveTrigger = false

	constructor({
		connection,
		document,
		getSaveData,
	}: {
		connection: ShallowRef<Connection | undefined>
		document: Ref<Document | undefined>
		getSaveData: () => SaveData
	}) {
		this.connection = connection
		this.document = document
		this.getSaveData = getSaveData
		this.autosave = debounce(this._autosave.bind(this), AUTOSAVE_DEBOUNCE * 1000)
		this.autosaveOnChangesPushed = this._autosaveOnChangesPushed.bind(this)
		this.clear = this.clearAutosave.bind(this)
	}

	skipNextAutosaveTrigger() {
		this.#skipNextAutosaveTrigger = true
	}

	_autosaveOnChangesPushed() {
		if (this.#skipNextAutosaveTrigger) {
			this.#skipNextAutosaveTrigger = false
			return
		}
		this.autosave()
	}

	/**
	 * Save the current state
	 *
	 * @param options for saving
	 * @param options.force force save for handling conflicts
	 * @param options.manualSave user initiated the saving - not autosave
	 * @return true on success, false if autosave was throttled by the server
	 */
	async save({ force = false, manualSave = true } = {}) {
		logger.debug('[SaveService] saving', { force, manualSave })
		if (!this.connection.value) {
			logger.warn('Could not save due to missing connection')
			return
		}
		const data = this.getSaveData()
		try {
			this.lastSaveAttempt = Date.now()
			const response = await save(this.connection.value, {
				...data,
				force,
				manualSave,
			})
			// update the document - even if the save was throttled
			this.bus.emit('save', response.data)
			if (response.data.document.lastSavedVersion < data.version) {
				logger.debug('[SaveService] Server throttled save request.', { response })
				return false
			}
			logger.debug('[SaveService] saved', { response })
			this.clearAutosave()
			return true
		} catch (e) {
			logger.error('Failed to save document.', { error: e })
			const response = (
				e as { response?: { status?: number, data?: { error?: string } } }
			).response
			if (response?.status === 403) {
				// Document is now read-only; permissionChange from sync will update the UI
				return
			}
			if (response?.status === 412) {
				this.bus.emit('error', {
					type: ERROR_TYPE.LOAD_ERROR,
					data: response,
				})
				if (response.data?.error) {
					showError(response.data.error)
				}
			}
			throw e
		}
	}

	saveViaSendBeacon() {
		if (!this.connection.value) {
			return
		}
		const success = saveViaSendBeacon(this.connection.value, this.getSaveData())
		if (success) {
			logger.debug('[SaveService] saved using sendBeacon')
		}
	}

	forceSave() {
		return this.save({ force: true })
	}

	_autosave() {
		const now = Date.now()
		const nextSaveAttempt = this.lastSaveAttempt + SERVER_AUTOSAVE_INTERVAL * 1000
		// Server won't accept autosaves yet
		if (now < nextSaveAttempt) {
			if (!this.pendingAutosave) {
				const wait = nextSaveAttempt - now
				logger.debug(`Just saved, will try again in ${Math.ceil(wait)} seconds.`)
				this.pendingAutosave = window.setTimeout(this.autosave, wait)
			}
			return
		}
		logger.debug('Autosaving')
		this.save({ manualSave: false })
			.then((saved) => {
				// server did not save due to throttling
				if (saved === false) {
					this.autosave()
				}
			})
			.catch((error) => {
				logger.error('Failed to autosave document.', { error })
				this.autosave()
			})
	}

	clearAutosave() {
		this.autosave.clear()
		if (this.pendingAutosave) {
			window.clearTimeout(this.pendingAutosave)
			this.pendingAutosave = 0
		}
	}
}

export { SaveService }

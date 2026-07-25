/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Ref, ShallowRef } from 'vue'
import type { Connection } from '../composables/useConnection.ts'
import type { Document, SyncService } from './SyncService.ts'

import { showError } from '@nextcloud/dialogs'
import debounce from 'debounce'
import { save, saveViaSendBeacon } from '../apis/save.ts'
import { logger } from '../helpers/logger.js'
import { ERROR_TYPE } from './SyncService.ts'

// Time constants in seconds:
// Only autosave after 1 second typing breaks
const AUTOSAVE_DEBOUNCE = 1
// Server only accepts auutosaves every 10 seconds
const SERVER_AUTOSAVE_INTERVAL = 10
// Randomize save times to prevent all clients saving at the same time.
const MAX_RANDOM_AUTOSAVE_DELAY = 3

class SaveService {
	connection: ShallowRef<Connection | undefined>
	document: Ref<Document | undefined>
	syncService
	serialize
	getDocumentState
	autosave

	constructor({
		connection,
		document,
		syncService,
		serialize,
		getDocumentState,
	}: {
		connection: ShallowRef<Connection | undefined>
		document: Ref<Document | undefined>
		syncService: SyncService
		serialize: () => string
		getDocumentState: () => string
	}) {
		this.connection = connection
		this.document = document
		this.syncService = syncService
		this.serialize = serialize
		this.getDocumentState = getDocumentState
		this.autosave = debounce(this._autosave.bind(this), AUTOSAVE_DEBOUNCE * 1000)
		this.syncService.bus.on('close', () => {
			this.autosave.clear()
		})
	}

	get version() {
		return this.syncService.version
	}

	get emit() {
		return this.syncService.bus.emit
	}

	async save({ force = false, manualSave = true } = {}) {
		logger.debug('[SaveService] saving', { force, manualSave })
		if (!this.connection.value) {
			logger.warn('Could not save due to missing connection')
			return
		}
		try {
			const response = await save(this.connection.value, {
				version: this.version,
				autosaveContent: this.serialize(),
				documentState: this.getDocumentState(),
				force,
				manualSave,
			})
			logger.debug('[SaveService] saved', { response })
			this.emit('save', response.data)
			this.autosave.clear()
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
				this.emit('error', {
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
		const success = saveViaSendBeacon(this.connection.value, {
			version: this.version,
			autosaveContent: this.serialize(),
			documentState: this.getDocumentState(),
		})
		if (success) {
			logger.debug('[SaveService] saved using sendBeacon')
		}
	}

	forceSave() {
		return this.save({ force: true })
	}

	_autosave() {
		const lastSave = this.document.value?.lastSavedVersionTime ?? 0
		const now = Date.now() / 1000
		// Server won't accept autosaves yet
		if (now < lastSave + SERVER_AUTOSAVE_INTERVAL) {
			logger.debug('Not autosaving as last save is recent', { lastSave, now })
			const nextSave = lastSave + SERVER_AUTOSAVE_INTERVAL + Math.random() * MAX_RANDOM_AUTOSAVE_DELAY
			setTimeout(() => this.autosave(), (nextSave - now) * 1000)
			return
		}
		logger.debug('Autosaving')
		return this.save({ manualSave: false }).catch((error) => {
			logger.error('Failed to autosave document.', { error })
			// retry in 30 seconds
			this.autosave()
		})
	}
}

export { SaveService }

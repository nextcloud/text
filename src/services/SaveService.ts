/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import debounce from 'debounce'

import type { ShallowRef } from 'vue'
import { save, saveViaSendBeacon } from '../apis/save'
import type { Connection } from '../composables/useConnection.ts'
import { logger } from '../helpers/logger.js'
import type { SyncService } from './SyncService.js'

/**
 * Interval to save the serialized document and the document state
 *
 * @type {number} time in ms
 */
const AUTOSAVE_INTERVAL = 30000

class SaveService {
	connection: ShallowRef<Connection | undefined>
	syncService
	serialize
	getDocumentState
	autosave

	constructor({
		connection,
		syncService,
		serialize,
		getDocumentState,
	}: {
		connection: ShallowRef<Connection | undefined>
		syncService: SyncService
		serialize: () => string
		getDocumentState: () => string
	}) {
		this.connection = connection
		this.syncService = syncService
		this.serialize = serialize
		this.getDocumentState = getDocumentState
		this.autosave = debounce(this._autosave.bind(this), AUTOSAVE_INTERVAL)
		this.syncService.on('close', () => {
			this.autosave.clear()
		})
	}

	get version() {
		return this.syncService.version
	}

	get emit() {
		return this.syncService.emit.bind(this.syncService)
	}

	_getContent() {
		return this.serialize()
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
				autosaveContent: this._getContent(),
				documentState: this.getDocumentState(),
				force,
				manualSave,
			})
			this.emit('stateChange', { dirty: false })
			logger.debug('[SaveService] saved', { response })
			this.emit('save', response.data)
			this.autosave.clear()
		} catch (e) {
			logger.error('Failed to save document.', { error: e })
			throw e
		}
	}

	saveViaSendBeacon() {
		if (!this.connection.value) {
			return
		}
		saveViaSendBeacon(this.connection.value, {
			version: this.version,
			autosaveContent: this._getContent(),
			documentState: this.getDocumentState(),
		}) && logger.debug('[SaveService] saved using sendBeacon')
	}

	forceSave() {
		return this.save({ force: true })
	}

	_autosave() {
		return this.save({ manualSave: false }).catch((error) => {
			logger.error('Failed to autosave document.', { error })
		})
	}
}

export { SaveService }

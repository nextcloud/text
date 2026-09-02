/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { shallowRef } from 'vue'
import { SaveService } from '../../services/SaveService.ts'

function createSaveService() {
	return new SaveService({
		connection: shallowRef(undefined),
		document: shallowRef(undefined),
		getSaveData: vi.fn(),
	})
}

describe('SaveService.autosaveOnChangesPushed', () => {
	it('autosaves for a normal changesPushed trigger', () => {
		const saveService = createSaveService()
		const autosave = vi.spyOn(saveService, 'autosave')

		saveService.autosaveOnChangesPushed()

		expect(autosave).toHaveBeenCalledOnce()
	})

	it('does not autosave right after skipNextAutosaveTrigger', () => {
		const saveService = createSaveService()
		const autosave = vi.spyOn(saveService, 'autosave')

		saveService.skipNextAutosaveTrigger()
		saveService.autosaveOnChangesPushed()

		expect(autosave).not.toHaveBeenCalled()
	})

	it('only skips once - the next trigger autosaves normally', () => {
		const saveService = createSaveService()
		const autosave = vi.spyOn(saveService, 'autosave')

		saveService.skipNextAutosaveTrigger()
		saveService.autosaveOnChangesPushed()
		saveService.autosaveOnChangesPushed()

		expect(autosave).toHaveBeenCalledOnce()
	})

	it('is unaffected by unrelated triggers before the skip is armed', () => {
		const saveService = createSaveService()
		const autosave = vi.spyOn(saveService, 'autosave')

		saveService.autosaveOnChangesPushed()
		saveService.skipNextAutosaveTrigger()
		saveService.autosaveOnChangesPushed()
		saveService.autosaveOnChangesPushed()

		expect(autosave).toHaveBeenCalledTimes(2)
	})
})

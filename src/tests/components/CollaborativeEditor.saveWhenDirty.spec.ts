/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import CollaborativeEditor from '../../components/CollaborativeEditor.vue'

const saveWhenDirty = (CollaborativeEditor as { methods: { saveWhenDirty: (this: object) => Promise<boolean> } }).methods.saveWhenDirty

function editor(dirty: boolean, saved: boolean | undefined, conflict = false) {
	return { dirty, hasOutdatedDocument: false, hasSyncCollision: conflict, save: async () => saved }
}

describe('CollaborativeEditor saveWhenDirty', () => {
	it('says the file holds the content when there is nothing to save', async () => {
		expect(await saveWhenDirty.call(editor(false, undefined))).toBe(true)
	})

	it('says the file holds the content once the save went through', async () => {
		expect(await saveWhenDirty.call(editor(true, true))).toBe(true)
	})

	it('says the content did not reach the file when the server refused the save', async () => {
		// SaveService resolves without a result after a 403 or a 409
		expect(await saveWhenDirty.call(editor(true, undefined))).toBe(false)
	})

	it('says the content did not reach the file when a conflict keeps it from saving', async () => {
		expect(await saveWhenDirty.call(editor(true, true, true))).toBe(false)
	})

	it('says the content did not reach the file when the server deferred the save', async () => {
		expect(await saveWhenDirty.call(editor(true, false))).toBe(false)
	})
})

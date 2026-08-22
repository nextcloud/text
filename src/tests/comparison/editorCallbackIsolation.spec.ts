/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import { describe, expect, it, vi } from 'vitest'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'

describe('comparison editor isolation', () => {
	it('disables interactive extensions and global editor events', () => {
		const attachments = vi.fn()
		const search = vi.fn()
		subscribe('text:editor:attachments:updated', attachments)
		subscribe('text:editor:search-results', search)
		const editor = createComparisonEditor('![One](.attachments.1/one.png) find')

		try {
			const extensionNames = editor.extensionManager.extensions.map(({ name }) => name)
			expect(extensionNames).not.toContain('focustrap')
			expect(extensionNames).not.toContain('CustomKeymap')
			expect(extensionNames).not.toContain('Search')
			expect(attachments).not.toHaveBeenCalled()
			expect(search).not.toHaveBeenCalled()
		} finally {
			editor.destroy()
			unsubscribe('text:editor:attachments:updated', attachments)
			unsubscribe('text:editor:search-results', search)
		}
	})
})

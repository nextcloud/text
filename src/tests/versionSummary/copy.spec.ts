/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import { copyText } from '../../versionSummary/copy.ts'

describe('copyText', () => {
	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('says when the browser refused to copy the old way', async () => {
		vi.stubGlobal('navigator', { clipboard: undefined })
		document.execCommand = vi.fn(() => false)

		expect(await copyText('summary')).toBe(false)
		expect(document.querySelector('textarea')).toBeNull()
		vi.unstubAllGlobals()
	})

	it('selects the text the old way inside the element given, where a dialog keeps the focus', async () => {
		vi.stubGlobal('navigator', { clipboard: undefined })
		const dialog = document.createElement('div')
		document.body.appendChild(dialog)
		let parent: Node | null = null
		document.execCommand = vi.fn(() => {
			parent = document.querySelector('textarea')?.parentNode ?? null
			return true
		})

		expect(await copyText('summary', dialog)).toBe(true)
		expect(parent).toBe(dialog)
		dialog.remove()
		vi.unstubAllGlobals()
	})
})

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
})

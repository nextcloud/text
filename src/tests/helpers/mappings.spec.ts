/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { extensionHighlight } from '../../helpers/mappings'

describe('syntax highlight extension mappings', () => {
	test('treats log files as plaintext', () => {
		expect(extensionHighlight.log).toBe('plaintext')
	})
})

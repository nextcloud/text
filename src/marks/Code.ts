/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapCode from '@tiptap/extension-code'

const Code = TipTapCode.extend({
	// List all enabled marks except 'code' and 'link' (issue #4900)
	excludes: 'em strike strong underline',
})

export default Code

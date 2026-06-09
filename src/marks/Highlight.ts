/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapHighlight from '@tiptap/extension-highlight'

const Highlight = TipTapHighlight.extend({
	toMarkdown: {
		open: '==',
		close: '==',
		mixable: true,
		expelEnclosingWhitespace: true,
	},
})

export default Highlight

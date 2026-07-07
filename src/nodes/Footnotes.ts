/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'
import Footnote from './Footnote.ts'
import FootnoteReference from './FootnoteReference.ts'

const Footnotes = Node.create({
	name: 'footnotes',
	content: 'footnote+',
	defining: true,
	isolating: true,
	allowGapCursor: false,

	addExtensions() {
		return [Footnote, FootnoteReference]
	},

	parseHTML() {
		return [{ tag: 'section[data-type="footnotes"]' }]
	},

	renderHTML({ HTMLAttributes }) {
		return [
			'section',
			mergeAttributes(HTMLAttributes, { 'data-type': 'footnotes' }),
			0,
		]
	},
})

export default Footnotes

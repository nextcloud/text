/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapStrike from '@tiptap/extension-strike'

export default TipTapStrike.extend({

	parseHTML() {
		return [
			{
				tag: 's',
			},
			{
				tag: 'del',
			},
			{
				tag: 'strike',
			},
			{
				style: 'text-decoration',
				getAttrs: value => value === 'line-through',
			},
		]
	},

	renderHTML() {
		return ['s', 0]
	},

	/** Strike is currently unsupported by prosemirror-markdown */
	toMarkdown: {
		open: '~~',
		close: '~~',
		mixable: true,
		expelEnclosingWhitespace: true,
	},
})

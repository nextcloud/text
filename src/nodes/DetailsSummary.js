/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'

const DetailsSummary = Node.create({
	name: 'detailsSummary',
	content: 'text*',
	defining: true,
	selectable: false,
	isolating: true,

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	parseHTML() {
		return [{
			tag: 'summary',
		}]
	},

	renderHTML({ HTMLAttributes }) {
		return ['summary', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
	},

	toMarkdown: (state, node) => {
		state.write('<summary>')
		state.renderInline(node)
		state.write('</summary>\n')
	},
})

export default DetailsSummary

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import DetailsContentView from './DetailsContent.vue'

const DetailsContent = Node.create({
	name: 'detailsContent',
	// TODO: don't allow nested details
	content: 'block+',
	defining: true,
	selectable: false,

	addOptions() {
		return {
			HTMLAttributes: {},
		}
	},

	parseHTML() {
		return [{
			tag: `div[data-type="${this.name}"]`,
		}]
	},

	renderHTML({ HTMLAttributes }) {
		return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'details-content' }), 0]
	},

	addNodeView() {
		return VueNodeViewRenderer(DetailsContentView)
	},

	toMarkdown: (state, node) => {
		state.renderContent(node)
		state.ensureNewLine()
	},
})

export default DetailsContent

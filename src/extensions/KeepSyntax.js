/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Mark } from '@tiptap/core'

/**
 * Keep markdown untouched
 */
const KeepSyntax = Mark.create({
	name: 'keep-syntax',
	parseHTML() {
		return [
			{
				tag: 'span.keep-md',
			},
		]
	},
	renderHTML() {
		return ['span', { class: 'keep-md' }, 0]
	},
	toMarkdown: {
		open: '',
		close: '',
		mixable: true,
		escape: false,
		expelEnclosingWhitespace: true,
	},

	/**
	 * Remove mark if there were manual changes
	 */
	onUpdate() {
		const tr = this.editor.state.tr

		this.editor.state.doc.descendants((node, pos, parent, index) => {
			if (node.marks.findIndex(mark => mark.type.name === this.name) !== -1) {
				if (node.type.name !== 'text' || node.text.length !== 1) {
					tr.removeMark(pos, pos + node.nodeSize, this.type)
				}
			}
		})
		if (tr.docChanged) {
			tr.setMeta('addToHistory', false)
			tr.setMeta('preventUpdate', true)
			this.editor.view.dispatch(tr)
		}
	},
})

export default KeepSyntax

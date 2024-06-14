/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapHardBreak from '@tiptap/extension-hard-break'

const HardBreak = TipTapHardBreak.extend({
	addAttributes() {
		return {
			syntax: {
				default: '  ',
				rendered: false,
				keepOnSplit: true,
				parseHTML: (el) => el.getAttribute('data-syntax') || '  ',
			},
		}
	},

	addCommands() {
		return {
			...this?.parent(),
			setHardBreak: () => (ctx) => {
				// Prevent hard breaks within headings
				for (let d = ctx.state.selection.$from.depth; d >= 0; d--) {
					if (ctx.state.selection.$from.node(d).type.name === 'heading') return false
				}
				return this.parent().setHardBreak()(ctx)
			},
		}
	},

	toMarkdown(state, node, parent, index) {
		for (let i = index + 1; i < parent.childCount; i++) {
			if (parent.child(i).type !== node.type) {
				if (node.attrs.syntax !== 'html') {
					state.write(node.attrs.syntax)
					if (!parent.child(i).text?.startsWith('\n')) state.write('\n')
				} else {
					state.write('<br />')
				}
				return
			}
		}
	},
})

export default HardBreak

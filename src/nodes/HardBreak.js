/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TipTapHardBreak from '@tiptap/extension-hard-break'

const HardBreak = TipTapHardBreak.extend({
	addAttributes() {
		return {
			syntax: {
				default: 'soft',
				rendered: false,
				keepOnSplit: true,
				parseHTML: (el) => el.getAttribute('data-syntax') || '  ',
			},
		}
	},

	renderHTML({ node, HTMLAttributes }) {
		if (node.attrs.syntax === 'soft') {
			// Rendered as inline whitespace, not a visible line break
			return ['span', { ...HTMLAttributes, 'data-soft-break': '' }, ' ']
		}
		return ['br', HTMLAttributes]
	},

	addCommands() {
		return {
			...this?.parent(),
			setHardBreak: () => (ctx) => {
				// Prevent hard breaks within headings
				for (let d = ctx.state.selection.$from.depth; d >= 0; d--) {
					if (ctx.state.selection.$from.node(d).type.name === 'heading')
						return false
				}
				// Call upstream setHardBreak, then set syntax property for type 'soft'
				return ctx.chain()
					.command(this.parent().setHardBreak())
					.command(({ tr }) => {
						const pos = tr.selection.$anchor.pos -1
						const node = tr.doc.nodeAt(pos)
						if (node?.type.name === 'hardBreak' && node.attrs.syntax === 'soft') {
							tr.setNodeMarkup(pos, null, { ...node.attrs, syntax: '  ' })
						}
						return true
					})
					.run()
			},
		}
	},

	toMarkdown(state, node, parent, index) {
		for (let i = index + 1; i < parent.childCount; i++) {
			if (parent.child(i).type !== node.type) {
				if (node.attrs.syntax === 'soft') {
					state.write('\n')
				} else if (node.attrs.syntax === 'html') {
					state.write('<br />')
				} else {
					state.write(node.attrs.syntax)
					if (!parent.child(i).text?.startsWith('\n')) state.write('\n')
				}
				return
			}
		}
	},
})

export default HardBreak

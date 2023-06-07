/*
 * @copyright Copyright (c) 2022 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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

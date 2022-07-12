/**
 * @copyright Copyright (c) 2022 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
 *
 * @license AGPL-3.0-or-later
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

import TipTapUnderline from '@tiptap/extension-underline'
import { markInputRule, markPasteRule } from '@tiptap/core'
import { underscoreInputRegex, underscorePasteRegex } from '@tiptap/extension-bold'
import { nesting } from './Strong.js'

const Underline = TipTapUnderline.extend({
	excludes: '',

	addAttributes() {
		return {
			nesting: {
				default: null,
				rendered: false,
				parseHTML: nesting('U'),
			},
		}
	},

	parseHTML() {
		return [
			{
				tag: 'u',
			},
			{
				style: 'text-decoration',
				getAttrs: value => value === 'underline',
			},
		]
	},

	renderHTML() {
		return ['u', 0]
	},

	toMarkdown: {
		open: '__',
		close: '__',
		mixable: true,
		expelEnclosingWhitespace: true,
	},

	addInputRules() {
		return [
			markInputRule({
				find: underscoreInputRegex,
				type: this.type,
			}),
		]
	},

	addPasteRules() {
		return [
			markPasteRule({
				find: underscorePasteRegex,
				type: this.type,
			}),
		]
	},

})

export default Underline

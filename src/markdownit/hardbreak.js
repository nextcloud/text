/**
 * @copyright Copyright (c) 2022
 *
 * @author Ferdinand Thiessen <rpm@fthiessen.de>
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

import markdownitNewline from 'markdown-it/lib/rules_inline/newline.js'
import markdownitEscape from 'markdown-it/lib/rules_inline/escape.js'

/**
 * Add information about used markdown syntax to HTML hard breaks
 *
 * @param {import('markdown-it')} md Markdown object
 */
export default function keepHardbreakSyntax(md) {
	// Add syntax information to hard line breaks using double spaces
	md.inline.ruler.at('newline', (state, silent) => {
		const rval = markdownitNewline(state, silent)
		if (rval && state.tokens.length && state.tokens[state.tokens.length - 1].type === 'hardbreak') state.tokens[state.tokens.length - 1].attrSet('syntax', '  ')
		return rval
	})

	// Add syntax information to hard line breaks using a backslash
	md.inline.ruler.at('escape', (state, silent) => {
		const rval = markdownitEscape(state, silent)
		if (rval && state.tokens.length && state.tokens[state.tokens.length - 1].type === 'hardbreak') state.tokens[state.tokens.length - 1].attrSet('syntax', '\\')
		return rval
	})

	// Add rule for parsing `<br>` tags (as we have HTML disabled)
	md.inline.ruler.after('html_inline', 'html_breaks', (state) => {
		const res = state.src.slice(state.pos).match(/^\s*<br\s*\/?>/)

		if (res) {
			const token = state.push('hardbreak', 'br', 0)
			token.attrPush(['syntax', 'html'])
			state.pos += res[0].length
			return true
		}
		return false
	})

	// Adds syntax attribute to `<br>` and fixes issue #3370 (no additional newline after `<br>`)
	md.renderer.rules.hardbreak = (tokens, idx, options) => `<br data-syntax="${tokens[idx].attrGet('syntax')}" ${options.xhtmlOut ? '/' : ''}>`
}

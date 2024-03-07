/**
 * @copyright Copyright (c) 2024 Max <max@nextcloud.com>
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

/**
 *
 * @param tokens
 * @param i
 */
function isPreviewLinkInParagraph(tokens, i) {
	const [prev, cur, next] = tokens.slice(i - 1, i + 2)
	return prev.type === 'paragraph_open'
		&& cur.type === 'inline'
		&& cur.children
		&& cur.children.length === 3
		&& cur.children[0].type === 'link_open'
		&& cur.children[0].attrGet('title') === 'preview'
		&& cur.children[1].type === 'text'
		&& cur.children[2].type === 'link_close'
		&& next.type === 'paragraph_close'
}

/* Remove wrapping tokens
 *
 * @param {array} tokens - the token stream to modify
 * @param {Number} i - index of the token to unwrap
 */
/**
 *
 * @param tokens
 * @param i
 */
function unwrapToken(tokens, i) {
	// Start from the end so indexes stay the same.
	tokens.splice(i + 1, 1)
	tokens.splice(i - 1, 1)
}

/**
 * @param {object} md Markdown object
 */
export default (md) => {

	/**
	 *
	 * @param root0
	 * @param root0.tokens
	 */
	function linkPreviews({ tokens }) {
		// do not process first and last token
		for (let i = 1, l = tokens.length; i < (l - 1); ++i) {
			if (isPreviewLinkInParagraph(tokens, i)) {
				unwrapToken(tokens, i)
			}
		}
	}

	md.core.ruler.before('linkify', 'link_previews', linkPreviews)
}

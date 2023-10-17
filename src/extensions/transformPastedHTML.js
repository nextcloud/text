/**
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
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
 * Prepare pasted html for insertion into tiptap
 *
 * We render paragraphs with `white-space: pre-wrap`
 * so newlines are visible and preserved.
 *
 * Pasted html may contain newlines inside tags with a different `white-space` style.
 * They are not visible in the source.
 * Strip them so the pasted result wraps nicely.
 *
 * At the same time we need to preserve whitespace inside `<pre>` tags
 * and the like.
 *
 * @param {string} html Pasted html content
 */
export default function(html) {
	const parser = new DOMParser()
	const doc = parser.parseFromString(html, 'text/html')
	forAllTextNodes(doc, textNode => {
		if (collapseWhiteSpace(textNode)) {
			textNode.textContent = textNode.textContent.replaceAll('\n', ' ')
		}
	})
	return doc.body.innerHTML
}

/**
 *
 * Run function for all text nodes in the document.
 *
 * @param {Document} doc Html document to process
 * @param {Function} fn Function to run
 *
 */
function forAllTextNodes(doc, fn) {
	const nodeIterator = doc.createNodeIterator(
		doc.body,
		NodeFilter.SHOW_TEXT,
	)
	let currentNode = nodeIterator.nextNode()
	while (currentNode) {
		fn(currentNode)
		currentNode = nodeIterator.nextNode()
	}
}

/**
 *
 * Check if newlines need to be collapsed based on the applied style
 *
 * @param {Text} textNode Text to check the style for
 *
 */
function collapseWhiteSpace(textNode) {
	// Values of `white-space` css that will collapse newline whitespace
	// See https://developer.mozilla.org/en-US/docs/Web/CSS/white-space#values
	const COLLAPSING_WHITE_SPACE_VALUES = ['normal', 'nowrap']
	let ancestor = textNode.parentElement
	while (ancestor) {
		// Chrome does not support getComputedStyle on detached dom
		// https://lists.w3.org/Archives/Public/www-style/2018May/0031.html
		// Therefore the following logic only works on Firefox
		const style = getComputedStyle(ancestor)
		const whiteSpace = style?.getPropertyValue('white-space')
		if (whiteSpace) {
			// Returns false if white-space has a value not listed in COLLAPSING_WHITE_SPACE_VALUES
			return COLLAPSING_WHITE_SPACE_VALUES.includes(whiteSpace)
		}

		// Check for `tagName` as fallback on Chrome
		if (ancestor.tagName === 'PRE') {
			return false
		}
		ancestor = ancestor.parentElement
	}
	return true
}

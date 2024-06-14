/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

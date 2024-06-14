/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Check if the given tokens represent a preview in a paragraph
 * @param {Array} tokens - tokens to check
 * @param {number} i - offset into the tokens
 */
function isPreviewLinkInParagraph(tokens, i) {
	const [prev, cur, next] = tokens.slice(i - 1, i + 2)
	return prev?.type === 'paragraph_open'
		&& cur.type === 'inline'
		&& cur.children
		&& cur.children.length === 3
		&& cur.children[0].type === 'link_open'
		&& cur.children[0].attrGet('title') === 'preview'
		&& cur.children[1].type === 'text'
		&& cur.children[2].type === 'link_close'
		&& next.type === 'paragraph_close'
}

/**
 * Remove wrapping tokens
 *
 * @param {Array} tokens - the token stream to modify
 * @param {number} i - index of the token to unwrap
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
	 * Markdownit plugin to unwrap previews from a paragraph
	 *
	 * @param {object} state handed to the plugin
	 * @param {Array} state.tokens current token stream
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

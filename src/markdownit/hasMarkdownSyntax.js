/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Check if the content has Markdown syntax
 *
 * @param {string} content Markdown object
 */
export default function hasMarkdownSyntax(content) {
	// Regular expressions for common Markdown patterns
	const markdownPatterns = [
		/\*\*.*?\*\*/, // Bold: **text**
		/\*.*?\*/, // Italics: *text*
		/\[.*?\(.*?\)/, // Links: [text](url)
		/^#{1,6}\s.*$/, // Headings: # text
		/^\s*[-+*]\s.*/m, // Unordered list: - item
		/^\s\d\..*/m, // Ordered list: 1. item
		/^>+\s.*/, // Blockquote: > text
		/`.*?`/, // Code: `code`
	]

	return markdownPatterns.some(pattern => pattern.test(content))
}

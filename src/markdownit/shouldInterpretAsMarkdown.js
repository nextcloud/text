/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import hasMarkdownSyntax from './hasMarkdownSyntax.js'
import isValidMarkdown from './isValidMarkdown.js'

/**
 * Check if the content has Markdown syntax
 *
 * @param {string} content Markdown object
 */
export default function shouldInterpretAsMarkdown(content) {
	return hasMarkdownSyntax(content) && isValidMarkdown(content)
}

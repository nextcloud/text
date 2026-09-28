/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import hasMarkdownSyntax from './hasMarkdownSyntax.ts'
import isValidMarkdown from './isValidMarkdown.ts'

/**
 * Check if the content has Markdown syntax
 *
 * @param content Markdown object
 */
export default function shouldInterpretAsMarkdown(content: string) {
	return hasMarkdownSyntax(content) && isValidMarkdown(content)
}

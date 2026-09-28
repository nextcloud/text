/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import markdownit from './index.ts'

/**
 * Check if the content is valid Markdown syntax
 *
 * @param content Markdown object
 */
export default function isValidMarkdown(content: string): boolean {
	try {
		markdownit.parse(content, {})
		return true
	} catch {
		return false
	}
}

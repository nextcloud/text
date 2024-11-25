/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import markdownit from './index.js'

/**
 * Check if the content is valid Markdown syntax
 *
 * @param {string} content Markdown object
 */
export default function isValidMarkdown(content) {
	try {
		markdownit.parse(content)
		return true
	} catch (e) {
		return false
	}
}

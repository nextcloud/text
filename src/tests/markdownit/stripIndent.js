/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Strip the indent to allow indenting expected results
 * @param {string} content - string to strip indent from.
 */
export default function stripIndent(content) {
	return content
		.replace(/\n/g, '')
		.replace(/[\t ]+</g, '<')
		.replace(/>[\t ]+</g, '><')
		.replace(/>[\t ]+$/g, '>')
}

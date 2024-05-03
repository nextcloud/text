/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * @param {object} md Markdown object
 */
export default function markdownUnderlines(md) {
	md.inline.ruler2.after('emphasis', 'underline', state => {
		const tokens = state.tokens

		for (let i = tokens.length - 1; i > 0; i--) {
			const token = tokens[i]

			if (token.markup === '__') {
				if (token.type === 'strong_open') {
					tokens[i].tag = 'u'
					tokens[i].type = 'u_open'
				}
				if (token.type === 'strong_close') {
					tokens[i].tag = 'u'
					tokens[i].type = 'u_close'
				}
			}
		}

		return false
	})
}

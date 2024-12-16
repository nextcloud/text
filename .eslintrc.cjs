/**
 * SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

module.exports = {
	root: true,
	extends: [
		'@nextcloud',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['off'],
		'import/no-unresolved': [1, { ignore: ['\\.svg\\?raw$'] }],
	},
}

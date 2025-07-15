/**
 * SPDX-FileCopyrightText: 2019-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

module.exports = {
	root: true,
	extends: ['@nextcloud', 'prettier'],
	overrides: [
		{
			files: ['**/*.vue'],
			rules: {
				'vue/first-attribute-linebreak': 'off',
			},
		},
	],
	rules: {
		'import/no-unresolved': [1, { ignore: ['\\.svg\\?raw$'] }],
	},
}

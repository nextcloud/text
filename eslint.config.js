/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { recommended } from '@nextcloud/eslint-config'
import pluginCypress from 'eslint-plugin-cypress'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(
	...recommended,
	globalIgnores(['src/tests/fixtures/*']),
	{
		files: ['cypress/**/*.js'],
		extends: [pluginCypress.configs.globals],
	},
	{
		name: 'vitest-globals',
		files: ['src/tests/**'],
		languageOptions: {
			globals: {
				describe: 'readonly',
				expect: 'readonly',
				it: 'readonly',
				test: 'readonly',
			},
		},
	},
)

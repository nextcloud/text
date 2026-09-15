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
		name: 'production-public-jsdoc',
		files: ['src/**/*.{js,ts,vue}'],
		ignores: ['**/*.test.*', '**/*.spec.*', '**/*.cy.*', '**/test/**', '**/tests/**', '**/__tests__/**', '**/__mocks__/**'],
		rules: {
			'jsdoc/require-jsdoc': ['warn', { publicOnly: true }],
		},
	},
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

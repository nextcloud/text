/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [vue()],
	test: {
		setupFiles: ['src/tests/setup.mjs'],
		environment: 'jsdom',
		globals: true,
		include: ['src/tests/*.spec.[jt]s', 'src/tests/**/*.spec.[jt]s'],
		exclude: ['**/node_modules/**', '**/.git/**', 'src/components/**'],
		server: {
			deps: {
				inline: [/@nextcloud.*/],
			},
		},
	},
})

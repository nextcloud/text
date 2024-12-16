// SPDX-FileCopyrightText: Ferdinand Thiessen <opensource@fthiessen.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

/// <reference types="vitest/config" />

import { createAppConfig } from '@nextcloud/vite-config'
import webpackStats from 'rollup-plugin-webpack-stats'
import path from 'path'

const config = createAppConfig({
	text: path.join(__dirname, 'src', 'main.js'),
	files: path.join(__dirname, 'src', 'files.js'),
	public: path.join(__dirname, 'src', 'public.js'),
	viewer: path.join(__dirname, 'src', 'viewer.js'),
	editors: path.join(__dirname, 'src', 'editor.js'),
	init: path.join(__dirname, 'src', 'init.js'),
}, {
	createEmptyCSSEntryPoints: true,
	extractLicenseInformation: {
		overwriteLicenses: {
			khroma: 'MIT',
		},
	},
	thirdPartyLicense: false,
	config: {
		resolve: {
			dedupe: ['vue'],
		},
		css: {
			modules: {
				localsConvention: 'camelCase',
			},
		},
		plugins: [
			webpackStats(),
		],
		build: {
			cssCodeSplit: true,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						// Make the emoji related dependencies a custom chunk to reduce the size of the RichText chunk
						if (id.includes('emoji-mart-vue') || id.includes('emoji-datasource')) {
							return 'emoji-picker'
						}
					},
				},
			},
		},
		test: {
			setupFiles: ['src/tests/setup.mjs'],
			environment: 'jsdom',
			globals: true,
			server: {
				deps: {
					inline: [/@nextcloud.*/],
				}
			},
		},
	},
})

export default config

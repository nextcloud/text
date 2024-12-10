// SPDX-FileCopyrightText: Ferdinand Thiessen <opensource@fthiessen.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

/// <reference types="vitest/config" />

import { createAppConfig } from '@nextcloud/vite-config'
import type { ViteDevServer, Connect } from 'vite'
import webpackStats from 'rollup-plugin-webpack-stats'
import path from 'path'

const rewriteMiddlewarePlugin = {
	name: 'rewriteAssetsUrl',
	configureServer(server: ViteDevServer) {
		server.middlewares.use((req, res, next: Connect.NextFunction): void => {
			const m = req.url?.match(/\/js\/text-(.*)\.mjs$/)
			if (m) {
				if (m[1] === 'text') {
					req.url = req.url?.replace(/\/js\/text-.*.mjs/, '/src/main.js')
				} else if (m[1] === 'editors') {
					req.url = req.url?.replace(/\/js\/text-.*.mjs/, '/src/editors.js')
				} else {
					req.url = req.url?.replace(/\/js\/text-.*.mjs/, `/src/${m[1]}.js`)
				}
			}
			next()
		})
	}
}

const config = createAppConfig({
	text: path.join(__dirname, 'src', 'main.js'),
	files: path.join(__dirname, 'src', 'files.js'),
	public: path.join(__dirname, 'src', 'public.js'),
	viewer: path.join(__dirname, 'src', 'viewer.js'),
	editors: path.join(__dirname, 'src', 'editor.js'),
	init: path.join(__dirname, 'src', 'init.js'),
}, {
	createEmptyCSSEntryPoints: true,
	extractLicenseInformation: true,
	thirdPartyLicense: false,
	config: {
		base: process.env.BASE,
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
			rewriteMiddlewarePlugin,
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

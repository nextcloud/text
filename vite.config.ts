// SPDX-FileCopyrightText: Ferdinand Thiessen <opensource@fthiessen.de>
// SPDX-License-Identifier: AGPL-3.0-or-later

import { createAppConfig } from '@nextcloud/vite-config'
import path from 'path'
import { webpackStats } from 'rollup-plugin-webpack-stats';

const ENTRIES_TO_INCLUDE_CSS = ['text', 'public', 'viewer', 'editors']

const config = createAppConfig({
	text: path.join(__dirname, 'src', 'main.js'),
	files: path.join(__dirname, 'src', 'files.js'),
	public: path.join(__dirname, 'src', 'public.js'),
	viewer: path.join(__dirname, 'src', 'viewer.js'),
	editors: path.join(__dirname, 'src', 'editor.js'),
	init: path.join(__dirname, 'src', 'init.js'),
}, {
	inlineCSS: {
		jsAssetsFilterFunction: ({ name }) => {
			return ENTRIES_TO_INCLUDE_CSS.includes(name)
		}
	},
	config: {
		css: {
			modules: {
				localsConvention: 'camelCase',
			},
		},
		plugins: [
			webpackStats(),
		],
		test: {
			environment: 'jsdom',
			globals: true,
			server: {
				deps: {
					inline: ['@nextcloud/vue'],
				}
			},
		},
	},
})

export default config

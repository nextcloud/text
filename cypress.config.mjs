/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineConfig } from 'cypress'
import cypressSplit from 'cypress-split'
import { configureVisualRegression } from 'cypress-visual-regression/dist/plugin'
import vitePreprocessor from 'cypress-vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
	projectId: 'hx9gqy',
	viewportWidth: 1280,
	viewportHeight: 900,
	screenshotsFolder: './cypress/snapshots/actual',
	trashAssetsBeforeRuns: true,
	env: {
		failSilently: false,
		type: 'actual',
	},
	e2e: {
		env: {
			visualRegressionType: 'regression',
		},
		setupNodeEvents(on, config) {
			on('file:preprocessor', vitePreprocessor({
				plugins: [vue(), nodePolyfills()],
				configFile: false,
			}))
			cypressSplit(on, config)
			configureVisualRegression(on)

			return config
		},

		baseUrl: 'http://localhost:8081/index.php/',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
	component: {
		devServer: {
			framework: "vue",
			bundler: "vite",
		},
	},
	retries: {
		runMode: 2,
		// do not retry in `cypress open`
		openMode: 0,
	},
	'numTestsKeptInMemory': 5,
})

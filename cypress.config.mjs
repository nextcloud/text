/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import vue from '@vitejs/plugin-vue2'
import { defineConfig } from 'cypress'
import cypressSplit from 'cypress-split'
import { configureVisualRegression } from 'cypress-visual-regression/dist/plugin'
import vitePreprocessor from 'cypress-vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

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
			on(
				'file:preprocessor',
				vitePreprocessor({
					plugins: [vue(), nodePolyfills()],
					configFile: false,
				}),
			)
			cypressSplit(on, config)
			configureVisualRegression(on)

			// Disable spell checking to prevent rendering differences
			on('before:browser:launch', (browser, launchOptions) => {
				if (browser.family === 'chromium' && browser.name !== 'electron') {
					launchOptions.preferences.default[
						'browser.enable_spellchecking'
					] = false
					return launchOptions
				}

				if (browser.family === 'firefox') {
					launchOptions.preferences['layout.spellcheckDefault'] = 0
					return launchOptions
				}

				if (browser.name === 'electron') {
					launchOptions.preferences.spellcheck = false
					return launchOptions
				}
			})

			return config
		},

		baseUrl: 'http://localhost:8081/index.php/',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
	component: {
		devServer: {
			framework: 'vue',
			bundler: 'vite',
		},
	},
	retries: {
		runMode: 2,
		// do not retry in `cypress open`
		openMode: 0,
	},
	numTestsKeptInMemory: 5,
})

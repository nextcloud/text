const { defineConfig } = require('cypress')
const cypressSplit = require('cypress-split')
const getCompareSnapshotsPlugin = require('cypress-visual-regression/dist/plugin.js')

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// IMPORTANT: return the config object
			return config
		},
	},
})

module.exports = defineConfig({
	projectId: 'hx9gqy',
	viewportWidth: 1280,
	viewportHeight: 900,
	screenshotsFolder: './cypress/snapshots/actual',
	trashAssetsBeforeRuns: true,
	env: {
		failSilently: false,
		type: 'actual',
		SNAPSHOT_BASE_DIRECTORY: './cypress/snapshots/base',
		SNAPSHOT_DIFF_DIRECTORY: './cypress/snapshots/diff',
	},
	e2e: {
		setupNodeEvents(on, config) {
			cypressSplit(on, config)
			getCompareSnapshotsPlugin(on, config)

			const browserify = require('@cypress/browserify-preprocessor')
			const webpack = require('@cypress/webpack-preprocessor')
			const webpackOptions = require('@nextcloud/webpack-vue-config')

			webpackOptions.module.rules.push({ test: /\.md/, type: 'asset/source' })

			on('file:preprocessor', browserify())
			on('file:preprocessor', webpack({ webpackOptions }))

			return config
		},

		baseUrl: 'http://localhost:8081/index.php/',
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
	retries: {
		runMode: 0,
		// do not retry in `cypress open`
		openMode: 0,
	},
	'numTestsKeptInMemory': 5,
})

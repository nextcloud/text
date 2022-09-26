const { defineConfig } = require('cypress')

module.exports = defineConfig({
	projectId: 'hx9gqy',
	viewportWidth: 1280,
	viewportHeight: 900,
	e2e: {
		setupNodeEvents(on, config) {
			const browserify = require('@cypress/browserify-preprocessor')
			const webpack = require('@cypress/webpack-preprocessor')
			const webpackOptions = require('@nextcloud/webpack-vue-config')

			webpackOptions.module.rules.push({ test: /\.md/, type: 'asset/source' })

			on('file:preprocessor', browserify())
			on('file:preprocessor', webpack({ webpackOptions }))
		},

		baseUrl: 'http://localhost:8081/index.php/',
		experimentalSessionAndOrigin: true,
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
	retries: {
		runMode: 2,
		// do not retry in `cypress open`
		openMode: 0,
	},
})

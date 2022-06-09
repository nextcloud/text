const { defineConfig } = require('cypress')

module.exports = defineConfig({
	projectId: 'hx9gqy',
	viewportWidth: 1280,
	viewportHeight: 900,
	e2e: {
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
			return require('./cypress/plugins/index.js')(on, config)
		},
		// baseUrl: 'http://nextcloud.local/index.php/',
		baseUrl: 'http://localhost:8081/index.php/',
		experimentalSessionAndOrigin: true,
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
})

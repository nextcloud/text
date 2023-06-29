
import { cloneViewer, configureNextcloud, startNextcloud, stopNextcloud, waitOnNextcloud } from './cypress/dockerNode'
import { defineConfig } from 'cypress'

import browserify from '@cypress/browserify-preprocessor'

export default defineConfig({
	projectId: 'hx9gqy',

	// 16/9 screen ratio
	viewportWidth: 1280,
	viewportHeight: 900,

	// Tries again 2 more times on failure
	retries: {
		runMode: 2,
		// do not retry in `cypress open`
		openMode: 0,
	},

	// Needed to trigger `after:run` events with cypress open
	experimentalInteractiveRunEvents: true,

	// Faster processing, video is broken on GH actions anyway
	video: false,

	// Visual regression testing
	env: {
		failSilently: false,
		type: 'actual',
	},

	e2e: {
		// Disable isolation
		testIsolation: false,

		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		async setupNodeEvents(on, config) {
			// Fix browserslist extend https://github.com/cypress-io/cypress/issues/2983#issuecomment-570616682
			on('file:preprocessor', browserify())

			// Disable spell checking to prevent rendering differences
			on('before:browser:launch', (browser, launchOptions) => {
				if (browser.family === 'chromium' && browser.name !== 'electron') {
					launchOptions.preferences.default['browser.enable_spellchecking'] = false
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

			// Remove container after run
			on('after:run', () => {
				stopNextcloud()
			})

			// Before the browser launches
			// starting Nextcloud testing container
			return startNextcloud(process.env.BRANCH)
				.then((ip) => {
					// Setting container's IP as base Url
					config.baseUrl = `http://${ip}/index.php`
					return ip
				})
				.then(waitOnNextcloud)
				.then(cloneViewer)
				.then(configureNextcloud)
				.then(() => {
					return config
				})
		},
	},
})

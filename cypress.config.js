// Importing the defineConfig function from the 'cypress' package.
const { defineConfig } = require('cypress')

// Exporting a configuration object for Cypress tests.
module.exports = defineConfig({
  // Unique identifier for the project.
  projectId: 'hx9gqy',

  // Default viewport width for the tests.
  viewportWidth: 1280,

  // Default viewport height for the tests.
  viewportHeight: 900,

  // Configuration specific to end-to-end (E2E) tests.
  e2e: {

    // Setting up custom Node events.
    setupNodeEvents(on, config) {
      const browserify = require('@cypress/browserify-preprocessor')
      const webpack = require('@cypress/webpack-preprocessor')
      const webpackOptions = require('@nextcloud/webpack-vue-config')

      // Adding a rule to handle Markdown files.
      webpackOptions.module.rules.push({ test: /\.md/, type: 'asset/source' })

      // Applying Browserify preprocessor.
      on('file:preprocessor', browserify())

      // Applying Webpack preprocessor with specified options.
      on('file:preprocessor', webpack({ webpackOptions }))
    },

    // Base URL for the application under test.
    baseUrl: 'http://localhost:8081/index.php/',

    // Enabling experimental session and origin features.
    experimentalSessionAndOrigin: true,

    // Pattern for locating test files (JavaScript and TypeScript).
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },

  // Configuration for test retries.
  retries: {
    // Number of retries in run mode.
    runMode: 2,

    // Disabling retries in 'cypress open' mode.
    openMode: 0,
  },

  // Number of tests to keep in memory.
  "numTestsKeptInMemory": 5,
})

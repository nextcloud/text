// This file is loaded before all e2e tests

import './commands.js'
import './sessions.js'
import chaiExtension from './chai.js'

beforeEach(() => {
	cy.intercept('GET', '**/preview-service-worker.js', { fixture: 'preview-service-worker.js' })
})

before(() => {
	chai.use(chaiExtension)
})

Cypress.on('window:before:load', (win) => {
	// disable service workers
	// eslint-disable-next-line
	delete win.navigator.ServiceWorker
})

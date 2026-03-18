/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// This file is loaded before all e2e tests

import chaiExtension from './chai.js'
import './commands.js'
import './sessions.js'

beforeEach(() => {
	cy.intercept('GET', '**/preview-service-worker.js', {
		fixture: 'preview-service-worker.txt',
	})
})

Cypress.on('window:before:load', (win) => {
	// disable service workers
	// eslint-disable-next-line
	delete win.navigator.ServiceWorker
})

before(() => {
	chai.use(chaiExtension)
})

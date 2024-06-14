/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// This file is loaded before all e2e tests

import './commands.js'
import './sessions.js'
import chaiExtension from './chai.js'

beforeEach(() => {
	cy.intercept('GET', '**/preview-service-worker.js', { fixture: 'preview-service-worker.txt' })
})

Cypress.on('window:before:load', (win) => {
	// disable service workers
	// eslint-disable-next-line
	delete win.navigator.ServiceWorker
})

before(() => {
	chai.use(chaiExtension)

	Cypress.on('uncaught:exception', (err) => {
		if (err.message.includes('ResizeObserver')) {
		  return false
		}

		if (err.message.includes('clearFocusTrap')) {
			return false
		}

		return true
	})
})

Cypress.on('uncaught:exception', (err, runnable) => {
	// Old files scripts attempt to iterate through views
	// which do not exist anymore since 28.
	// TODO: Remove this once
	// https://github.com/nextcloud/server/pull/40065
	// is merged.
	if (err.message.includes('Cannot read properties of undefined (reading \'views\')')) {
		return false
	}
	// we still want to ensure there are no other unexpected
	// errors, so we let them fail the test
})

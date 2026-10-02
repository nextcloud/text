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

	delete win.navigator.ServiceWorker
})

before(() => {
	chai.use(chaiExtension)
})

// Defer ResizeObserver callbacks one frame to break floating UI sync loops
// that otherwise tank the renderer and trigger Electron's unresponsive kill.
// Taken from: https://github.com/nextcloud/server/pull/60189
Cypress.on('window:before:load', (win) => {
	const Original = win.ResizeObserver
	win.ResizeObserver = class extends Original {
		constructor(callback) {
			super((entries, observer) => {
				win.requestAnimationFrame(() => callback(entries, observer))
			})
		}
	}
})

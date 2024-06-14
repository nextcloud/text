/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../utils/index.js'
const user = randUser()

describe('Open print.md and compare print view', function() {
	before(function() {
		initUserAndFiles(user, 'print.md')
	})
	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files')
	})

	it('Renders print view in viewer', function() {
		cy.openFile('print.md')
		cy.setCssMedia('print')

		cy.getEditor().should('be.visible')
		cy.getContent()
			// Ensure cursor is not displayed to prevent flaky tests (flashing input cursor)
			.invoke('css', 'caret-color', 'transparent')
			.get('h1:not(.hidden-visually)').should('contain', 'Print test')
			.should('be.visible')

		cy.compareSnapshot('print view in viewer', { capture: 'fullPage' })
		cy.setCssMedia('screen')
	})

	it('Renders print view in single-file share', function() {
		cy.shareFile('/print.md', { edit: true })
			.then((token) => {
				cy.logout()
				cy.visit(`/s/${token}`)
				cy.setCssMedia('print')
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				cy.getContent()
					// Ensure cursor is not displayed to prevent flaky tests (flashing input cursor)
					.invoke('css', 'caret-color', 'transparent')
					.get('h1:not(.hidden-visually)').should('contain', 'Print test')
					.should('be.visible')

				cy.compareSnapshot('print view in single-file share', { capture: 'fullPage' })
				cy.setCssMedia('screen')
			})
	})
})

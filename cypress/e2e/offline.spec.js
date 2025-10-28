/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Offline', function () {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
		cy.uploadTestFile()
		cy.visit('/apps/files')
		cy.openTestFile()
	})

	it('Offline state indicator', () => {
		cy.get('.session-list').should('exist')
		cy.get('.offline-state').should('not.exist')
		cy.goOffline()
		cy.get('.session-list').should('not.exist')
		cy.get('.offline-state').should('exist')
		cy.goOnline()
	})

	it.only('Disabled upload and link file when offline', () => {
		cy.getMenuEntry('insert-attachment').find('button').should('not.be.disabled')
		cy.getSubmenuEntry('insert-link', 'insert-link-file')
			.find('button')
			.should('not.be.disabled')
		cy.getMenuEntry('insert-link').click()

		cy.goOffline()

		cy.getMenuEntry('insert-attachment').find('button').should('be.disabled')
		cy.getSubmenuEntry('insert-link', 'insert-link-file')
			.find('button')
			.should('be.disabled')
		cy.getMenuEntry('insert-link').click()

		cy.goOnline()
	})
})

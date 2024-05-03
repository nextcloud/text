/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

const getRemainItem = (name) => {
	cy.getActionEntry('remain').click()
	return cy.get('.v-popper__wrapper .open').getActionEntry(name)
}

describe('Mobile actions', {
	// moto g4
	viewportWidth: 360,
	viewportHeight: 640,
}, () => {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files').then(() => {
			// isolate tests - each happens in its own folder
			const retry = cy.state('test').currentRetry()
			const folderName = retry
				? `${Cypress.currentTest.title} (${retry})`
				: Cypress.currentTest.title
			cy.createFolder(folderName)
			cy.uploadFile('test.md', 'text/markdown', `${encodeURIComponent(folderName)}/text.md`)

			cy.visit(`apps/files?dir=/${encodeURIComponent(folderName)}`)
			cy.openFile('text.md', { force: true })
		})
	})

	it('formatting modal help', () => {
		getRemainItem('formatting-help').click()

		cy.get('[data-text-el="formatting-help"]').should('be.visible')
		cy.get('[data-text-el="formatting-help"]').find('button.modal-container__close').click()
		cy.get('[data-text-el="formatting-help"]').should('not.exist')
	})
})

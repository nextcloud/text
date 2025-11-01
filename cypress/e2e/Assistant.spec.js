/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../utils/index.js'

const currentUser = randUser()

const fileName = 'empty.md'

describe('Assistant', () => {
	before(() => {
		initUserAndFiles(currentUser, fileName)
	})

	beforeEach(() => {
		cy.login(currentUser)
		cy.visit('/apps/files')
	})

	it('See assistant button', () => {
		cy.isolateTest({
			sourceFile: fileName,
		})
		cy.openFile(fileName, { force: true })

		cy.getContent().click({ force: true })

		cy.getActionEntry('assistant').should('be.visible')

		cy.getActionEntry('assistant').click()

		cy.get('.action-button').contains('Free text to text prompt')
		cy.get('.action-button').contains('Translate')
		cy.get('.action-button').contains('Show assistant results')
	})

	it('Send free prompt request', () => {
		cy.isolateTest({
			sourceFile: fileName,
		})
		cy.openFile(fileName, { force: true })

		cy.getContent().click({ force: true })
		cy.getActionEntry('assistant').click()
		cy.get('.action-button').contains('Free text to text prompt').click()

		cy.get('.assistant-modal--content #input-input').should('be.visible')

		cy.get('.assistant-modal--content #input-input').type('Hello World')
		cy.get('.assistant-modal--content .submit-button').click()

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(2000)

		cy.get('.assistant-modal--content button').contains('Get notified').click()

		cy.get('.assistant-modal--content button .bell-ring-outline-icon').should(
			'be.visible',
		)

		cy.get('.assistant-modal--content .close-button').click()
		cy.getActionEntry('assistant').click()
		cy.get('.action-button').contains('Show assistant results').click()

		cy.get('.modal-container__content .task-list')
			.should('be.visible')
			.should('contain', 'Hello World')
	})

	it('Open translate dialog', () => {
		cy.isolateTest({
			sourceFile: fileName,
		})
		cy.openFile(fileName, { force: true })

		cy.getActionEntry('assistant').click()
		cy.get('.action-button').contains('Translate').click()

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(1000)

		cy.get('[data-cy="translate-input"]').should('be.visible').focus()

		cy.get('[data-cy="translate-input"]').should('be.focused')
		cy.get('[data-cy="translate-input"]').type('Hello World')
	})
})

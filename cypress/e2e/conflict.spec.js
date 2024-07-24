/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../utils/index.js'

const user = randUser()

const variants = [
	{ fixture: 'lines.txt', mime: 'text/plain' },
	{ fixture: 'test.md', mime: 'text/markdown' },
]

variants.forEach(function({ fixture, mime }) {
	const fileName = fixture
	describe(`${mime} (${fileName})`, function() {
		const getWrapper = () => cy.get('.viewer__content .text-editor__wrapper.has-conflicts')

		before(() => {
			initUserAndFiles(user, fileName)
		})

		beforeEach(function() {
			cy.login(user)
		})

		it('displays conflicts', function() {
			createConflict(fileName, mime)

			cy.openFile(fileName)

			cy.get('.text-editor .document-status')
				.should('contain', 'Document has been changed outside of the editor.')
			getWrapper()
				.find('#read-only-editor')
				.should('contain', 'Hello world')
			getWrapper()
				.find('.text-editor__main')
				.should('contain', 'Hello world')
			getWrapper()
				.find('.text-editor__main')
				.should('contain', 'cruel conflicting')
		})

		it('resolves conflict using current editing session', function() {
			createConflict(fileName, mime)

			cy.openFile(fileName)
			cy.get('[data-cy="resolveThisVersion"]').click()

			getWrapper()
				.should('not.exist')
			cy.get('[data-cy="resolveThisVersion"]')
				.should('not.exist')
			cy.get('.text-editor__main')
				.should('contain', 'Hello world')
			cy.get('.text-editor__main')
				.should('contain', 'cruel conflicting')
		})

		it('resolves conflict using server version', function() {
			createConflict(fileName, mime)

			cy.openFile(fileName)
			cy.get('[data-cy="resolveServerVersion"]')
				.click()

			getWrapper()
				.should('not.exist')
			cy.get('[data-cy="resolveThisVersion"]')
				.should('not.exist')
			cy.get('[data-cy="resolveServerVersion"]')
				.should('not.exist')
			cy.get('.text-editor__main')
				.should('contain', 'Hello world')
			cy.get('.text-editor__main')
				.should('not.contain', 'cruel conflicting')
		})
	})
})

function createConflict(fileName, mime) {
	cy.visit('/apps/files')
	cy.openFile(fileName)
	cy.log('Inspect editor')
	cy.getContent()
		.type('Hello you cruel conflicting world')
	cy.uploadFile(fileName, mime)
	cy.get('#viewer .modal-header button.header-close').click()
	cy.get('#viewer').should('not.exist')
}

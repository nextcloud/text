/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const variants = [
	{ fixture: 'lines.txt', mime: 'text/plain' },
	{ fixture: 'test.md', mime: 'text/markdown' },
]

variants.forEach(function({ fixture, mime }) {
	const user = randUser()
	const fileName = fixture
	const prefix = mime.replaceAll('/', '-')
	describe(`${mime} (${fileName})`, function() {
		const getWrapper = () => cy.get('.text-editor__wrapper.has-conflicts')

		before(() => {
			cy.createUser(user)
		})

		beforeEach(function() {
			cy.login(user)
			cy.createTestFolder()
		})

		it(prefix + ': no actual conflict - just reload', function() {
			cy.testName().then(testName => {
				// start with different content
				cy.uploadFile('frontmatter.md', mime, `${testName}/${fileName}`)
				// just a read only session opened
				cy.shareFile(`${testName}/${fileName}`)
					.then((token) => {
						cy.visit(`/s/${token}`)
					})
				cy.getContent().should('contain', 'Heading')

				cy.uploadFile(fileName, mime, testName + '/' + fileName)
				cy.get('#editor-container .document-status', { timeout: 40000 })
					.should('contain', 'session has expired')

				// Reload button works
				cy.get('#editor-container .document-status a.button')
					.contains('Reload')
					.click()
				getWrapper().should('not.exist')
				cy.getContent().should('contain', 'Hello world')
				cy.getContent().should('not.contain', 'Heading')
			})
		})

		it(prefix + ': displays conflicts', function() {
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

		it(prefix + ': resolves conflict using current editing session', function() {
			createConflict(fileName, mime)

			cy.openFile(fileName)
			cy.intercept({ method: 'POST', url: '**/session/*/push' })
				.as('push')
			cy.wait('@push')
			cy.get('[data-cy="resolveThisVersion"]').click()

			getWrapper().should('not.exist')
			cy.get('[data-cy="resolveThisVersion"]')
				.should('not.exist')
			cy.getContent().should('contain', 'Hello world')
			cy.getContent().should('contain', 'cruel conflicting')
		})

		it(prefix + ': resolves conflict using server version', function() {
			createConflict(fileName, mime)

			cy.openFile(fileName)
			cy.get('[data-cy="resolveServerVersion"]')
				.click()

			getWrapper().should('not.exist')
			cy.get('[data-cy="resolveThisVersion"]')
				.should('not.exist')
			cy.get('[data-cy="resolveServerVersion"]')
				.should('not.exist')
			cy.getContent().should('contain', 'Hello world')
			cy.getContent().should('not.contain', 'cruel conflicting')
		})

		it(prefix + ': hides conflict in read only session', function() {
			createConflict(fileName, mime)
			cy.testName().then(testName => {
				cy.shareFile(`/${testName}/${fileName}`)
					.then((token) => {
						cy.logout()
						cy.visit(`/s/${token}`)
					})
			})
			cy.getContent().should('contain', 'cruel conflicting')
			getWrapper().should('not.exist')
		})

	})
})

/**
 * @param {string} fileName - filename
 * @param {string} mime - mimetype
 */
function createConflict(fileName, mime) {
	cy.testName().then(testName => {
		cy.uploadFile(fileName, mime, `${testName}/${fileName}`)
	})
	cy.visitTestFolder()
	cy.openFile(fileName)
	cy.log('Inspect editor')
	cy.getEditor().find('.ProseMirror').should('have.attr', 'contenteditable', 'true')
	cy.getContent()
		.type('Hello you cruel conflicting world')
	cy.testName().then(testName => {
		cy.uploadFile(fileName, mime, testName + '/' + fileName)
	})
	cy.get('#viewer .modal-header button.header-close').click()
	cy.get('#viewer').should('not.exist')
}

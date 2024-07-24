/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
		const getWrapper = () => cy.get('.text-editor__wrapper.has-conflicts')

		before(() => {
			initUserAndFiles(user, fileName)
		})

		beforeEach(function() {
			cy.login(user)
		})

		it('no actual conflict - just reload', function() {
			// start with different content
			cy.uploadFile('frontmatter.md', mime, fileName)
			// just a read only session opened
			cy.shareFile(`/${fileName}`)
				.then((token) => {
					cy.visit(`/s/${token}`)
				})
			cy.get('.text-editor__main')
				.should('contain', 'Heading')
			cy.intercept({ method: 'POST', url: '**/session/*/push' })
				.as('push')
			cy.wait('@push')
			cy.uploadFile(fileName, mime)
			cy.get('#editor-container .document-status', { timeout: 30000 })
				.should('contain', 'session has expired')
			// Reload button works
			cy.get('#editor-container .document-status a.button')
				.contains('Reload')
				.click()
			getWrapper()
				.should('not.exist')
			cy.getContent()
				.should('contain', 'Hello world')
			cy.getContent()
				.should('not.contain', 'Heading')
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

		it('hides conflict in read only session', function() {
			createConflict(fileName, mime)
			cy.shareFile(`/${fileName}`)
				.then((token) => {
					cy.logout()
					cy.visit(`/s/${token}`)
				})
			cy.get('.text-editor__main')
				.should('contain', 'cruel conflicting')
			getWrapper()
				.should('not.exist')
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

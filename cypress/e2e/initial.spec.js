/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Test state loading of documents', function() {
	before(function() {
		// Init user
		cy.createUser(user)
		cy.login(user)
		cy.uploadFile('test.md', 'text/markdown')
		cy.uploadFile('test.md', 'text/markdown', 'test2.md')
		cy.uploadFile('test.md', 'text/markdown', 'test3.md')
	})
	beforeEach(function() {
		cy.login(user)
	})

	it('Initial content can not be undone', function() {
		cy.shareFile('/test.md', { edit: true })
			.then((token) => {
				cy.visit(`/s/${token}`)
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')

				cy.getMenu().should('be.visible')
				cy.getActionEntry('undo').should('be.disabled')

				cy.getContent()
					.type('New content')
				cy.getActionEntry('undo').should('not.be.disabled')
			})
	})

	it('Consecutive sessions work properly', function() {
		let readToken = null
		let writeToken = null
		cy.interceptCreate()
		cy.shareFile('/test2.md')
			.then((token) => {
				readToken = token
				cy.logout()
				cy.visit(`/s/${readToken}`)
				cy.wait('@create')
			})
			.then(() => {
				// Open read only for the first time
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')
				cy.closeInterceptedSession(readToken)

				// Open read only for the second time
				cy.reload()
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')
				cy.closeInterceptedSession(readToken)

				cy.login(user)
				cy.shareFile('/test2.md', { edit: true })
					.then((token) => {
						writeToken = token
						// Open write link and edit something
						cy.visit(`/s/${writeToken}`)
						cy.getEditor().should('be.visible')
						cy.getContent()
							.should('contain', 'Hello world')
							.find('h2').should('contain', 'Hello world')
						cy.getContent()
							.type('Something new {end}')
						cy.intercept({ method: 'POST', url: '**/session/*/push' }).as('push')
						cy.intercept({ method: 'POST', url: '**/session/*/sync' }).as('sync')
						cy.wait('@push')
						cy.wait('@sync')
						cy.closeInterceptedSession(writeToken)

						// Reopen read only link and check if changes are there
						cy.visit(`/s/${readToken}`)
						cy.getEditor().should('be.visible')
						cy.getContent()
							.find('h2').should('contain', 'Something new Hello world')
					})
			})
	})

	it('Load after state has been saved', function() {
		let readToken = null
		let writeToken = null
		cy.interceptCreate()
		cy.shareFile('/test3.md', { edit: true })
			.then((token) => {
				writeToken = token
				cy.logout()
				cy.visit(`/s/${writeToken}`)
			})
			.then(() => {
				// Open a file, write and save
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')
				cy.getContent()
					.type('Something new {end}')
				cy.intercept({ method: 'POST', url: '**/session/*/save' }).as('save')
				cy.get('.save-status button').click()
				cy.wait('@save', { timeout: 10000 })
				cy.closeInterceptedSession(writeToken)

				// Open writable file again and assert the content
				cy.reload()
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Something new Hello world')

				cy.login(user)
				cy.shareFile('/test3.md')
					.then((token) => {
						readToken = token
						cy.logout()
						cy.visit(`/s/${readToken}`)
					})
					.then(() => {
						// Open read only file again and assert the content
						cy.getEditor().should('be.visible')
						cy.getContent()
							.should('contain', 'Hello world')
							.find('h2').should('contain', 'Something new Hello world')
					})
			})
	})

})

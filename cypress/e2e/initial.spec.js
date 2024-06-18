/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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
			.then(token => cy.visit(`/s/${token}`))
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

	it('Consecutive sessions work properly', function() {
		cy.interceptCreate()
		cy.shareFile('/test2.md')
			.as('readToken')
		cy.logout()
		cy.get('@readToken')
			.then(token => cy.visit(`/s/${token}`))
		cy.wait('@create')
		// Open read only for the first time
		cy.getEditor().should('be.visible')
		cy.getContent()
			.should('contain', 'Hello world')
			.find('h2').should('contain', 'Hello world')
		cy.get('@readToken')
			.then(cy.closeInterceptedSession)

		// Open read only for the second time
		cy.reload()
		cy.getEditor().should('be.visible')
		cy.getContent()
			.should('contain', 'Hello world')
			.find('h2').should('contain', 'Hello world')
		cy.get('@readToken')
			.then(cy.closeInterceptedSession)

		cy.login(user)
		cy.shareFile('/test2.md', { edit: true })
			.as('writeToken')
		// Open write link and edit something
		cy.get('@writeToken')
			.then(token => cy.visit(`/s/${token}`))
		cy.getEditor().should('be.visible')
		cy.getContent()
			.should('contain', 'Hello world')
			.find('h2').should('contain', 'Hello world')
		cy.getContent()
			.type('Something new {end}')
		cy.intercept({ method: 'POST', url: '**/session/*/sync' }).as('sync')
		cy.wait('@sync')
		cy.get('@writeToken')
			.then(cy.closeInterceptedSession)

		// Reopen read only link and check if changes are there
		cy.get('@readToken')
			.then(token => cy.visit(`/s/${token}`))
		cy.getEditor().should('be.visible')
		cy.getContent()
			.find('h2').should('contain', 'Something new Hello world')
	})

	it('Load after state has been saved', function() {
		cy.interceptCreate()
		cy.shareFile('/test3.md', { edit: true })
			.as('writeToken')
		cy.logout()
		cy.get('@writeToken')
			.then(token => cy.visit(`/s/${token}`))

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
		cy.get('@writeToken')
			.then(cy.closeInterceptedSession)

		// Open writable file again and assert the content
		cy.reload()
		cy.getEditor().should('be.visible')
		cy.getContent()
			.should('contain', 'Hello world')
			.find('h2').should('contain', 'Something new Hello world')

		cy.login(user)
		cy.shareFile('/test3.md')
			.as('readToken')
		cy.logout()
		cy.get('@readToken')
			.then(token => cy.visit(`/s/${token}`))

		// Open read only file again and assert the content
		cy.getEditor().should('be.visible')
		cy.getContent()
			.should('contain', 'Hello world')
			.find('h2').should('contain', 'Something new Hello world')
	})

})

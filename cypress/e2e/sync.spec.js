/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Sync', () => {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
		cy.uploadTestFile('test.md')
		cy.visit('/apps/files')
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/sync' }).as('sync')
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/save' }).as('save')
		cy.openTestFile()
		cy.wait('@sync')
		cy.getContent().find('h2').should('contain', 'Hello world')
		cy.getContent().type('{moveToEnd}* Saving the doc saves the doc state{enter}')
		cy.wait('@sync')
	})

	it('saves the actual file and document state', () => {
		cy.getContent().type('{ctrl+s}')
		cy.wait('@save').its('request.body')
			.should('have.property', 'documentState')
			.should('not.be.empty')
		cy.testName()
			.then(name => cy.downloadFile(`/${name}.md`))
			.its('data')
			.should('include', 'saves the doc state')
		cy.closeFile()
	})

	it('saves on close', () => {
		cy.closeFile()
		cy.wait('@save')
		cy.testName()
			.then(name => cy.downloadFile(`/${name}.md`))
			.its('data')
			.should('include', 'saves the doc state')
	})

	it('recovers from a short lost connection', () => {
		let reconnect = false
		cy.intercept('**/apps/text/session/*/*', (req) => {
			if (reconnect) {
				req.continue()
				req.alias = 'alive'
			} else {
				req.destroy()
				req.alias = 'dead'
			}
		}).as('sessionRequests')
		cy.wait('@dead', { timeout: 30000 })
		cy.get('#editor-container .document-status', { timeout: 30000 })
			.should('contain', 'Document could not be loaded.')
			.then(() => {
				reconnect = true
			})
		cy.wait('@alive', { timeout: 30000 })
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/sync' })
			.as('syncAfterRecovery')
		cy.wait('@syncAfterRecovery', { timeout: 30000 })
		cy.get('#editor-container .document-status', { timeout: 30000 })
			.should('not.contain', 'Document could not be loaded.')
		// FIXME: There seems to be a bug where typed words maybe lost if not waiting for the new session
		cy.wait('@syncAfterRecovery', { timeout: 10000 })
		cy.getContent().type('* more content added after the lost connection{enter}')
		cy.wait('@syncAfterRecovery', { timeout: 10000 })
		cy.closeFile()
		cy.testName()
			.then(name => cy.downloadFile(`/${name}.md`))
			.its('data')
			.should('include', 'after the lost connection')
	})

	it('recovers from a lost and closed connection', () => {
		let reconnect = false
		cy.intercept('**/apps/text/session/*/*', (req) => {
			if (req.url.includes('close') || req.url.includes('create') || reconnect) {
				req.continue()
				req.alias = 'syncAfterRecovery'
				reconnect = true
			} else {
				req.destroy()
			}
		}).as('sessionRequests')

		cy.wait('@sessionRequests', { timeout: 30000 })
		cy.get('#editor-container .document-status', { timeout: 30000 })
			.should('contain', 'Document could not be loaded.')

		cy.wait('@syncAfterRecovery', { timeout: 60000 })

		cy.get('#editor-container .document-status', { timeout: 30000 })
			.should('not.contain', 'Document could not be loaded.')
		// FIXME: There seems to be a bug where typed words maybe lost if not waiting for the new session
		cy.wait('@syncAfterRecovery', { timeout: 10000 })
		cy.getContent().type('* more content added after the lost connection{enter}')
		cy.wait('@syncAfterRecovery', { timeout: 10000 })
		cy.closeFile()
		cy.testName()
			.then(name => cy.downloadFile(`/${name}.md`))
			.its('data')
			.should('include', 'after the lost connection')
	})

	it('shows warning when document session got cleaned up', () => {
		cy.get('.save-status button')
			.click()
		cy.wait('@save')
		cy.uploadTestFile('test.md')

		cy.get('#editor-container .document-status', { timeout: 30000 })
			.should('contain', 'Editing session has expired.')

		// Reload button works
		cy.get('#editor-container .document-status a.button')
			.contains('Reload')
			.click()

		cy.getContent()
		cy.get('#editor-container .document-status .notecard')
			.should('not.exist')
	})

	it('passes the doc content from one session to the next', () => {
		cy.closeFile()
		cy.intercept({ method: 'PUT', url: '**/apps/text/session/*/create' })
			.as('create')
		cy.openTestFile()
		cy.wait('@create', { timeout: 10000 })
			.its('response.body')
			.should('have.property', 'documentState')
			.should('not.be.empty')
		cy.getContent().find('h2').should('contain', 'Hello world')
		cy.getContent().find('li').should('contain', 'Saving the doc saves the doc state')
		cy.getContent().type('recovered')
		cy.closeFile()
	})

	// regression test #3834
	it('close triggers one close request', () => {
		cy.closeFile()
		// Wait to make sure there is enough time for all close requests to run
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(100)
		// reuse @close intercepted in closeFile()
		cy.get('@close.all').should('have.length', 1)
	})

})

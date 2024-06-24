/**
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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
		cy.intercept('**/apps/text/session/*/*', req => req.destroy()).as('dead')
		cy.wait('@dead', { timeout: 30000 })
		cy.get('#editor-container .document-status', { timeout: 30000 })
			.should('contain', 'Document could not be loaded.')
		cy.intercept('**/apps/text/session/*/*', req => req.continue()).as('alive')
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

	it('reconnects via button after a short lost connection', () => {
		cy.intercept('**/apps/text/session/*/*', req => req.destroy()).as('dead')
		cy.wait('@dead', { timeout: 30000 })
		cy.get('#editor-container .document-status', { timeout: 30000 })
			.should('contain', 'Document could not be loaded.')
		cy.get('#editor-container .document-status')
			.find('.button.primary').click()
		cy.intercept('**/apps/text/session/*/*', req => {
			if (req.url.endsWith('create')) {
				req.alias = 'create'
			}
			req.continue()
		}).as('alive')
		cy.wait('@alive', { timeout: 30000 })
		cy.wait('@create', { timeout: 10000 })
			.its('request.body')
			.should('have.property', 'baseVersionEtag')
			.should('not.be.empty')
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

	it('asks to reload page when document session got cleaned up', () => {
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

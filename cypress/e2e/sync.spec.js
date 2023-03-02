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
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' }, (req) => {
			if (req.body.autosaveContent) {
				req.alias = 'save'
			}
		}).as('sync')
		cy.openTestFile()
		cy.getContent().find('h2').should('contain', 'Hello world')
		cy.getContent().type('* Saving the doc saves the doc state{enter}')
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

	it('recovers from a lost connection', () => {
		let count = 0
		cy.intercept({ method: 'POST', url: '**/apps/text/session/push' }, (req) => {
			if (count < 5) {
				count++
				req.destroy()
				req.alias = 'dead'
			}
		}).as('push')
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' }, (req) => {
			if (count < 5) {
				count++
				req.destroy()
				req.alias = 'deadSync'
			}
		})
		cy.wait('@push', { timeout: 15000 + Cypress.config().defaultCommandTimeout })
		cy.wait('@push', { timeout: 15000 + Cypress.config().defaultCommandTimeout })
		cy.wait('@push', { timeout: 15000 + Cypress.config().defaultCommandTimeout })
		cy.wait('@push', { timeout: 15000 + Cypress.config().defaultCommandTimeout })
		cy.getContent().type('* more content added after the lost connection{enter}')
		cy.closeFile()
		cy.testName()
			.then(name => cy.downloadFile(`/${name}.md`))
			.its('data')
			.should('include', 'after the lost connection')
	})

	it('passes the doc content from one session to the next', () => {
		cy.closeFile()
		cy.intercept({ method: 'PUT', url: '**/apps/text/session/create' })
			.as('create')
		cy.openTestFile()
		cy.wait('@create', { timeout: 10000 })
			.its('response.body')
			.should('have.property', 'content')
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

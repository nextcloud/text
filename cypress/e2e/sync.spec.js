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

describe('yjs document state', () => {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
		cy.uploadTestFile('test.md')
		cy.visit('/apps/files')
	})

	it('saves the doc state when saving the doc', () => {
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' })
			.as('sync')
		cy.openTestFile()
		cy.getContent().find('h2').should('contain', 'Hello world')
		cy.wait('@sync', { timeout: 7000 })
		cy.getContent().type('Save the doc so it saves the state')
		cy.wait('@sync', { timeout: 7000 })
		cy.getContent().type('{ctrl+s}')
		cy.wait('@sync').its('request.body')
			.should('have.property', 'documentState')
	})

	it('loads the doc state when opening the file', () => {
		cy.intercept({ method: 'PUT', url: '**/apps/text/session/create' })
			.as('create')
		cy.openTestFile()
		cy.wait('@create', { timeout: 10000 }).its('response.body')
			.should('have.property', 'content')
			.should('exist')
		cy.getContent().type('Save the doc so it saves the state {ctrl+s}')
		cy.closeFile()
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' })
			.as('sync')
		cy.openTestFile()
		cy.wait('@create', { timeout: 10000 }).its('response.body')
			.should('have.property', 'documentState')
			.should('exist')
		cy.wait('@sync').its('request.body').should('have.property', 'version')
		cy.getContent().find('h2').should('contain', 'Hello world')
		cy.closeFile()
	})
})

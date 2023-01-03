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

describe('Text and server mimetypes', () => {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
		cy.uploadTestFile('test.md')
		cy.visit('/apps/files')
	})

	// still failing due to headings creating transactions
	it.skip('does not save file when opening', () => {
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' })
			.as('sync')
		cy.openTestFile()
		cy.wait('@sync', { timeout: 7000 }).its('request.body').should('not.have.property', 'autosaveContent')
		cy.wait('@sync', { timeout: 7000 }).its('request.body').should('not.have.property', 'autosaveContent')
		cy.wait('@sync', { timeout: 7000 }).its('request.body').should('not.have.property', 'autosaveContent')
		cy.wait('@sync', { timeout: 7000 }).its('request.body').should('not.have.property', 'autosaveContent')
		cy.getContent().find('h2').should('contain', 'Hello world')
	})

	it('does not save file when closing', () => {
		cy.intercept({ method: 'POST', url: '**/apps/text/session/sync' })
			.as('sync')
		cy.openTestFile()
		cy.getContent().find('h2').should('contain', 'Hello world')
		// Allow the sync to stabelize so no steps are pending.
		cy.wait('@sync', { timeout: 7000 })
		cy.wait('@sync', { timeout: 7000 })
		cy.wait('@sync', { timeout: 7000 })
		cy.closeFile()
		cy.wait('@sync').its('request.body').should('not.have.property', 'autosaveContent')
	})
})

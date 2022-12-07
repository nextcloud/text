/**
 * @copyright Copyright (c) 2019 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
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

const getRemainItem = (name) => {
	cy.getActionEntry('remain').click()
	return cy.get('.v-popper__wrapper .open').getActionEntry(name)
}

describe('Mobile actions', {
	// moto g4
	viewportWidth: 360,
	viewportHeight: 640,
}, () => {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files').then(() => {
			// isolate tests - each happens in its own folder
			const retry = cy.state('test').currentRetry()
			const folderName = retry
				? `${Cypress.currentTest.title} (${retry})`
				: Cypress.currentTest.title
			cy.createFolder(folderName)
			cy.uploadFile('test.md', 'text/markdown', `${encodeURIComponent(folderName)}/text.md`)
			cy.visit(`apps/files?dir=/${encodeURIComponent(folderName)}`)

			cy.get('.files-controls .crumb:not(.hidden) a')
				.last()
				.click({ force: true })

			cy.openFile('text.md', { force: true })
		})
	})

	it('formatting modal help', () => {
		getRemainItem('formatting-help').click()

		cy.get('[data-text-el="formatting-help"]').should('be.visible')
		cy.get('[data-text-el="formatting-help"]').find('button[aria-label="Close modal"]').click()
		cy.get('[data-text-el="formatting-help"]').should('not.exist')
	})
})

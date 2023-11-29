/**
 *
 * @copyright Copyright (c) 2023 Jonas <jonas@freesources.org>
 *
 * @author Jonas <jonas@freesources.org>
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

describe('Open print.md and compare print view', function() {
	before(function() {
		initUserAndFiles(user, 'print.md')
	})
	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files')
	})

	it('Renders print view in viewer', function() {
		cy.openFile('print.md')
		cy.setCssMedia('print')

		cy.getEditor().should('be.visible')
		cy.getContent()
			.get('h1:not(.hidden-visually)').should('contain', 'Print test')
			.should('be.visible')

		cy.compareSnapshot('print view in viewer', { capture: 'fullPage' })
		cy.setCssMedia('screen')
	})

	it('Renders print view in single-file share', function() {
		cy.shareFile('/print.md', { edit: true })
			.then((token) => {
				cy.logout()
				cy.visit(`/s/${token}`)
				cy.setCssMedia('print')
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				cy.getContent()
					.get('h1:not(.hidden-visually)').should('contain', 'Print test')
					.should('be.visible')

				cy.compareSnapshot('print view in single-file share', { capture: 'fullPage' })
				cy.setCssMedia('screen')
			})
	})
})

/**
 * @copyright Copyright (c) 2022
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

import { initUserAndFiles, randUser } from '../../utils/index.js'

const user = randUser()

describe('Preview Options', function() {
	before(function() {
		initUserAndFiles(user, 'codeblock.md', 'empty.md')
	})
	beforeEach(function() {
		cy.login(user)
		cy.isolateTest({ sourceFile: 'empty.md' })
		cy.openFile('empty.md')
		cy.get('.entry-action__insert-link').click()
		cy.get('li').get('[data-text-action-entry="insert-link-website"]').click()
		cy.get('[data-text-action-entry="insert-link-input"] input').type('nextcloud.com')
		cy.get('[data-text-action-entry="insert-link-input"] button').click()
		cy.get('.preview-options').click()
	})

	it('should render previewOptions correctly', function() {
		cy.get('.action-button__text').contains('Remove link').should('be.visible')
		cy.get('.action-radio__label').each(el => {
			cy.wrap(el).invoke('text').should('match', /Text only|Show link preview/)
		})
	})

	it('should toggle to Link Preview', function() {
		cy.get('.preview').should('not.exist')
		cy.get('.action-radio__label').each(el => {
			cy.wrap(el).invoke('text').then(text => {
				if (text === 'Show link preview') {
					cy.wrap(el).click()
				}
			})
		})
		cy.get('.preview').should('be.visible')
	})

	it('should Remove link', function() {
		cy.get('p > a').should('have.text', 'nextcloud.com')
		cy.get('.action-button__text').contains('Remove link').click()
		cy.get('p > a').should('not.exist')
	})
})

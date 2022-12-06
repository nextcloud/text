/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
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

describe('Open test.md in viewer', function() {
	const getViewer = () => cy.get('#viewer')

	before(function() {
		initUserAndFiles(user, 'test.md', 'empty.md')
	})

	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files')
	})

	it('See test.md in the list', function() {
		cy.get('.files-fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('contain', 'test.md')
	})

	it('Open the viewer on file click', function() {
		cy.openFile('test.md')

		cy.log('Inspect viewer')
		getViewer().should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
		getViewer()
			.find('.modal-title').should('contain', 'test.md')
		getViewer()
			.find('.modal-header button.action-item__menutoggle')
			.should('be.visible')

		cy.log('Inspect editor')
		cy.getContent()
			.should('contain', 'Hello world')
		cy.getContent()
			.get('h2').should('contain', 'Hello world')

		cy.log('Inspect menubar')
		cy.getActionEntry('undo').should('be.visible')
		cy.getActionEntry('bold').should('be.visible')

		cy.screenshot()
	})

	it('Open an empty file', function() {
		cy.openFile('empty.md')

		cy.log('Inspect viewer')
		getViewer().should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
		getViewer()
			.find('.modal-title').should('contain', 'empty.md')
		getViewer()
			.find('.modal-header button.action-item__menutoggle')
			.should('be.visible')

		cy.log('Inspect editor')
		cy.getContent().should('contain', '')

		cy.log('Inspect menubar')
		cy.getActionEntry('undo').should('be.visible')
		cy.getActionEntry('bold').should('be.visible')

		cy.screenshot()
	})

	it('Closes the editor', function() {
		cy.openFile('test.md')
		cy.get('#viewer .modal-header button.header-close').click()
		cy.get('#viewer').should('not.exist')
	})
})

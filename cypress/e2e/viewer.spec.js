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
		cy.getFile('test.md')
			.should('be.visible')
	})

	it('Open the viewer on file click', function() {
		cy.openFile('test.md')

		cy.log('Inspect viewer')
		getViewer().should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
		getViewer()
			.find('.modal-header__name').should('contain', 'test.md')
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
	})

	it('Open an empty file', function() {
		cy.openFile('empty.md')

		cy.log('Inspect viewer')
		getViewer().should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
		getViewer()
			.find('.modal-header__name').should('contain', 'empty.md')
		getViewer()
			.find('.modal-header button.action-item__menutoggle')
			.should('be.visible')

		cy.log('Inspect editor')
		cy.getContent().should('contain', '')

		cy.log('Inspect menubar')
		cy.getActionEntry('undo').should('be.visible')
		cy.getActionEntry('bold').should('be.visible')
	})

	it('Closes the editor', function() {
		cy.openFile('test.md')
		cy.get('#viewer .modal-header button.header-close').click()
		cy.get('#viewer').should('not.exist')
	})

	it('Can use tab keys for list in the viewer', function() {
		// This used to break with the focus trap that the viewer modal has
		cy.openFile('empty.md')

		cy.insertLine('- test')

		// Cypress does not have native tab key support, though this seems to work
		// for triggering the key handler of tiptap
		// https://github.com/cypress-io/cypress/issues/311
		cy.getContent()
			.trigger('keydown', { keyCode: 9 })
		cy.getContent()
			.trigger('keyup', { keyCode: 9 })
		cy.getContent()
			.type('Nested list')

		cy.getContent().find('ul li').should('contain', 'test')
		cy.getContent().find('ul li ul li').should('contain', 'Nested list')

		cy.getContent()
			.trigger('keydown', { keyCode: 9, shiftKey: true })
		cy.getContent()
			.trigger('keyup', { keyCode: 9, shiftKey: true })

		cy.getContent().find('ul li').eq(0).should('contain', 'test')
		cy.getContent().find('ul li').eq(1).should('contain', 'Nested list')
	})
})

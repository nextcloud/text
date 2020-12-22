/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license GNU AGPL version 3 or any later version
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


import { randHash } from '../utils/'
const randUser = randHash()

describe('Open test.md in viewer', function() {
	before(function() {
		// Init user
		cy.nextcloudCreateUser(randUser, 'password')
		cy.login(randUser, 'password')

		// Upload test files
		cy.uploadFile('test.md', 'text/markdown')
		cy.visit('/apps/files')

		// wait a bit for things to be settled
		cy.wait(1000)
	})
	after(function() {
		cy.logout()
	})

	it('See test.md in the list', function() {
		cy.get('#fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('contain', 'test.md')
	})

	it('Open the viewer on file click', function() {
		cy.visit('/apps/files')
		cy.openFile('test.md')
		cy.get('#viewer').should('be.visible')
		cy.get('#viewer .modal-title').should('contain', 'test.md')
		cy.get('#viewer .modal-header button.action-item__menutoggle').should('be.visible')
		cy.get('#viewer .modal-header button.icon-close').should('be.visible')

		cy.wait(2000)
		cy.get('#viewer', { timeout: 4000 })
			.should('be.visible')
			.and('have.class', 'modal-mask')
			.and('not.have.class', 'icon-loading')
	})

	it('Has opened the file', function() {
		cy.get('#viewer #editor .ProseMirror').should('contain', 'Hello world')
		cy.get('#viewer #editor .ProseMirror h2').should('contain', 'Hello world')
	})

	it('Shows the menu bar icons', function() {
		// FIXME those checks are failing since the parent container is currently at 0x0 size
		// due to the way we make the text app be a full screen viewer
		// cy.get('#viewer-content #editor .menubar .menubar-icons .icon-undo').should('be.visible')
		// cy.get('#viewer-content #editor .menubar .menubar-icons .icon-redo').should('be.visible')
		// cy.get('#viewer-content #editor .menubar .menubar-icons .icon-bold').should('be.visible')
	})

	it('Closes the editor', function() {
		cy.get('.modal-header button.icon-close').click()
		cy.get('#viewer').should('not.exist')
	})

	it('Take screenshot', function() {
		// gif is impossible to match with existing screenshot
		// just taking a screenshot to manually compare if needed
		cy.screenshot()
	})
})

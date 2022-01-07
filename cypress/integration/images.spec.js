/**
 * @copyright Copyright (c) 2021 Julien Veyssier <eneiluj@posteo.net>
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
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
		cy.uploadFile('github.png', 'image/png')
	})

	beforeEach(function() {
		cy.login(randUser, 'password')
	})

	it('See test.md in the list and open it', function() {
		cy.get('#fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('contain', 'test.md')

	})

	it('Insert an image from files', function() {
		cy.openFile('test.md')
		cy.log('Open submenu')
		const viewer = cy.get('#viewer')
		const submenu = viewer.get('.action-item.submenu')
		submenu.click()
		submenu.should('have.class', 'action-item--open')

		const trigger = submenu.get('.action-item.submenu > div.v-popover > .trigger')
		trigger
			.should('have.class', 'trigger')
			.invoke('attr','aria-describedby')
			.should('contain', 'popover_')
			.as('popoverId')

		cy.get('@popoverId').then(popoverId => {
			cy.log('Click on action entry')
			const popover = cy.get('div#' + popoverId)
			popover.should('have.class', 'open')
			cy.get('div#' + popoverId + ' li:nth-child(2)').click()
			cy.log('Select the file')
			cy.get('#picker-filestable tr[data-entryname="github.png"]').click()
			cy.log('Press OK')
			cy.get('.oc-dialog > .oc-dialog-buttonrow button').click()

			cy.log('Check the image is visible and well formed')
			const editor = cy.get('#editor .ProseMirror')
			editor.get('div.image')
				.should('be.visible')
				.invoke('attr', 'data-src')
				.should('contain', 'github.png')
			editor.get('div.image img').invoke('attr', 'src')
				.should('contain', 'apps/text/image?documentId=')
				.should('contain', 'imageFileName')
				.should('contain', 'github.png')
		})


		cy.screenshot()
	})

	it('Insert an image from a link', function() {
		cy.openFile('test.md')
		cy.log('Open submenu')
		const viewer = cy.get('#viewer')
		const submenu = viewer.get('.action-item.submenu')
		submenu.click()
		submenu.should('have.class', 'action-item--open')

		const trigger = submenu.get('.action-item.submenu > div.v-popover > .trigger')
		trigger
			.should('have.class', 'trigger')
			.invoke('attr','aria-describedby')
			.should('contain', 'popover_')
			.as('popoverId')

		cy.get('@popoverId').then(popoverId => {
			cy.log('Click on action entry')
			const popover = cy.get('div#' + popoverId)
			popover.should('have.class', 'open')
			cy.get('div#' + popoverId + ' li:nth-child(3)').click()
			cy.log('Type and validate')
			cy.get('div#' + popoverId + ' li:nth-child(3) input[type=text]')
				.type('https://nextcloud.com/wp-content/themes/next/assets/img/headers/engineering-small.jpg')
				.type('{enter}')
			//cy.get('div#' + popoverId + ' li:nth-child(3) form > label').click()

			cy.wait(4000)
			cy.log('Check the image is visible and well formed')
			const editor = cy.get('#editor .ProseMirror')
			editor.get('div.image:nth-child(1)')
				.should('be.visible')
				.invoke('attr', 'data-src')
				.should('contain', '.jpg')
			editor.get('div.image:nth-child(1) img').invoke('attr', 'src')
				.should('contain', 'apps/text/image?documentId=')
				.should('contain', 'imageFileName')
				.should('contain', '.jpg')
		})


		cy.screenshot()
	})

	it('Closes the editor', function() {
		cy.openFile('test.md')
		cy.get('#viewer .modal-header button.header-close').click()
		cy.get('#viewer').should('not.exist')
		cy.nextcloudDeleteUser(randUser, 'password')
	})

})

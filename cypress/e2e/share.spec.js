
/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
		cy.createFolder('folder')
		cy.uploadFile('test.md', 'text/markdown', 'folder/test.md')
		cy.uploadFile('test.md', 'text/markdown', 'folder/Readme.md')
		cy.uploadFile('test.md', 'text/markdown', 'test2.md')
		cy.uploadFile('test.md', 'text/markdown')
		cy.visit('/apps/files')
		cy.get('#fileList tr[data-file="test.md"]')
			.should('contain', 'test.md')
	})
	beforeEach(function() {
		cy.login(randUser, 'password')
	})

	it('Shares the file as a public read only link', function() {
		cy.visit('/apps/files')
		cy.get('#fileList tr[data-file="test.md"] a.action-share')
			.click({ force: true })
		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('#app-sidebar-vue a#sharing').trigger('click')
		cy.get('#app-sidebar-vue button.new-share-link').trigger('click')
		cy.get('#app-sidebar-vue a.sharing-entry__copy')
			.should('have.attr', 'href').and('include', '/s/')
			.then((href) => {
				cy.visit(href)
				cy.window().then(win => {
					win.OC.appswebroots.files_texteditor = true
					cy.getEditor().should('be.visible')
						.find('.ProseMirror').should('contain', 'Hello world')
						.find('h2').should('contain', 'Hello world')
				})
			})
	})

	it('Shares the file as a public link with write permissions', function() {
		cy.visit('/apps/files')
		cy.get('#fileList tr[data-file="test2.md"] a.action-share')
			.click({ force: true })
		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('#app-sidebar-vue a#sharing').trigger('click')
		cy.get('#app-sidebar-vue button.new-share-link').trigger('click')
		cy.get('#app-sidebar-vue .sharing-link-list .action-item__menutoggle').trigger('click')
		const checkboxAllowEditing = '.popover.open input[type=checkbox]'
		cy.get(checkboxAllowEditing).first().check({ force: true })
		cy.get(checkboxAllowEditing).first().should('be.checked')
		cy.get('#app-sidebar-vue a.sharing-entry__copy')
			.should('have.attr', 'href').and('include', '/s/')
			.then((href) => {
				cy.visit(href)
				cy.window().then(win => {
					win.OC.appswebroots.files_texteditor = true
					cy.getEditor()
						.should('be.visible')
						.find('.ProseMirror').should('contain', 'Hello world')
						.find('h2').should('contain', 'Hello world')

					cy.getMenu().should('be.visible')
					cy.getActionEntry('undo').should('be.visible')
					cy.getActionEntry('redo').should('be.visible')
					cy.getActionEntry('bold').should('be.visible')
				})
			})
	})

	it('Opens the editor as guest', function() {
		cy.visit('/apps/files')
		cy.get('#fileList tr[data-file="test2.md"] a.action-share')
			.click({ force: true })
		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('#app-sidebar-vue a#sharing').trigger('click')
		// cy.get('#app-sidebar-vue button.new-share-link').trigger('click')
		cy.get('#app-sidebar-vue a.sharing-entry__copy')
			.should('have.attr', 'href').and('include', '/s/')
			.then((href) => {
				cy.logout()
				cy.visit(href)
				cy.window().then(win => {
					win.OC.appswebroots.files_texteditor = true
					cy.wait(1000)
					cy.getEditor()
						.should('be.visible')
						.find('.ProseMirror').should('contain', 'Hello world')
						.find('h2').should('contain', 'Hello world')

					cy.getMenu().should('be.visible')
					cy.getActionEntry('undo').should('be.visible')
					cy.getActionEntry('redo').should('be.visible')
					cy.getActionEntry('bold').should('be.visible')
				})
			})
	})

	it('Shares a folder as a public read only link', function() {
		cy.visit('/apps/files')
		cy.get('#fileList tr[data-file="folder"] a.action-share')
			.click({ force: true })
		cy.get('#app-sidebar-vue')
			.should('be.visible')
		cy.get('#app-sidebar-vue a#sharing').trigger('click')
		cy.get('#app-sidebar-vue button.new-share-link').trigger('click')
		cy.get('#app-sidebar-vue a.sharing-entry__copy')
			.should('have.attr', 'href').and('include', '/s/')
			.then((href) => {
				cy.visit(href)
				cy.window().then(win => {
					win.OC.appswebroots.files_texteditor = true
					cy.get('#rich-workspace').should('contain', 'Hello world')
					cy.openFile('test.md')
					cy.get('#editor-container').should('be.visible')
					cy.get('#editor .ProseMirror').should('contain', 'Hello world')
					cy.get('#editor .ProseMirror h2').should('contain', 'Hello world')
					cy.get('.modal-header button.header-close').click()
					cy.get('.modal-mask').should('not.exist')
				})
			})
	})

})

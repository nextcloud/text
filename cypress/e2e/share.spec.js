/**
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
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
const recipient = randUser()

describe('Open test.md in viewer', function() {
	before(function() {
		// Init user
		cy.createUser(user)
		cy.login(user)

		// Upload test files
		cy.createFolder('folder')
		cy.uploadFile('test.md', 'text/markdown', 'folder/test.md')
		cy.uploadFile('test.md', 'text/markdown', 'folder/Readme.md')
		cy.uploadFile('test.md', 'text/markdown', 'test3.md')
		cy.uploadFile('test.md', 'text/markdown', 'test2.md')
		cy.uploadFile('test.md', 'text/markdown')

		cy.createUser(recipient)
	})
	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files')
	})

	it('Shares the file as a public read only link', function() {
		cy.shareFile('/test.md')
			.then((token) => {
				cy.logout()
				cy.visit(`/s/${token}`)
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')

				cy.get('.text-editor--readonly-bar')
					.getActionEntry('outline')
					.click()

				cy.getOutline()
					.find('header')
					.should('exist')
			})
	})

	it('Shares the file as a public link with write permissions', function() {
		cy.shareFile('/test2.md', { edit: true })
			.then((token) => {
				cy.visit(`/s/${token}`)
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')

				cy.getMenu().should('be.visible')
				cy.getActionEntry('undo').should('be.visible')
				cy.getActionEntry('redo').should('be.visible')
				cy.getActionEntry('bold').should('be.visible')
			})
	})

	it('Opens the editor as guest', function() {
		cy.shareFile('/test2.md', { edit: true })
			.then((token) => {
				cy.logout()
				cy.visit(`/s/${token}`)
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')

				cy.getMenu().should('be.visible')
				cy.getActionEntry('undo').should('be.visible')
				cy.getActionEntry('redo').should('be.visible')
				cy.getActionEntry('bold').should('be.visible')
			})
	})

	it('Shares a folder as a public read only link', function() {
		cy.shareFile('/folder')
			.then((token) => {
				cy.logout()

				return cy.visit(`/s/${token}`)
			})
			.then(() => {
				cy.openFileInShare('test.md')
				cy.getModal().getContent().should('be.visible')
				cy.getModal().getContent().should('contain', 'Hello world')
				cy.getModal().getContent().find('h2').should('contain', 'Hello world')
				cy.getModal().find('.modal-header button.header-close').click()
				cy.get('.modal-mask').should('not.exist')
				// cy.get('#rich-workspace').getContent().should('contain', 'Hello world')
			})
	})

	it('Opens the editor as guest', function() {
		cy.shareFile('/test3.md')
			.then((token) => {
				cy.logout()
				cy.visit(`/s/${token}`)
			})
			.then(() => {
				cy.getEditor().should('be.visible')
				cy.getContent()
					.should('contain', 'Hello world')
					.find('h2').should('contain', 'Hello world')

				cy.intercept({ method: 'POST', url: '**/apps/text/public/session/*/session' }).as('updateSession')
				cy.get('button.avatar-list').click()
				cy.get('.guest-name-dialog input[type="text"]')
					.type('someone{enter}')
				cy.wait('@updateSession')
					.its('response.body.guestName').should('eq', 'someone')
			})
	})

	it('Share a file with download disabled shows an error', function() {
		cy.shareFileToUser('test.md', recipient, {
			attributes: '[{"scope":"permissions","key":"download","enabled":false}]',
		}).then(() => {
			cy.login(recipient)
			cy.visit('/apps/files')
			cy.openFile('test.md')
			cy.getModal().find('.document-status').should('contain', 'This file cannot be displayed as download is disabled by the share')
			cy.getModal().getContent().should('not.exist')
		})
	})

	it('makes use of the file id', function() {
		cy.intercept({ method: 'PUT', url: '**/apps/text/public/session/*/create' })
			.as('create')
		cy.shareFile('/test2.md', { edit: true })
			.then((token) => {
				cy.logout()
				cy.visit(`/s/${token}`)
			})
		cy.wait('@create', { timeout: 10000 })
			.its('request.body.fileId')
			.should('be.a', 'Number')
	})

})

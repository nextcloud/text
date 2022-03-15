/**
 * @copyright Copyright (c) 2021 Azul <azul@riseup.net>
 *
 * @author Azul <azul@riseup.net>
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

describe('Workspace', function() {

	before(function() {
		cy.nextcloudCreateUser(randUser, 'password')
	})

	beforeEach(function() {
		cy.login(randUser, 'password')
		// isolate tests - each happens in it's own folder
		cy.createFolder(Cypress.currentTest.title)
		cy.visit(`apps/files?dir=/${encodeURIComponent(Cypress.currentTest.title)}`)
	})

	it('adds a Readme.md', function() {
		cy.get('#fileList').should('not.contain', 'Readme.md')
		openWorkspace()
			.type('Hello')
			.should('contain', 'Hello')
		openSidebar('Readme.md')
		cy.log('Regression test for #2215')
		cy.get('#rich-workspace .ProseMirror')
			.should('be.visible')
			.should('contain', 'Hello')
	})

	it('formats text', function() {
		openWorkspace()
			.type('Format me')
			.type('{selectall}')
		;[
			['bold', 'strong'],
			['italic', 'em'],
			['underline', 'u'],
			['strike', 's'],
		].forEach(([button, tag]) => {
			menuButton(button)
				.click()
				.should('have.class', 'is-active')
			cy.get(`.ProseMirror ${tag}`).should('contain', 'Format me')
			menuButton(button)
				.click()
				.should('not.have.class', 'is-active')
		})
	})

	it('links via menububble', function() {
		openWorkspace()
			.type('Nextcloud')
			.type('{selectall}')
		menuBubbleButton('link').click()
		cy.get('.menububble input').type('https://nextcloud.com{enter}')
		cy.get('.ProseMirror a')
			.should('contain', 'Nextcloud')
			.should('be.visible')
		cy.get('.ProseMirror a').invoke('attr', 'href')
			.should('include', 'https://nextcloud.com')
		cy.window().then((win) => {
			cy.stub(win, 'open').as('windowOpen')
		})
		cy.get('.ProseMirror a').click()
		cy.get('@windowOpen').should('be.calledWith', 'https://nextcloud.com/')
		cy.get('.ProseMirror').type('{selectall}')
		menuBubbleButton('link').click()
		cy.get('.menububble input').type('/team{enter}')
		cy.get('.ProseMirror a').click()
		cy.get('@windowOpen').should('be.calledWith', 'https://nextcloud.com/team')
	})

	it('creates headings via submenu', function() {
		openWorkspace()
			.type('Heading')
			.type('{selectall}')
		;['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((heading) => {
			menuButton('h1').click()
			submenuButton(heading).click()
			menuButton(heading).should('have.class', 'is-active')
			cy.get(`.ProseMirror ${heading}`)
				.should('contain', 'Heading')
			menuButton(heading).click()
			submenuButton(heading).click()
			menuButton('h1').should('not.have.class', 'is-active')
		})
	})

	it('creates lists', function() {
		openWorkspace()
			.type('List me')
			.type('{selectall}')
		;[
			['ul', 'ul'],
			['ol', 'ol'],
			['tasklist', 'ul[data-type="taskList"]'],
		].forEach(([button, tag]) => {
			menuButton(button)
				.click()
				.should('have.class', 'is-active')
			cy.get(`.ProseMirror ${tag}`).should('contain', 'List me')
			menuButton(button)
				.click()
				.should('not.have.class', 'is-active')
		})
	})

	it('takes README.md into account', function() {
		cy.uploadFile('test.md', 'text/markdown', `${Cypress.currentTest.title}/README.md`)
		cy.reload()
		cy.get('#fileList').should('contain', 'README.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
	})

	it('takes localized file name into account', function() {
		cy.nextcloudUpdateUser(randUser, 'password', 'language', 'de_DE')
		cy.uploadFile('test.md', 'text/markdown', `${Cypress.currentTest.title}/Anleitung.md`)
		cy.reload()
		cy.get('#fileList').should('contain', 'Anleitung.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
	})

	it('ignores localized file name in other language', function() {
		cy.nextcloudUpdateUser(randUser, 'password', 'language', 'fr')
		cy.uploadFile('test.md', 'text/markdown', `${Cypress.currentTest.title}/Anleitung.md`)
		cy.reload()
		cy.get('#fileList').should('contain', 'Anleitung.md')
		cy.get('.empty-workspace').should('contain', 'Ajoutez des notes, listes ou liens')
	})

	describe('callouts', () => {
		const types = ['info', 'warn', 'error', 'success']
		it('create callouts', () => {
			const workspace = openWorkspace()
			workspace.type('Callout')

			types.forEach(type => {
				// enable callout
				menuButton('info').click()
				submenuButton(type).click()

				// check if is active
				menuButton(type).should('have.class', 'is-active')

				// check content
				cy.get(`.ProseMirror .callout.callout-${type}`)
					.should('contain', 'Callout')

				// disable
				menuButton(type).click()
				submenuButton(type).click()

				// check if is inactive
				menuButton('info').should('not.have.class', 'is-active')
			})
		})

		it('toggle callouts', () => {
			const workspace = openWorkspace()
			workspace.type('Callout')

			const [first, ...rest] = types

			let last = first

			// enable callout
			menuButton('info').click()
			submenuButton(first).click()

			rest.forEach(type => {
				// enable callout
				menuButton(last).click()
				submenuButton(type).click()

				last = type

				// check if is active
				menuButton(type).should('have.class', 'is-active')

				// check content
				cy.get(`.ProseMirror .callout.callout-${type}`)
					.should('contain', 'Callout')
			})

			// disable
			menuButton(last).click()
			submenuButton(last).click()

			// check if is inactive
			menuButton('info').should('not.have.class', 'is-active')
		})
	})
})

const menuButton = (name) => {
	return cy.get(`#editor button.icon-${name}`)
}

const submenuButton = (name) => {
	return cy.get(`#editor button .icon-${name}`)
}

const menuBubbleButton = submenuButton

const openWorkspace = () => {
	cy.get('#rich-workspace .empty-workspace').click()
	cy.get('#editor .content-wrapper').click()
	return cy.get('#rich-workspace .ProseMirror')
}

const openSidebar = filename => {
	cy.get(`#fileList tr[data-file="${filename}"]`)
		.should('contain', filename)
	cy.get(`#fileList tr[data-file="${filename}"] .icon-more`).click()
	cy.get(`#fileList tr[data-file="${filename}"] .icon-details`).click()
	cy.get('.app-sidebar-header').should('contain', filename)
}

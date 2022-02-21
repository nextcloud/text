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
		cy.visit('/apps/files')
		// isolate tests - each happens in it's own folder
		cy.createFolder(Cypress.currentTest.title)
		cy.openFile(Cypress.currentTest.title)
	})

	it('adds a Readme.md', function() {
		cy.get('#fileList').should('not.contain', 'Readme.md')
		openWorkspace()
			.type('Hello')
			.should('contain', 'Hello')
		cy.get('#fileList').should('contain', 'Readme.md')
	})

	it('formats text', function() {
		openWorkspace()
			.type('Format me')
			.type('{selectall}')
		;[
			['bold', 'strong'],
			['italic', 'em'],
			['underline', 'u'],
			['strike', 's']
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

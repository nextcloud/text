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

import { randHash } from '../utils/index.js'
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
		cy.openWorkspace()
			.type('Hello')
			.should('contain', 'Hello')
		openSidebar('Readme.md')
		cy.log('Regression test for #2215')
		cy.get('#rich-workspace .ProseMirror')
			.should('be.visible')
			.should('contain', 'Hello')
	})

	it('formats text', function() {
		cy.openWorkspace()
			.type('Format me')
			.type('{selectall}')
		;[
			['bold', 'strong'],
			['italic', 'em'],
			['underline', 'u'],
			['strikethrough', 's'],
		].forEach(([button, tag]) => {
			menuButton(button)
				.click({ force: true })
				.should('have.class', 'is-active')
			cy.get(`.ProseMirror ${tag}`).should('contain', 'Format me')
			menuButton(button)
				.click({ force: true })
				.should('not.have.class', 'is-active')
		})
	})

	it('links via menububble', function() {
		cy.openWorkspace()
			.type('Nextcloud')
			.type('{selectall}')
		menuBubbleButton('add-link').click()
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
		menuBubbleButton('add-link').click()
		cy.get('.menububble input').type('/team{enter}')
		cy.get('.ProseMirror a').click()
		cy.get('@windowOpen').should('be.calledWith', 'https://nextcloud.com/team')
	})

	it('creates headings via submenu', function() {
		cy.openWorkspace()
			.type('Heading')
			.type('{selectall}')
		;['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((heading) => {
			const actionName = `headings-${heading}`

			getSubmenuItem('headings', actionName).click()

			cy.get(`.ProseMirror ${heading}`)
				.should('contain', 'Heading')

			getSubmenuItem('headings', actionName)
				.should('have.class', 'is-active')
				.click()

			menuButton('headings').should('not.have.class', 'is-active')
		})
	})

	it('creates lists', function() {
		cy.openWorkspace()
			.type('List me')
			.type('{selectall}')
		;[
			['unordered-list', 'ul'],
			['ordered-list', 'ol'],
			['task-list', 'ul[data-type="taskList"]'],
		].forEach(([button, tag]) => {
			menuButton(button)
				.click({ force: true })
				.should('have.class', 'is-active')

			cy.get(`.ProseMirror ${tag}`).should('contain', 'List me')

			menuButton(button)
				.click({ force: true })
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

	it('inserts and removes a table', function() {
		cy.openWorkspace()
			.type('Let\'s insert a Table')

		cy.getMenu()
			.then($el => {
				// sometimes actions can be hide
				if ($el.find('[data-text-action-entry="remain"]').length) {
					toggleMoreActions()
					return submenuButton('table').click()
				}

				return menuButton('table').click()
			})

		cy.get('.ProseMirror').type('content')
		cy.get('.ProseMirror table tr:first-child th:first-child')
			.should('contain', 'content')
		cy.get('.ProseMirror [data-text-table-actions="settings"]').click()

		cy.get('[data-text-table-action="delete"]').click()
		cy.get('.ProseMirror')
			.should('not.contain', 'content')
	})

	describe('callouts', () => {
		const types = ['info', 'warn', 'error', 'success']

		before(function() {
			cy.nextcloudCreateUser(randUser, 'password')
		})

		beforeEach(function() {
			cy.login(randUser, 'password')
			// isolate tests - each happens in it's own folder
			cy.createFolder(Cypress.currentTest.title)
			cy.visit(`apps/files?dir=/${encodeURIComponent(Cypress.currentTest.title)}`)
			cy.openWorkspace().type('Callout')
		})
		// eslint-disable-next-line cypress/no-async-tests
		it('create callout', () => {
			cy.wrap(types).each((type) => {
				cy.log(`creating ${type} callout`)

				const actionName = `callout-${type}`

				// enable callout
				getSubmenuItem('callouts', actionName)
					.click()
					.then(() => {
						// check content
						cy.get(`.ProseMirror .callout.callout--${type}`)
							.should('contain', 'Callout')

						// disable
						return getSubmenuItem('callouts', actionName)
							.should('have.class', 'is-active')
							.click()
					})
			})
		})

		it('toggle callouts', () => {
			const [first, ...rest] = types

			let last = first

			// enable callout
			getSubmenuItem('callouts', `callout-${first}`)
				.click()

			cy.wrap(rest)
				.each(type => {
					const actionName = `callout-${type}`
					return getSubmenuItem('callouts', actionName)
						.click()
						.then(() => cy.get(`.ProseMirror .callout.callout--${type}`))
						.should('contain', 'Callout')
						.then(() => {
							last = type
						})
				})
				.then(() => {
					getSubmenuItem('callouts', `callout-${last}`)
						.click()

					menuButton('callouts')
						.should('not.have.class', 'is-active')
				})
		})
	})

	describe('localize', () => {
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
	})

})

const menuButton = (name) => {
	return cy.getActionEntry(name)
}

const submenuButton = (name) => {
	return cy.get('.popover.open').getActionEntry(name)
}

const toggleMoreActions = () => {
	return menuButton('remain').click()
}

const menuBubbleButton = (name) => {
	return cy.get('[data-text-el="menu-bubble"]').find(`[data-text-bubble-action="${name}"]`)
}

const getSubmenuItem = (parent, item) => {
	menuButton(parent).click()
	return submenuButton(item)
}

const openSidebar = filename => {
	cy.get(`#fileList tr[data-file="${filename}"]`)
		.should('contain', filename)
	cy.get(`#fileList tr[data-file="${filename}"] .icon-more`).click()
	cy.get(`#fileList tr[data-file="${filename}"] .icon-details`).click()
	cy.get('.app-sidebar-header').should('contain', filename)
}

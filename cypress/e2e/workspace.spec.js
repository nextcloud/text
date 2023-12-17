/**
 * @copyright Copyright (c) 2021 Azul <azul@riseup.net>
 *
 * @author Azul <azul@riseup.net>
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

describe('Workspace', function() {
	let currentFolder

	before(function() {
		cy.createUser(user, 'password')
	})

	beforeEach(function() {
		cy.login(user)
		// Some tests modify the language.
		// Make sure it's the default otherwise.
		cy.modifyUser(user, 'language', 'en')
		// isolate tests - each happens in its own folder
		const retry = cy.state('test').currentRetry()
		currentFolder = retry
			? `${Cypress.currentTest.title} (${retry})`
			: Cypress.currentTest.title
		cy.createFolder(currentFolder)
	})

	it('Hides the workspace when switching to another folder', function() {
		cy.uploadFile('test.md', 'text/markdown', `${currentFolder}/README.md`)
		cy.createFolder(`${currentFolder}/subdirectory`)
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		cy.getFile('README.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
		cy.openFolder('subdirectory')
		cy.get('#rich-workspace')
			.should('not.exist')
	})

	it('Hides the workspace when switching to another view', function() {
		cy.uploadFile('test.md', 'text/markdown', `${currentFolder}/README.md`)
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		cy.getFile('README.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
		cy.get('a[href*="/apps/files/recent"]')
			.click()
		cy.get('#rich-workspace')
			.should('not.exist')
	})

	it('adds a Readme.md', function() {
		cy.createDescription(currentFolder)
		openSidebar('Readme.md')
		cy.get('#rich-workspace .text-editor .text-editor__wrapper')
			.should('be.visible')
	})

	it('formats text', function() {
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		cy.openWorkspace(currentFolder)
		const buttons = [
			['bold', 'strong'],
			['italic', 'em'],
			['underline', 'u'],
			['strikethrough', 's'],
		]
		cy.getContent().click()
		buttons.forEach(([button, tag]) => testButtonUnselected(button, tag))
		cy.getContent().type('Format me{selectall}')
		buttons.forEach(([button, tag]) => testButton(button, tag, 'Format me'))
	})

	it('creates headings via submenu', function() {
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		cy.openWorkspace(currentFolder).type('Heading')
		cy.getContent().type('{selectall}')
		;['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((heading) => {
			const actionName = `headings-${heading}`

			cy.getSubmenuEntry('headings', actionName).click()

			cy.getContent()
				.find(`${heading}`)
				.should('contain', 'Heading')

			cy.getSubmenuEntry('headings', actionName)
				.should('have.class', 'is-active')
				.click()

			cy.getMenuEntry('headings').should('not.have.class', 'is-active')
		})
	})

	it('creates lists', function() {
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		cy.openWorkspace(currentFolder).type('List me')
		cy.getContent().type('{selectall}')
		;[
			['unordered-list', 'ul'],
			['ordered-list', 'ol'],
			['task-list', 'ul[data-type="taskList"]'],
		].forEach(([button, tag]) => testButton(button, tag, 'List me'))
	})

	it('takes README.md into account', function() {
		cy.uploadFile('test.md', 'text/markdown', `${Cypress.currentTest.title}/README.md`)
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		cy.getFile('README.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
	})

	it('emoji picker', () => {
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		cy.openWorkspace(currentFolder)
			.type('# Let\'s smile together{enter}## ')

		cy.getMenuEntry('emoji-picker')
			.click()

		cy.get('#emoji-mart-list button[aria-label="😀, grinning"]')
			.first()
			.click()

		cy.getEditor()
			.find('h2')
			.contains('😀')
	})

	it('relative folder links', () => {
		cy.createFolder(`${currentFolder}/sub-folder`)
		cy.createFolder(`${currentFolder}/sub-folder/alpha`)

		cy.uploadFile('test.md', 'text/markdown', `${currentFolder}/sub-folder/alpha/test.md`)
		cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)

		cy.openWorkspace(currentFolder)
			.type('link me')
		cy.getContent()
			.type('{selectall}')

		cy.getSubmenuEntry('insert-link', 'insert-link-file')
			.click()

		cy.get('.file-picker__main .file-picker__file-name[title="sub-folder"]').click()
		cy.get('.file-picker__main .file-picker__file-name[title="alpha"]').click()
		cy.get('.file-picker__main .file-picker__file-name[title="test"]').click()
		cy.get('.dialog__actions button.button-vue--vue-primary').click()

		cy.getEditor()
			.find('a')
			.should('have.attr', 'href')
			.and('contains', `dir=/${currentFolder}/sub-folder/alpha`)
			.and('contains', '#relPath=sub-folder/alpha/test.md')

		cy.getEditor()
			.find('a').click()

		cy.getModal()
			.find('.modal-header')
			.contains('test.md')

		cy.getModal()
			.getEditor()
			.contains('Hello world')

		cy.getModal().find('button.header-close').click()
	})

	describe('callouts', () => {
		const types = ['info', 'warn', 'error', 'success']

		beforeEach(function() {
			cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
			cy.openWorkspace(currentFolder).type('Callout')
		})
		// eslint-disable-next-line cypress/no-async-tests
		it('create callout', () => {
			cy.wrap(types).each((type) => {
				cy.log(`creating ${type} callout`)

				const actionName = `callout-${type}`

				// enable callout
				cy.getSubmenuEntry('callouts', actionName).click()

				// check content
				cy.getContent()
					.find(`.callout.callout--${type}`)
					.should('contain', 'Callout')

				// disable
				cy.getSubmenuEntry('callouts', actionName)
					.should('have.class', 'is-active')
					.click()
			})
		})

		it('toggle callouts', () => {
			const [first, ...rest] = types

			// enable callout
			cy.getSubmenuEntry('callouts', `callout-${first}`)
				.click()

			cy.wrap(rest).each(type => {
				const actionName = `callout-${type}`
				cy.getSubmenuEntry('callouts', actionName).click()
				cy.getContent().find(`.callout.callout--${type}`)
					.should('contain', 'Callout')
			})

			cy.getSubmenuEntry('callouts', `callout-${rest.at(-1)}`)
				.click()
			cy.getMenuEntry('callouts')
				.should('not.have.class', 'is-active')
		})
	})

	describe('localize', () => {
		it('takes localized file name into account', function() {
			cy.modifyUser(user, 'language', 'de_DE')
			cy.uploadFile('test.md', 'text/markdown', `${Cypress.currentTest.title}/Anleitung.md`)
			cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
			cy.getFile('Anleitung.md')
			cy.get('#rich-workspace .ProseMirror')
				.should('contain', 'Hello world')
		})

		it('ignores localized file name in other language', function() {
			cy.modifyUser(user, 'language', 'fr')
			cy.uploadFile('test.md', 'text/markdown', `${Cypress.currentTest.title}/Anleitung.md`)
			cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
			cy.getFile('Anleitung.md')
		})
	})

	describe('create Readme.md', () => {
		const checkContent = () => {
			const txt = Cypress.currentTest.title

			cy.getEditor().find('[data-text-el="editor-content-wrapper"]').click()

			cy.getContent().type(txt)
			cy.getContent().should('contain', txt)
		}

		beforeEach(() => {
			cy.visit(`apps/files?dir=/${encodeURIComponent(currentFolder)}`)
		})

		it('click', () => {
			cy.openWorkspace(currentFolder).click()
			checkContent()
		})

		it('enter', () => {
			cy.openWorkspace(currentFolder).type('{enter}')
			checkContent()
		})

		it('spacebar', () => {
			cy.openWorkspace(currentFolder)
				.trigger('keyup', {
					keyCode: 32,
					which: 32,
					shiftKey: false,
					ctrlKey: false,
					force: true,
				})
			checkContent()
		})
	})

})

const openSidebar = filename => {
	cy.getFile(filename).find('.files-list__row-mtime').click()
	cy.get('.app-sidebar-header').should('contain', filename)
}

/**
 *
 * @param {string} button Name of the button to click.
 * @param {string} tag Html tag expected to be toggled.
 * @param {string} content Content expected in the element.
 */
function testButton(button, tag, content) {
	cy.getMenuEntry(button).click()
	cy.getMenuEntry(button).should('have.class', 'is-active')
	cy.getContent()
		.find(`${tag}`)
		.should('contain', content)
	cy.getMenuEntry(button).click()
	cy.getMenuEntry(button).should('not.have.class', 'is-active')
}

/**
 *
 * @param {string} button Name of the button to click.
 * @param {string} tag Html tag expected to be toggled.
 */
function testButtonUnselected(button, tag) {
	cy.getMenuEntry(button).click()
	cy.getMenuEntry(button).should('have.class', 'is-active')
	cy.getContent().type('Format me{selectall}')
	cy.getContent().find(`${tag}`)
		.should('contain', 'Format me').type('{del}')
	cy.getMenuEntry(button).click()
	cy.getMenuEntry(button).should('have.class', 'is-active').click()
	cy.getMenuEntry(button).should('not.have.class', 'is-active')
	cy.getContent().type('Format me{selectall}')
	cy.getMenuEntry(button).find(`${tag}`)
		.should('not.exist')
	cy.getContent().type('{del}')
}

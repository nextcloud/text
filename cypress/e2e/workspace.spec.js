/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'
const user = randUser()

describe('Workspace', function() {

	before(function() {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		// Some tests modify the language.
		// Make sure it's the default otherwise.
		cy.modifyUser(user, 'language', 'en')
		// isolate tests - each happens in its own folder
		cy.createTestFolder().as('testFolder')
	})

	it('Initializes the workspace without errors', function() {
		cy.visitTestFolder({
			onBeforeLoad: win => cy.spy(win.console, 'error').as('consoleError'),
		})
		cy.then(() => {
			expect(this.consoleError).to.not.have.been.calledWithMatch('workspace')
		})
	})

	it('Hides the workspace when switching to another folder', function() {
		cy.uploadFile('test.md', 'text/markdown', `${this.testFolder}/README.md`)
		cy.createFolder(`${this.testFolder}/subdirectory`)
		cy.visitTestFolder()
		cy.getFile('README.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
		cy.openFolder('subdirectory')
		cy.get('#rich-workspace')
			.should('not.exist')
	})

	it('Hides the workspace when switching to another view', function() {
		cy.uploadFile('test.md', 'text/markdown', `${this.testFolder}/README.md`)
		cy.visitTestFolder()
		cy.getFile('README.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
		cy.get('a[href*="/apps/files/recent"]')
			.click()
		cy.get('#rich-workspace')
			.should('not.exist')
	})

	it('adds a Readme.md', function() {
		cy.visitTestFolder()
		cy.createDescription()
		openSidebar('Readme.md')
		cy.get('#rich-workspace .text-editor .text-editor__wrapper')
			.should('be.visible')
	})

	it('formats text', function() {
		cy.visitTestFolder()
		cy.openWorkspace()
		const buttons = [
			['bold', 'strong'],
			['italic', 'em'],
			['underline', 'u'],
			['strikethrough', 's'],
		]
		cy.getContent().click()
		buttons.forEach(([button, tag]) => testButtonUnselected(button, tag))
		// format is gone when text is gone
		cy.getContent().type('Format me')
		cy.getContent().find('s')
			.should('not.exist')
		cy.getContent()
			.should('contain', 'Format me')
		cy.getContent().type('{selectall}')
		buttons.forEach(([button, tag]) => testButton(button, tag, 'Format me'))
	})

	it('creates headings via submenu', function() {
		cy.visitTestFolder()
		cy.openWorkspace().type('Heading')
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
		cy.visitTestFolder()
		cy.openWorkspace().type('List me')
		cy.getContent().type('{selectall}')
		;[
			['unordered-list', 'ul'],
			['ordered-list', 'ol'],
			['task-list', 'ul.contains-task-list'],
		].forEach(([button, tag]) => testListButton(button, tag, 'List me'))
	})

	it('takes README.md into account', function() {
		cy.uploadFile('test.md', 'text/markdown', `${this.testFolder}/README.md`)
		cy.visitTestFolder()
		cy.getFile('README.md')
		cy.get('#rich-workspace .ProseMirror')
			.should('contain', 'Hello world')
	})

	it('emoji picker', function() {
		cy.visitTestFolder()
		cy.openWorkspace()
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

	it('file links', function() {
		cy.createFolder(`${this.testFolder}/sub-folder`)
		cy.createFolder(`${this.testFolder}/sub-folder/alpha`)

		cy.uploadFile('test.md', 'text/markdown', `${this.testFolder}/sub-folder/alpha/test.md`)
		cy.visitTestFolder()

		cy.openWorkspace()
			.type('link me')
		cy.getContent()
			.type('{selectall}')

		cy.getSubmenuEntry('insert-link', 'insert-link-file')
			.click()

		cy.get('.file-picker [data-filename="sub-folder"]').click()
		cy.get('.file-picker [data-filename="alpha"]').click()
		cy.get('.file-picker [data-filename="test.md"]').click()
		cy.get('.dialog__actions button.button-vue--vue-primary').click()

		cy.getContent()
			.type('{leftArrow}')

		cy.get('.link-view-bubble .widget-file', { timeout: 10000 })
			.find('.widget-file__title')
			.contains('test.md')
			.click({ force: true })

		cy.getModal()
			.find('.modal-header')
			.contains('test.md')

		cy.getModal()
			.getEditor()
			.contains('Hello world')

		cy.getModal().find('button.header-close').click()
	})

	describe('callouts', function() {
		const types = ['info', 'warn', 'error', 'success']

		beforeEach(function() {
			cy.visitTestFolder()
			cy.openWorkspace().type('Callout')
		})
		// eslint-disable-next-line cypress/no-async-tests
		it('create callout', function() {
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

		it('toggle callouts', function() {
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

	describe('localize', function() {
		it('takes localized file name into account', function() {
			cy.modifyUser(user, 'language', 'de_DE')
			cy.uploadFile('test.md', 'text/markdown', `${this.testFolder}/Anleitung.md`)
			cy.visitTestFolder()
			cy.getFile('Anleitung.md')
			cy.get('#rich-workspace .ProseMirror')
				.should('contain', 'Hello world')
		})

		it('creates description with localized name properly rendered', function() {
			cy.modifyUser(user, 'language', 'es')
			cy.visitTestFolder()
			cy.createDescription('Añadir descripción a carpeta')
			cy.getFile('Léeme.md')
			cy.get('#rich-workspace .editor__content').should('be.visible')
		})

		it('ignores localized file name in other language', function() {
			cy.modifyUser(user, 'language', 'fr')
			cy.uploadFile('test.md', 'text/markdown', `${this.testFolder}/Anleitung.md`)
			cy.visitTestFolder()
			cy.getFile('Anleitung.md')
			cy.get('#rich-workspace .ProseMirror')
				.should('not.exist')
		})
	})

	describe('create Readme.md', function() {
		const checkContent = function() {
			const txt = Cypress.currentTest.title

			cy.getEditor().find('[data-text-el="editor-content-wrapper"]').click()

			cy.getContent().type(txt)
			cy.getContent().should('contain', txt)
		}

		beforeEach(function() {
			cy.visitTestFolder()
		})

		it('click', function() {
			cy.openWorkspace().click()
			checkContent()
		})

		it('enter', function() {
			cy.openWorkspace().type('{enter}')
			checkContent()
		})

		it('spacebar', function() {
			cy.openWorkspace()
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
 * @param {string} button Name of the button to click.
 * @param {string} tag Html tag expected to be toggled.
 * @param {string} content Content expected in the element.
 */
function testListButton(button, tag, content) {
	cy.getSubmenuEntry('lists', button)
		.should('not.have.class', 'is-active')
		.click()
	cy.getContent()
		.find(`${tag}`)
		.should('contain', content)
	cy.getSubmenuEntry('lists', button)
		.should('have.class', 'is-active')
		.click()
}

/**
 * @param {string} button Name of the button to click.
 * @param {string} tag Html tag expected to be toggled.
 * @param {string} content Content expected in the element.
 */
function testButton(button, tag, content) {
	cy.getMenuEntry(button)
		.should('not.have.class', 'is-active')
		.click()
	cy.getContent()
		.find(`${tag}`)
		.should('contain', content)
	cy.getMenuEntry(button)
		.should('have.class', 'is-active')
		.click()
}

/**
 *
 * @param {string} button Name of the button to click.
 * @param {string} tag Html tag expected to be toggled.
 */
function testButtonUnselected(button, tag) {
	cy.getMenuEntry(button)
		.should('not.have.class', 'is-active')
		.click()
	cy.getContent().type('Format me')
	cy.getContent().find(`${tag}`)
		.should('contain', 'Format me')
	cy.getContent().type('{selectall}{del}')
}

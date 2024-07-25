/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../utils/index.js'

const currentUser = randUser()

const fileName = 'empty.md'

describe('Smart picker', () => {
	before(() => {
		initUserAndFiles(currentUser, 'empty.md')
	})

	beforeEach(() => {
		cy.login(currentUser)
		cy.visit('/apps/files')
	})

	it('Type and see the smart picker', () => {
		cy.isolateTest({
			sourceFile: fileName,
		})
		cy.openFile(fileName, { force: true })

		cy.getContent()
			.type('/')

		cy.get('.tippy-box .suggestion-list').children().should(($children) => {
			const entries = $children.find('.suggestion-list__item').map((i, el) => el.innerText).get()
			expect(entries.length).to.be.greaterThan(0)
			expect('To-Do list').to.be.oneOf(entries)
			expect('Table').to.be.oneOf(entries)
		})

		cy.getContent()
			.click({ force: true })

		cy.getContent()
			.type('Heading{enter}Hello World{enter}')

		cy.getContent()
			.find('h1')
			.should('contain.text', 'Hello World')
	})

	it('Insert a link with the smart picker', () => {
		cy.isolateTest({
			sourceFile: fileName,
		})
		cy.openFile(fileName, { force: true })

		cy.getContent()
			.type('/Any')

		cy.get('.tippy-box .suggestion-list').children().should(($children) => {
			const entries = $children.find('.suggestion-list__item').map((i, el) => el.innerText).get()
			expect(entries.length).to.be.eq(1)
			expect('Any link').to.be.oneOf(entries)
		})

		cy.getContent()
			.click({ force: true })

		cy.getContent()
			.type('{enter}')

		cy.get('.reference-picker-modal--content')
			.should('be.visible')

		cy.get('.reference-picker input')
			.type('https://github.com')

		cy.get('.reference-widget')
			.should('be.visible')
			.should('contain.text', 'GitHub')

		cy.get('.reference-picker input')
			.type('{enter}')

		cy.getContent()
			.find('a')
			.should('contain.text', 'https://github.com')

	})
})

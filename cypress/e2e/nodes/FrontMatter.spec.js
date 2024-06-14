/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randUser } from '../../utils/index.js'

const user = randUser()

describe('Front matter support', function() {
	before(function() {
		initUserAndFiles(user, 'frontmatter.md', 'empty.md')
	})

	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files')
	})

	it('Open file with front matter', function() {
		cy.openFile('frontmatter.md').then(() => {
			cy.getContent().find('pre.frontmatter').should(pre => {
				expect(pre.length === 1)
				expect(pre[0].text === 'some: value\nother: 1.2')
			})
		})
	})

	it('Add front matter', function() {
		cy.openFile('empty.md').clearContent()
		cy.getContent().type('---')
		cy.getContent().type('test')
		cy.getContent().find('pre.frontmatter').should(pre => {
			expect(pre.length === 1)
			expect(pre[0].text === 'test')
		})
	})

	it('Do not add multiple front matter', function() {
		cy.openFile('empty.md').clearContent()
		cy.getContent().type('---test')
		cy.getContent().type('{downArrow}')
		cy.getContent().type('---test')
		cy.getContent().find('pre.frontmatter').should(pre => expect(pre.length === 1))
		cy.getContent().find('hr').should(hr => expect(hr.length === 1))
	})

	it('Reopen front matter', function() {
		cy.openFile('frontmatter.md')
		cy.getContent()
			.type('{moveToEnd}New line{enter}')
		cy.getContent()
			.find('pre.frontmatter').should(pre => {
				expect(pre.length === 1)
			})
		cy.closeFile()
		cy.intercept({ method: 'POST', url: '**/apps/text/session/*/sync' }).as('sync')
		cy.openFile('frontmatter.md')
		cy.wait('@sync')
		cy.wait('@sync')
		cy.getContent().find('pre.frontmatter').should('have.length', 1)
	})
})

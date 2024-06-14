/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../../utils/index.js'

const fileName = 'empty.md'
const user = randUser()

describe('Hard break support', function() {
	before(function() {
		cy.createUser(user)
	})

	beforeEach(function() {
		cy.login(user)
		cy.isolateTest({
			sourceFile: fileName,
		})

		return cy.openFile(fileName, { force: true })
	})

	it('Can create hard breaks with shift+enter', () => {
		cy.getContent().type('Hello')
		cy.getContent().type('{shift+enter}world')
		cy.getContent()
			.find('p br')
			.should('exist')
	})

	it('Convert paragraph break into hard break', () => {
		cy.getContent().type('Hello')
		cy.getContent().type('{enter}')
		cy.getContent().type('world')
		cy.getContent()
			.find('p')
			.should('have.length', 2)
			.and($p => {
				expect($p[0]).to.contain('Hello')
				expect($p[1]).to.contain('world')
			})
		cy.getContent()
			.type('{home}{backspace}')
		cy.getContent()
			.find('p br')
			.should('exist')
	})

	it('Do not create hard breaks within headings', () => {
		cy.getContent().type('# Hello')
		cy.getContent().type('{shift+enter}world')
		cy.getContent()
			.find('h1 br')
			.should('not.exist')
	})
})

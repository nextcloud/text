/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'
const user = randUser()

function testPlainInputRule(chars, expected) {
	cy.getContent().type(chars)
	cy.getContent().should('contain', expected)
	return cy.closeFile()
}

describe('input rules', () => {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
		cy.uploadTestFile()
		cy.visit('/apps/files')
		cy.openTestFile()
	})

	it('unordered list item', () => {
		cy.getContent().type('* item')
		cy.getContent().find('ul').find('li').should('contain', 'item')
		cy.closeFile()
	})

	it('ordered list item', () => {
		cy.getContent().type('1. item')
		cy.getContent().find('ol').find('li').should('contain', 'item')
		cy.closeFile()
	})

	it('task list item', () => {
		cy.getContent().type('* [] item')
		cy.getContent().find('ul').find('li').find('input[type="checkbox"]')
		cy.getContent().find('ul').find('li').should('contain', 'item')
		cy.closeFile()
	})

	it('blockquote', () => {
		cy.getContent().type('> quote')
		cy.getContent().find('blockquote').should('contain', 'uote')
		cy.closeFile()
	})

	it('codeblock', () => {
		cy.getContent().type('```{enter}code')
		cy.getContent().find('pre').should('contain', 'code')
		cy.closeFile()
	})

	it('inline code', () => {
		cy.getContent().type('`code`')
		cy.getContent().find('code').should('contain', 'code')
		cy.closeFile()
	})

	it('link', () => {
		cy.getContent().type('[link](https://example.org/)')
		cy.getContent().find('a').should('contain', 'link')
		cy.closeFile()
	})

	it('emoji', () => testPlainInputRule(':+1{enter}', '👍'))

	it('typography: ellipsis', () => testPlainInputRule('...', '…'))
	it('typography: copyright', () => testPlainInputRule('(c)', '©'))
	it('typography: oneHalf', () => testPlainInputRule('1/2 ', '½'))
	it('typography: superscriptTwo', () => testPlainInputRule('^2', '²'))
	it('typography: emDash', () => testPlainInputRule('-- ', '—'))
	it('typography: leftArrow', () => testPlainInputRule('<- ', '←'))
	it('typography: rightArrow', () => testPlainInputRule('->', '→'))
	it('typography: leftRightArrow', () => testPlainInputRule('<->', '↔'))
	it('typography: leftRightDoubleArrow', () => testPlainInputRule('<=>', '⇔'))
	it('typography: leftRightLongArrow', () => testPlainInputRule('<-->', '⟷'))
})

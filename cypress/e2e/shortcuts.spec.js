/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'
const user = randUser()

const modKey = Cypress.platform === 'darwin' ? '{cmd}' : '{ctrl}'
const testShortcut = (shortcut, tag) => {
	cy.getContent()
		.type(shortcut)

	cy.getContent()
		.find(tag)
		.should('contain', Cypress.currentTest.title)

	return cy.closeFile()
}

const testHeading = (num) => {
	testShortcut(`${modKey}{shift}${num}`, `h${num}`)
}

describe('keyboard shortcuts', () => {

	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
		cy.uploadTestFile()
		cy.visit('/apps/files')
		cy.openTestFile()
	    cy.getContent().type(Cypress.currentTest.title)
		cy.getContent().type('{selectall}')
	})

	it('bold', () => testShortcut(`${modKey}b`, 'strong'))
	it('italic', () => testShortcut(`${modKey}i`, 'em'))
	it('underline', () => testShortcut(`${modKey}u`, 'u'))
	it('strikethrough', () => testShortcut(`${modKey}{shift}s`, 's'))
	it('blockquote', () => testShortcut(`${modKey}{shift}b`, 'blockquote'))
	it('codeblock', () => testShortcut(`${modKey}{alt}c`, 'pre'))
	it('ordered-list', () => testShortcut(`${modKey}{shift}7`, 'ol'))
	it('unordered-list', () => testShortcut(`${modKey}{shift}8`, 'ul'))
	it('task-list', () => testShortcut(`${modKey}{shift}9`, 'ul.contains-task-list'))

	// Headings
	const levels = [1, 2, 3, 4, 5, 6]
	levels.forEach((level) => {
		it(`heading-${level}`, () => testHeading(level))
	})

})

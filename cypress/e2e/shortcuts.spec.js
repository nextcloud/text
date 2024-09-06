/**
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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

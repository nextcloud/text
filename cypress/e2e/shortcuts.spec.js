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

const testShortcut = (shortcut, tag) => {
	cy.getContent()
		.type(shortcut)

	cy.getContent()
		.find(tag)
		.should('contain', Cypress.currentTest.title)

	return cy.closeFile()
}

const testHeading = (num) => {
	testShortcut(`{ctrl}{shift}${num}`, `h${num}`)
}

describe('keyboard shortcuts', () => {

	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
		cy.visit('/apps/files')
		const path = `/${Cypress.currentTest.title}.md`
		cy.uploadFile(
			'empty.md',
			'text/markdown',
			path
		)
		cy.window().then(win => win.OCA.Viewer.open({ path }))
	    cy.getContent()
			.type(Cypress.currentTest.title)
			.type('{selectall}')
	})

	it('bold', () => testShortcut('{ctrl}b', 'strong'))
	it('italic', () => testShortcut('{ctrl}i', 'em'))
	it('underline', () => testShortcut('{ctrl}u', 'u'))
	it('strikethrough', () => testShortcut('{ctrl}{shift}x', 's'))
	it('blockquote', () => testShortcut('{ctrl}{shift}b', 'blockquote'))
	it('codeblock', () => testShortcut('{ctrl}{alt}c', 'pre'))
	it('ordered-list', () => testShortcut('{ctrl}{shift}7', 'ol'))
	it('unordered-list', () => testShortcut('{ctrl}{shift}8', 'ul'))
	it('task-list', () => testShortcut('{ctrl}{shift}9', 'ul[data-type="taskList"]'))

	// Headings
	const levels = [1, 2, 3, 4, 5, 6]
	levels.forEach((level) => {
		it(`heading-${level}`, () => testHeading(level))
	})

})

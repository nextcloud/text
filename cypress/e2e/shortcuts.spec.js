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

import { randHash } from '../utils/index.js'

const randUser = randHash()

const prepareTest = () => {
	return cy.openFile(`${Cypress.currentTest.title}.md`)
		.then(() => {
			return cy.getContent()
				.type(Cypress.currentTest.title)
				.type('{selectall}')
		})
}

const applyTest = (shortcut, tag) => {
	cy.getContent()
		.type(shortcut)

	return cy.getContent()
		.find(tag)
		.should('contain', Cypress.currentTest.title)
}

const shortcuts = {
	bold: ['{ctrl}b', 'strong'],
	italic: ['{ctrl}i', 'em'],
	underline: ['{ctrl}u', 'u'],
	strikethrough: ['{ctrl}{shift}x', 's'],
	blockquote: ['{ctrl}{shift}b', 'blockquote'],
	codeblock: ['{ctrl}{alt}c', 'pre'],
	'ordered-list': ['{ctrl}{shift}7', 'ol'],
	'unordered-list': ['{ctrl}{shift}8', 'ul'],
	'task-list': ['{ctrl}{shift}9', 'ul[data-type="taskList"]'],
	...Array.from({ length: 6 }).reduce((acc, _, index) => {
		const num = index + 1
		const tag = `h${num}`
		acc[`heading-${tag}`] = [`{ctrl}{shift}${num}`, tag]

		return acc
	}, {}),
}

describe('keyboard shortcuts', () => {
	before(() => {
		cy.nextcloudCreateUser(randUser, 'password')
	})

	beforeEach(() => {
		cy.login(randUser, 'password')
			.then(() => {
				return cy.uploadFile(
					'empty.md',
					'text/markdown',
					`${Cypress.currentTest.title}.md`
				)
			})
			.then(() => cy.reloadFileList())
	})

	Object.entries(shortcuts)
		.forEach(([name, [shortcut, tag]]) => {
			it(name, () => {
				prepareTest()
					.then(() => applyTest(shortcut, tag))
			})
		})

})

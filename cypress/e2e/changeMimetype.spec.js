/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Changing mimetype from/to markdown resets document session', function() {
	before(function() {
		// Init user
		cy.createUser(user)
		cy.login(user)
		cy.uploadFile('empty.md', 'text/markdown', 'test1.md')
		cy.uploadFile('empty.txt', 'text/plain', 'test2.txt')
	})
	beforeEach(function() {
		cy.login(user)
		cy.visit('/apps/files')
	})

	it('Rename from md to txt', function() {
		cy.openFile('test1.md')
		cy.getContent()
			.type('## Hello world')
		cy.closeFile()

		cy.moveFile('test1.md', 'test1.txt')
		cy.visit('/apps/files')

		cy.openFile('test1.txt')
		cy.getContent()
			.find('pre')
			.should('contain', '## Hello world')
	})

	it('Rename from txt to md', function() {
		cy.openFile('test2.txt')
		cy.getContent()
			.type('Hello world')
		cy.closeFile()

		cy.moveFile('test2.txt', 'test2.md')
		cy.visit('/apps/files')

		cy.openFile('test2.md')
		cy.getContent()
			.should('contain', 'Hello world')
	})
})

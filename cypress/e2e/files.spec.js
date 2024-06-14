/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()

describe('Text and server mimetypes', () => {
	before(() => {
		cy.createUser(user)
	})

	beforeEach(() => {
		cy.login(user)
	})

	it('handle plaintext in a pre tag', () => {
		cy.uploadFile('empty.md', 'text/plain', 'textfile.txt')
		cy.visit('/apps/files')
		cy.getFile('textfile.txt')
		cy.openFile('textfile.txt')
		cy.getContent().find('pre').should('exist')
	})

	it('handle asciidoc as plaintext for now', () => {
		cy.uploadFile('test.adoc', 'text/asciidoc', 'hello.adoc')
		cy.visit('/apps/files')
		cy.getFile('hello.adoc')
		cy.openFile('hello.adoc')
		cy.getContent().find('pre').should('contain', 'Hello world')
	})

	it('handle markdown with richtext editor', () => {
		cy.uploadFile('test.md', 'text/markdown', 'markdown.md')
		cy.visit('/apps/files')
		cy.getFile('markdown.md')
		cy.openFile('markdown.md')
		cy.getContent().find('h2').should('contain', 'Hello world')
	})

})

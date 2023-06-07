/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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
		cy.get('#app-content-files table tr').should('contain', 'textfile.txt')
		cy.openFile('textfile.txt')
		cy.getContent().find('pre').should('exist')
	})

	it('handle asciidoc as plaintext for now', () => {
		cy.uploadFile('test.adoc', 'text/asciidoc', 'hello.adoc')
		cy.visit('/apps/files')
		cy.get('#app-content-files table tr').should('contain', 'hello.adoc')
		cy.openFile('hello.adoc')
		cy.getContent().find('pre').should('contain', 'Hello world')
	})

	it('handle markdown with richtext editor', () => {
		cy.uploadFile('test.md', 'text/markdown', 'markdown.md')
		cy.visit('/apps/files')
		cy.get('#app-content-files table tr').should('contain', 'markdown.md')
		cy.openFile('markdown.md')
		cy.getContent().find('h2').should('contain', 'Hello world')
	})

})

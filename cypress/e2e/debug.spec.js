/**
 * @copyright Copyright (c) 2021 Julien Veyssier <eneiluj@posteo.net>
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
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

describe('Test all attachment insertion methods', () => {
	before(() => {
		cy.createUser(user)
	})

	it('See test files in the list and display hidden files', () => {
		cy.login(user)
		cy.createFolder('.hidden')
		cy.showHiddenFiles()
		cy.visit('/apps/files')
		cy.getFile('.hidden')
	})

	it('deletes file just fine', () => {
		cy.login(user)
		cy.showHiddenFiles()
		const fileName = 'deleteMe.md'
		cy.createFile(fileName, '# Hello world!', 'text/markdown')
		cy.visit('/apps/files')
		cy.getFile(fileName)
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				cy.deleteFile(fileName)
				cy.reloadFileList()
			})
	})

	it('deletes attachment folder when deleting a markdown file', () => {
		const fileName = 'deleteSource.md'
		cy.createMarkdown(fileName, '![git](.attachments.123/github.png)', false).then((fileId) => {
			const attachmentsFolder = `.attachments.${fileId}`
			cy.createFolder(attachmentsFolder)
			cy.uploadFile('github.png', 'image/png', `${attachmentsFolder}/github.png`)
		})

		cy.visit('/apps/files')
		cy.getFile(fileName)
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				cy.deleteFile(fileName)
				cy.reloadFileList()
				cy.getFile('.attachments.' + documentId)
					.should('not.exist')
			})
	})
})

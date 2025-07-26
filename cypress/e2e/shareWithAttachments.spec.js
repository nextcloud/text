/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../utils/index.js'

const user = randUser()
const recipient = randUser()

describe('Share with attachments', () => {

	before(() => {
		cy.createUser(user)
		cy.createUser(recipient)
	})

	it('handle file operations by recipient user', () => {
		cy.login(user)
		const fileName = 'testShared.md'
		cy.createMarkdown(
			fileName,
			'![git](.attachments.123/github.png)',
			false,
		)
		.as('textFileId')
		.then((fileId) => {
			const attachmentsFolder = `.attachments.${fileId}`
			cy.createFolder(attachmentsFolder)
			cy.uploadFile(
				'github.png',
				'image/png',
				`${attachmentsFolder}/github.png`,
			).as('attachmentId')
			cy.shareFileToUser(fileName, recipient)
		})

		cy.login(recipient)
		cy.showHiddenFiles()

		cy.visit('/apps/files')
		// check the file list
		cy.getFile('testShared.md').should('exist')
		cy.getFile('github.png').should('not.exist')

		// check the attachment folder is not there
		cy.getFile('testShared.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				cy.getFile('.attachments.' + documentId).should('not.exist')
			})

		// move the file and check the attachment folder is still not there
		cy.moveFile('testShared.md', 'testMoved.md')
		cy.reloadFileList()
		cy.getFile('testMoved.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				cy.getFile('.attachments.' + documentId).should('not.exist')
			})

		// copy the file and check the attachment folder was copied
		cy.copyFile('testMoved.md', 'testCopied.md')
		cy.reloadFileList()
		cy.getFile('testCopied.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				cy.openFolder('.attachments.' + documentId)
			})
		cy.get('@attachmentId')
			.then((attachmentId) => {
				cy.getFile('github.png')
					.should('exist')
					.should('have.attr', 'data-cy-files-list-row-fileid')
					// these are new copied attachment files
					// so they should not have the same IDs than the ones created when uploading the files
					.should('not.eq', String(attachmentId))
			})
	})
})

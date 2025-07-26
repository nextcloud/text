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
		cy.createFile(fileName, '![git](.attachments.123/github.png)')
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
		cy.getFileId('testShared.md').then((documentId) => {
			cy.getFile('.attachments.' + documentId).should('not.exist')
		})

		// move the file and check the attachment folder is still not there
		cy.moveFile('testShared.md', 'testMoved.md')
		cy.reloadFileList()
		cy.getFileId('testMoved.md').then((documentId) => {
			cy.getFile('.attachments.' + documentId).should('not.exist')
		})

		// copy the file and check the attachment folder was copied
		cy.copyFile('testMoved.md', 'testCopied.md')
		cy.reloadFileList()
		cy.getFileId('testCopied.md').then((documentId) => {
			cy.openFolder('.attachments.' + documentId)
		})
		cy.get('@attachmentId').then((attachmentId) => {
			// these are new copied attachment files
			// so they should not have the same IDs than the ones created when uploading the files
			cy.getFileId('github.png').should('not.eq', String(attachmentId))
		})
	})
})

describe('Public Share with attachments', () => {
	before(function () {
		cy.createUser(user)
	})

	beforeEach(function () {
		cy.login(user)
		cy.createTestFolder().as('folder').then(cy.shareFile).as('token')
		cy.then(function () {
			cy.createFile(
				`${this.folder}/Readme.md`,
				'![Attached text](.attachments.123/lines.txt)',
			).as('fileId')
		})
		cy.then(function () {
			const attachmentsFolder = `${this.folder}/.attachments.${this.fileId}`
			cy.createFolder(attachmentsFolder)
			cy.uploadFile(
				'lines.txt',
				'text/plain',
				`${attachmentsFolder}/lines.txt`,
			)
		})
		cy.clearCookies()
	})

	it('open attached files in folder description', function () {
		cy.visit(`/s/${this.token}`)
		cy.get('.content-wrapper').should('exist')
		cy.get('.content-wrapper .name', { timeout: 10_000 }).click()
		cy.get('.viewer').should('exist')
		cy.get('.language-plaintext').should('contain', 'multiple lines')
	})
})

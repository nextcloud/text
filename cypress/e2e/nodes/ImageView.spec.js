/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { randUser } from '../../utils/index.js'

const user = randUser()

describe('Image View', () => {
	before(() => {
		cy.createUser(user)
		cy.login(user)

		// Upload test files to user's storage
		cy.createFolder('child-folder')
		cy.uploadFile('github.png', 'image/png')
		cy.uploadFile('github.png', 'image/png', 'child-folder/github.png')

	})

	beforeEach(() => {
		cy.login(user)
		cy.visit('/apps/files')
	})

	describe('direct access', () => {
		it('from root', () => {
			const fileName = `${Cypress.currentTest.title}.md`

			cy.createMarkdown(fileName, '# from root\n\n ![git](/github.png)')

			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.attr', 'data-src')
				.should('eq', '/github.png')

			cy.getContent()
				.find('[data-component="image-view"] img')
				.should('have.attr', 'src')
				.should('contains', `/dav/files/${user.userId}/github.png`)
		})

		it('from child folder', () => {
			const fileName = `${Cypress.currentTest.title}.md`

			cy.createMarkdown(fileName, '# from child\n\n ![git](child-folder/github.png)')

			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.attr', 'data-src')
				.should('eq', 'child-folder/github.png')

			cy.getContent()
				.find('[data-component="image-view"] img')
				.should('have.attr', 'src')
				.should('contains', `/dav/files/${user.userId}/child-folder/github.png`)
		})

		it('from parent folder', () => {
			cy.visit('apps/files?dir=/child-folder')

			const fileName = `${Cypress.currentTest.title}.md`

			cy.createMarkdown(`/child-folder/${fileName}`, '# from parent\n\n ![git](../github.png)')

			cy.openFile(fileName, { force: true })

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.attr', 'data-src')
				.should('eq', '../github.png')

			cy.getContent()
				.find('[data-component="image-view"] img')
				.should('have.attr', 'src')
				.should('contain', `/dav/files/${user.userId}/github.png`)
		})
	})

	describe('fail to load', () => {
		it('direct access', () => {
			const fileName = `${Cypress.currentTest.title}.md`

			cy.createMarkdown(fileName, '# from root\n\n ![yaha](/yaha.png)')

			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"]')
				.should('have.class', 'image-view--failed')

			cy.getContent()
				.find('[data-component="image-view"] svg')
				.should('be.visible')

			cy.getContent()
				.find('[data-component="image-view"] .image__error-message')
				.should('be.visible')

			cy.getContent()
				.find('[data-component="image-view"] .image__caption input')
				.should('have.value', 'yaha')
		})
	})

	describe('native attachments', () => {
		before(() => {
			cy.login(user)
			const fileName = 'native attachments.md'
			cy.createFile(fileName, '# open image in modal\n\n ![git](.attachments.123/github.png)\n\n ![file.txt.gz](.attachments.123/file.txt.gz)').then((fileId) => {
				const attachmentsFolder = `.attachments.${fileId}`
				cy.createFolder(attachmentsFolder)
				cy.uploadFile('github.png', 'image/png', `${attachmentsFolder}/github.png`)
				cy.uploadFile('file.txt.gz', 'application/gzip', `${attachmentsFolder}/file.txt.gz`)
			})
		})

		it('open image in modal', () => {
			const fileName = 'native attachments.md'
			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"][data-src=".attachments.123/github.png"] img')
				.click()

			cy.get('.modal__content img')
				.should('have.attr', 'src')
				.should('contain', 'imageFileName=github.png')
		})

		it('download non-image gzip attachment', () => {
			const fileName = 'native attachments.md'
			cy.openFile(fileName)

			cy.getContent()
				.find('[data-component="image-view"][data-src=".attachments.123/file.txt.gz"] img')
				.click()

			const downloadsFolder = Cypress.config('downloadsFolder')
			cy.log(`downloadsFolder: ${downloadsFolder}`)
			cy.readFile(`${downloadsFolder}/file.txt.gz`)
		})
	})
})

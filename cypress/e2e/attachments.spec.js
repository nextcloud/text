/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { initUserAndFiles, randHash, randUser } from '../utils/index.js'

const user = randUser()
const recipient = randUser()
const currentUser = user
const attachmentFileNameToId = {}

const ACTION_UPLOAD_LOCAL_FILE = 'insert-attachment-upload'
const ACTION_INSERT_FROM_FILES = 'insert-attachment-insert'

/**
 * @param {string} name name of file
 * @param {string|null} requestAlias alias name
 */
function attachFile(name, requestAlias = null) {
	if (requestAlias) {
		cy.intercept({ method: 'POST', url: '**/text/attachment/upload?**' }).as(requestAlias)
	}
	return cy.getEditor()
		.find('input[type="file"][data-text-el="attachment-file-input"]')
		.selectFile([
			{
				contents: 'cypress/fixtures/' + name,
				fileName: name,
			},
		], { force: true })
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 * @param {string} str String to encode
 */
function fixedEncodeURIComponent(str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	})
}

/**
 * Open the attachment action menu and click one action
 *
 * @param {string} actionName position of the action to be clicked
 */
const clickOnAttachmentAction = (actionName) => {
	cy.getActionEntry('insert-attachment')
		.click()

	return cy.get('.v-popper__wrapper .open')
		.getActionEntry(actionName)
		.click()
}

/**
 * Check if an attachment is visible in the document
 *
 * @param {number} documentId file ID of the current document
 * @param {string} fileName attachment file name to be checked
 * @param {number} fileId attachment file id
 * @param {number|undefined} index index of the attachment in the document
 * @param {boolean} isImage is the attachment an image or a media file?
 */
const checkAttachment = (documentId, fileName, fileId, index, isImage = true) => {
	const encodedName = fixedEncodeURIComponent(fileName)
	const src = `.attachments.${documentId}/${encodedName}`

	cy.log('Check the attachment is visible and well formed', documentId, fileName, fileId, index, encodedName)
	return cy.get(`.text-editor__main [data-component="image-view"][data-src="${src}"]`)
		.find('.image__view') // wait for load finish
		.within(($el) => {
			// keep track that we have created this attachment in the attachment dir
			if (!attachmentFileNameToId[documentId]) {
				attachmentFileNameToId[documentId] = {}
			}

			attachmentFileNameToId[documentId][fileName] = fileId

			if (index > 0) {
				expect(fileName).include(`(${index + 1})`)
			}

			const srcPathEnd = isImage ? 'image' : 'mediaPreview'
			const srcFileNameParam = isImage ? 'imageFileName' : 'mediaFileName'

			// ensure the image is not hidden behind the menu bar.
			cy.wrap($el).scrollIntoView({ offset: { top: -50, left: 0 } })

			cy.wrap($el)
				.should('be.visible')
				.find('img')
				.should('have.attr', 'src')
				.should('contain', 'apps/text/' + srcPathEnd + '?documentId=' + documentId)
				.should('contain', srcFileNameParam + '=' + fixedEncodeURIComponent(fileName))

			return isImage
				? cy.wrap($el)
					.find('.image__caption input')
					.should('be.visible')
					.should('have.value', fileName)
				: cy.wrap($el)
					.find('.metadata .name')
					.should('be.visible')
					.should('have.text', fileName)

		})
}

/**
 * Wait for the attachment insertion request to finish and check if the attachment is visible
 *
 * @param {string} requestAlias Alias of the request we are waiting for
 * @param {number|undefined} index of the attachment
 * @param {boolean} isImage is the attachment an image or a media file?
 */
const waitForRequestAndCheckAttachment = (requestAlias, index, isImage = true) => {
	return cy.wait('@' + requestAlias)
		.then((req) => {
			// the name of the created file on NC side is returned in the response
			const fileId = req.response.body.id
			const fileName = req.response.body.name
			const documentId = req.response.body.documentId

			return checkAttachment(documentId, fileName, fileId, index, isImage)
		})
}

describe('Test all attachment insertion methods', () => {
	before(() => {
		initUserAndFiles(user, 'test.md', 'empty.md')

		cy.createFolder('.hidden')

		cy.createFolder('sub')
		cy.createFolder('sub/a')
		cy.createFolder('sub/b')

		cy.uploadFile('github.png', 'image/png')
		cy.uploadFile('github.png', 'image/png', 'sub/a/a.png')
		cy.uploadFile('github.png', 'image/png', 'sub/b/b.png')

		cy.createUser(recipient)
	})

	beforeEach(() => {
		cy.login(currentUser)
		cy.showHiddenFiles()
	})

	it('See test files in the list and display hidden files', () => {
		cy.visit('/apps/files')
		cy.getFile('test.md')
		cy.getFile('github.png')
		cy.getFile('.hidden')
	})

	it('Insert an image file from Files', () => {
		cy.visit('/apps/files')
		cy.openFile('test.md')

		clickOnAttachmentAction(ACTION_INSERT_FROM_FILES)
			.then(() => {
				const requestAlias = 'insertPathRequest-a'
				cy.intercept({ method: 'POST', url: '**/filepath' }).as(requestAlias)

				cy.log('Go to sub folder (a)')
				cy.get('.file-picker [data-filename="sub"]').click()
				cy.get('.file-picker [data-filename="a"]').click()
				cy.get('.file-picker [data-filename="a.png"]').click()

				cy.get('.dialog__actions button.button-vue--vue-primary').click()

				return waitForRequestAndCheckAttachment(requestAlias)
			})
			.then(() => clickOnAttachmentAction(ACTION_INSERT_FROM_FILES))
			.then(() => {
				const requestAlias = 'insertPathRequest-b'
				cy.intercept({ method: 'POST', url: '**/filepath' }).as(requestAlias)

				cy.log('Go back from home to sub folder')
				cy.get('.file-picker nav [title="Home"]').click()
				cy.get('.file-picker [data-filename="sub"]').click()

				cy.log('Go to sub folder (b)')
				cy.get('.file-picker [data-filename="b"]').click()
				cy.get('.file-picker [data-filename="b.png"]').click()

				cy.get('.dialog__actions button.button-vue--vue-primary').click()

				return waitForRequestAndCheckAttachment(requestAlias)
			})

			.then(() => clickOnAttachmentAction(ACTION_INSERT_FROM_FILES))

			.then(() => {
				const requestAlias = 'insertPathRequest-root'
				cy.intercept({ method: 'POST', url: '**/filepath' }).as(requestAlias)

				cy.log('Go back to home')
				cy.get('.file-picker nav [title="Home"]').click()

				cy.log('Select the file in the filepicker')
				cy.get('.file-picker [data-filename="github.png"]').click()
				cy.log('Click OK in the filepicker')
				cy.get('.dialog__actions button.button-vue--vue-primary').click()

				return waitForRequestAndCheckAttachment(requestAlias)
			})
		cy.closeFile()
	})

	it('Upload a local image file (table.png)', () => {
		cy.visit('/apps/files')
		cy.openFile('test.md')
		// in this case we almost could just attach the file to the input
		// BUT we still need to click on the action because otherwise the command
		// is not handled correctly when the upload has been done in <MenuBar>
		clickOnAttachmentAction(ACTION_UPLOAD_LOCAL_FILE)
			.then(() => {
				const requestAlias = 'uploadRequest'
				cy.log('Upload the file through the input')

				attachFile('table.png', requestAlias)

				return waitForRequestAndCheckAttachment(requestAlias)
			})
		cy.closeFile()
	})

	it('Upload a local media file (file.txt.gz)', () => {
		cy.visit('/apps/files')
		cy.openFile('test.md')
		// in this case we almost could just attach the file to the input
		// BUT we still need to click on the action because otherwise the command
		// is not handled correctly when the upload has been done in <MenuBar>
		clickOnAttachmentAction(ACTION_UPLOAD_LOCAL_FILE)
			.then(() => {
				const requestAlias = 'uploadMediaRequest'
				cy.log('Upload the file through the input')

				attachFile('file.txt.gz', requestAlias)

				return waitForRequestAndCheckAttachment(requestAlias, undefined, false)
			})
		cy.closeFile()
	})

	it('Upload image files with the same name', () => {
		// make sure we start from an emtpy file even on retries
		const filename = randHash() + '.md'

		cy.uploadFile('empty.md', 'text/markdown', filename)
		cy.visit('/apps/files')
		cy.openFile(filename)

		const assertImage = index => {
			return clickOnAttachmentAction(ACTION_UPLOAD_LOCAL_FILE)
				.then(() => {
					const requestAlias = `uploadRequest${index}`
					cy.log('Upload the file through the input', { index })

					attachFile('github.png', requestAlias)

					return waitForRequestAndCheckAttachment(requestAlias, index)
				})
		}

		cy.wrap([0, 1, 2])
			.each((index) => {
				return new Cypress.Promise((resolve, reject) => {
					assertImage(index).then(resolve, reject)
				})
			})
		cy.getEditor().find('[data-component="image-view"]')
			.should('have.length', 3)
		cy.closeFile()
	})

	it('test if attachment files are in the attachment folder', () => {
		cy.visit('/apps/files')

		cy.getFile('test.md')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]

				cy.expect(Object.keys(files)).to.have.lengthOf(5)
				cy.openFolder('.attachments.' + documentId)
				for (const name in files) {
					cy.getFile(name)
						.should('exist')
						.should('have.attr', 'data-cy-files-list-row-fileid')
						.should('eq', String(files[name]))
				}
			})
	})

	it('test if attachment folder is moved with the markdown file', () => {
		const fileName = 'moveSource.md'
		cy.createFolder('subFolder')
		cy.createMarkdown(fileName, '![git](.attachments.123/github.png)', false).then((fileId) => {
			const attachmentsFolder = `.attachments.${fileId}`
			cy.createFolder(attachmentsFolder)
			cy.uploadFile('github.png', 'image/png', `${attachmentsFolder}/github.png`)
			cy.moveFile(fileName, 'subFolder/test.md')
		})

		cy.visit('/apps/files')
		cy.openFolder('subFolder')
		cy.getFile('test.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]
				cy.openFolder('.attachments.' + documentId)
				for (const name in files) {
					cy.getFile(name)
						.should('exist')
						.should('have.attr', 'data-cy-files-list-row-fileid')
						.should('eq', String(files[name]))
				}
			})
	})

	it('test if attachment folder is copied when copying a markdown file', () => {
		const fileName = 'copySource.md'
		cy.createMarkdown(fileName, '![git](.attachments.123/github.png)', false).then((fileId) => {
			const attachmentsFolder = `.attachments.${fileId}`
			cy.createFolder(attachmentsFolder)
			cy.uploadFile('github.png', 'image/png', `${attachmentsFolder}/github.png`)
		})

		cy.copyFile(fileName, 'testCopied.md')

		cy.visit('/apps/files')
		cy.getFile('testCopied.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]

				cy.openFolder('.attachments.' + documentId)
				for (const name in files) {
					cy.getFile(name)
						.should('exist')
						.should('have.attr', 'data-cy-files-list-row-fileid')
						// these are new copied attachment files
						// so they should not have the same IDs than the ones created when uploading the files
						.should('not.eq', String(files[name]))
				}
			})
	})

	it('test if attachment folder is deleted after having deleted a markdown file', () => {
		const fileName = 'deleteSource.md'
		cy.createMarkdown(fileName, '![git](.attachments.123/github.png)', false).then((fileId) => {
			const attachmentsFolder = `.attachments.${fileId}`
			cy.createFolder(attachmentsFolder)
			cy.uploadFile('github.png', 'image/png', `${attachmentsFolder}/github.png`)
		})

		cy.visit('/apps/files')
		cy.waitForPreview(fileName)
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

	it('[share] check everything behaves correctly on the share target user side', () => {
		const fileName = 'testShared.md'
		cy.createMarkdown(fileName, '![git](.attachments.123/github.png)', false).then((fileId) => {
			const attachmentsFolder = `.attachments.${fileId}`
			cy.createFolder(attachmentsFolder)
			cy.uploadFile('github.png', 'image/png', `${attachmentsFolder}/github.png`)
			cy.shareFileToUser(fileName, recipient)
		})

		cy.login(recipient)
		cy.showHiddenFiles()

		cy.visit('/apps/files')
		// check the file list
		cy.getFile('testShared.md')
			.should('exist')
		cy.getFile('github.png')
			.should('not.exist')

		// check the attachment folder is not there
		cy.getFile('testShared.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				cy.getFile('.attachments.' + documentId)
					.should('not.exist')
			})

		// move the file and check the attachment folder is still not there
		cy.moveFile('testShared.md', 'testMoved.md')
		cy.reloadFileList()
		cy.getFile('testMoved.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				cy.getFile('.attachments.' + documentId)
					.should('not.exist')
			})

		// copy the file and check the attachment folder was copied
		cy.copyFile('testMoved.md', 'testCopied.md')
		cy.reloadFileList()
		cy.getFile('testCopied.md')
			.should('exist')
			.should('have.attr', 'data-cy-files-list-row-fileid')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]
				cy.openFolder('.attachments.' + documentId)
				for (const name in files) {
					cy.getFile(name)
						.should('exist')
						.should('have.attr', 'data-cy-files-list-row-fileid')
						// these are new copied attachment files
						// so they should not have the same IDs than the ones created when uploading the files
						.should('not.eq', String(files[name]))
				}
			})
	})
})

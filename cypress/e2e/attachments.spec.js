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

import { initUserAndFiles, randHash, randUser } from '../utils/index.js'
import 'cypress-file-upload'

const user = randUser()
const recipient = randUser()
let currentUser = user
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
		.attachFile(name)
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
	return new Cypress.Promise((resolve, reject) => {
		cy.get(`.text-editor__main [data-component="image-view"][data-src="${src}"]`)
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

				cy.wrap($el)
					.should('be.visible')
					.find('img')
					.should('have.attr', 'src')
					.should('contain', 'apps/text/' + srcPathEnd + '?documentId=' + documentId)
					.should('contain', srcFileNameParam + '=' + encodeURIComponent(fileName))

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
			.then(resolve, reject)
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

		cy.createFolder('sub')
		cy.createFolder('sub/a')
		cy.createFolder('sub/b')

		cy.uploadFile('github.png', 'image/png')
		cy.uploadFile('github.png', 'image/png', 'sub/a/a.png')
		cy.uploadFile('github.png', 'image/png', 'sub/b/b.png')

		cy.createUser(recipient)
		cy.shareFileToUser('test.md', recipient)
	})

	beforeEach(() => {
		cy.login(currentUser)
		cy.visit('/apps/files')
	})

	it('See test files in the list and display hidden files', () => {
		cy.get('.files-fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('contain', 'test.md')
		cy.get('.files-fileList tr[data-file="github.png"]', { timeout: 10000 })
			.should('contain', 'github.png')
		cy.showHiddenFiles()
	})

	it('Insert an image file from Files', () => {
		cy.openFile('test.md')

		clickOnAttachmentAction(ACTION_INSERT_FROM_FILES)
			.then(() => {
				const requestAlias = 'insertPathRequest-a'
				cy.intercept({ method: 'POST', url: '**/filepath' }).as(requestAlias)

				cy.log('Go to sub folder (a)')
				cy.get('#picker-filestable tr[data-entryname="sub"]').click()
				cy.get('#picker-filestable tr[data-entryname="a"]').click()
				cy.get('#picker-filestable tr[data-entryname="a.png"]').click()

				cy.get('.oc-dialog > .oc-dialog-buttonrow button').click()

				return waitForRequestAndCheckAttachment(requestAlias)
			})
			.then(() => clickOnAttachmentAction(ACTION_INSERT_FROM_FILES))
			.then(() => {
				const requestAlias = 'insertPathRequest-b'
				cy.intercept({ method: 'POST', url: '**/filepath' }).as(requestAlias)

				cy.log('Go back to sub folder')
				cy.get('#oc-dialog-filepicker-content .dirtree [data-dir="/sub"] a').click()

				cy.log('Go to sub folder (b)')
				cy.get('#picker-filestable tr[data-entryname="b"]').click()
				cy.get('#picker-filestable tr[data-entryname="b.png"]').click()

				cy.get('.oc-dialog > .oc-dialog-buttonrow button').click()

				return waitForRequestAndCheckAttachment(requestAlias)
			})

			.then(() => clickOnAttachmentAction(ACTION_INSERT_FROM_FILES))

			.then(() => {
				const requestAlias = 'insertPathRequest-root'
				cy.intercept({ method: 'POST', url: '**/filepath' }).as(requestAlias)

				cy.log('Go back to home')
				cy.get('#oc-dialog-filepicker-content .dirtree .crumb:first-child').click()

				cy.log('Select the file in the filepicker')
				cy.get('#picker-filestable tr[data-entryname="github.png"]').click()
				cy.log('Click OK in the filepicker')
				cy.get('.oc-dialog > .oc-dialog-buttonrow button').click()

				return waitForRequestAndCheckAttachment(requestAlias)
			})
	})

	it('Upload a local image file (table.png)', () => {
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
	})

	it('Upload a local media file (file.txt.gz)', () => {
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
	})

	it('Upload image files with the same name', () => {
		// make sure we start from an emtpy file even on retries
		const filename = randHash() + '.md'

		cy.uploadFile('empty.md', 'text/markdown', filename)
		cy.reloadFileList()
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
			.then(() => {
				return cy.getEditor().find('[data-component="image-view"]')
					.should('have.length', 3)
			})
	})

	it('test if attachment files are in the attachment folder', () => {
		// check we stored the attachment names/ids

		cy.get('.files-fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('have.attr', 'data-id')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]

				cy.expect(Object.keys(files)).to.have.lengthOf(5)
				cy.openFolder('.attachments.' + documentId)
				cy.screenshot()
				for (const name in files) {
					cy.get(`.files-fileList tr[data-file="${name}"]`, { timeout: 10000 })
						.should('exist')
						.should('have.attr', 'data-id')
						.should('eq', String(files[name]))
				}
			})
	})

	it('test if attachment folder is moved with the markdown file', () => {
		cy.createFolder('subFolder')
		cy.reloadFileList()
		cy.moveFile('test.md', 'subFolder/test.md')
		cy.openFolder('subFolder')
		cy.get('.files-fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('exist')
			.should('have.attr', 'data-id')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]
				cy.openFolder('.attachments.' + documentId)
				cy.screenshot()
				for (const name in files) {
					cy.get(`.files-fileList tr[data-file="${name}"]`, { timeout: 10000 })
						.should('exist')
						.should('have.attr', 'data-id')
						.should('eq', String(files[name]))
				}
			})
	})

	it('test if attachment folder is copied when copying a markdown file', () => {
		cy.copyFile('subFolder/test.md', 'testCopied.md')
		cy.reloadFileList()

		cy.get('.files-fileList tr[data-file="testCopied.md"]', { timeout: 10000 })
			.should('exist')
			.should('have.attr', 'data-id')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]

				cy.openFolder('.attachments.' + documentId)
				cy.screenshot()
				for (const name in files) {
					cy.get(`.files-fileList tr[data-file="${name}"]`, { timeout: 10000 })
						.should('exist')
						.should('have.attr', 'data-id')
						// these are new copied attachment files
						// so they should not have the same IDs than the ones created when uploading the files
						.should('not.eq', String(files[name]))
				}
			})
	})

	it('test if attachment folder is deleted after having deleted a markdown file', () => {
		cy.get('.files-fileList tr[data-file="testCopied.md"]', { timeout: 10000 })
			.should('exist')
			.should('have.attr', 'data-id')
			.then((documentId) => {
				cy.deleteFile('testCopied.md')
				cy.reloadFileList()
				cy.get(`.files-fileList tr[data-file=".attachments.${documentId}"]`, { timeout: 10000 })
					.should('not.exist')
			})
		// change the current user for next tests
		currentUser = recipient
	})

	it('[share] check everything behaves correctly on the share target user side', () => {
		// check the file list
		cy.get('.files-fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('contain', 'test.md')
		cy.get('files-fileList tr[data-file="github.png"]').should('not.exist')
		cy.showHiddenFiles()

		// check the attachment folder is not there
		cy.get('.files-fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('exist')
			.should('have.attr', 'data-id')
			.then((documentId) => {
				cy.get(`.files-fileList tr[data-file=".attachments.${documentId}"]`, { timeout: 10000 })
					.should('not.exist')
			})

		// move the file and check the attachment folder is still not there
		cy.moveFile('test.md', 'testMoved.md')
		cy.reloadFileList()
		cy.get('.files-fileList tr[data-file="testMoved.md"]', { timeout: 10000 })
			.should('exist')
			.should('have.attr', 'data-id')
			.then((documentId) => {
				cy.get(`.files-fileList tr[data-file=".attachments.${documentId}"]`, { timeout: 10000 })
					.should('not.exist')
			})

		// copy the file and check the attachment folder was copied
		cy.copyFile('testMoved.md', 'testCopied.md')
		cy.reloadFileList()
		cy.get('.files-fileList tr[data-file="testCopied.md"]', { timeout: 10000 })
			.should('exist')
			.should('have.attr', 'data-id')
			.then((documentId) => {
				const files = attachmentFileNameToId[documentId]
				cy.openFolder('.attachments.' + documentId)
				cy.screenshot()
				for (const name in files) {
					cy.get(`.files-fileList tr[data-file="${name}"]`, { timeout: 10000 })
						.should('exist')
						.should('have.attr', 'data-id')
						// these are new copied attachment files
						// so they should not have the same IDs than the ones created when uploading the files
						.should('not.eq', String(files[name]))
				}
			})
	})

	it('Delete the user', () => {
		cy.deleteUser(user)
		cy.deleteUser(recipient)
	})

})

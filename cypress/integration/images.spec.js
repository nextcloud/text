/**
 * @copyright Copyright (c) 2021 Julien Veyssier <eneiluj@posteo.net>
 *
 * @author Julien Veyssier <eneiluj@posteo.net>
 *
 * @license GNU AGPL version 3 or any later version
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


import { randHash } from '../utils/'
import 'cypress-file-upload'
const randUser = randHash()

const ACTION_UPLOAD_LOCAL_FILE = 1
const ACTION_INSERT_FROM_FILES = 2
const ACTION_INSERT_FROM_LINK = 3

/**
 * Open the image action menu and click one action
 *
 * @param actionIndex position of the action to be clicked
 * @param callback what happens once it's been clicked
 */
const clickOnImageAction = (actionIndex, callback) => {
	cy.get('#viewer .action-item.submenu')
		.click()
		.should('have.class', 'action-item--open')

	// get the popover ID to be able to find the related DOM element
	cy.get('#viewer .action-item.submenu > div.v-popover > .trigger')
		.should('have.attr', 'aria-describedby')
			.should('contain', 'popover_')
			.then((popoverId) => {
				cy.log('Click on the action entry')
				const popover = cy.get('div#' + popoverId)
				popover.should('have.class', 'open')
				cy.get('div#' + popoverId + ' li:nth-child(' + actionIndex + ')').click()
				// our job here is done
				callback(popoverId)
			})
}

/**
 * Check the image is visible in the document after it has been added by the user
 *
 * @param imageIndex index of the image in the document content
 * @param imageName file name (or sub part) to be checked
 */
const checkImage = (imageIndex, imageName) => {
	cy.log('Check the image is visible and well formed')
	const imageDivSelector = '#editor .ProseMirror div.image:nth-child(' + imageIndex + ')'

	cy.get(imageDivSelector)
		.should('be.visible')
		.should('have.attr', 'data-src')
			.should('contain', imageName)

	cy.get(imageDivSelector).find('img')
		.should('have.attr', 'src')
			.should('contain', 'apps/text/image?documentId=')
			.should('contain', 'imageFileName')
			.should('contain', imageName)
}

describe('Test all image insertion methods', () => {
	before(() => {
		// Init user
		cy.nextcloudCreateUser(randUser, 'password')
		cy.login(randUser, 'password')

		// Upload test files to user's storage
		cy.uploadFile('test.md', 'text/markdown')
		cy.uploadFile('github.png', 'image/png')
	})

	beforeEach(() => {
		cy.login(randUser, 'password')
	})

	it('See test files in the list', () => {
		cy.get('#fileList tr[data-file="test.md"]', { timeout: 10000 })
			.should('contain', 'test.md')
		cy.get('#fileList tr[data-file="github.png"]', { timeout: 10000 })
			.should('contain', 'github.png')
	})

	it('Insert an image from files', () => {
		cy.openFile('test.md')
		clickOnImageAction(ACTION_INSERT_FROM_FILES, () => {
			cy.log('Select the file in the filepicker')
			cy.get('#picker-filestable tr[data-entryname="github.png"]').click()
			cy.log('Click OK in the filepicker')
			cy.get('.oc-dialog > .oc-dialog-buttonrow button').click()

			cy.wait(2000)
			checkImage(1, 'github.png')
			cy.wait(2000)
			cy.screenshot()
		})
	})

	it('Insert an image from a link', () => {
		cy.openFile('test.md')
		clickOnImageAction(ACTION_INSERT_FROM_LINK, (popoverId) => {
			cy.wait(2000)
			cy.log('Type and validate')
			cy.get('div#' + popoverId + ' li:nth-child(3) input[type=text]')
				.type('https://nextcloud.com/wp-content/themes/next/assets/img/headers/engineering-small.jpg')
				.wait(2000)
				.type('{enter}')
			// click on the validation button is an alternative to typing {enter}
			// cy.get('div#' + popoverId + ' li:nth-child(3) form > label').click()

			cy.wait(2000)
			checkImage(1, '.jpg')
			cy.wait(2000)
			cy.screenshot()
		})
	})

	it('Upload a local image', () => {
		cy.openFile('test.md')
		// in this case we almost could just attach the file to the input
		// BUT we still need to click on the action because otherwise the command
		// is not passed correctly when the upload has been done
		clickOnImageAction(ACTION_UPLOAD_LOCAL_FILE, () => {
			cy.wait(2000)
			cy.log('Upload the file through the input')
			cy.get('.menubar input[type="file"]')
				.attachFile('table.png')

			cy.wait(2000)
			checkImage(1, 'table.png')
			cy.wait(2000)
			cy.screenshot()
		})
	})

	it('Close the editor and delete the user', () => {
		cy.openFile('test.md')
		cy.get('#viewer .modal-header button.header-close').click()
		cy.get('#viewer').should('not.exist')
		cy.nextcloudDeleteUser(randUser, 'password')
	})

})

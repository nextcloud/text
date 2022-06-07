/**
 * @copyright Copyright (c) 2019 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
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
const randUser = randHash()

describe('Open test.md in viewer', function() {
	before(function() {
		// Init user
		cy.nextcloudCreateUser(randUser, 'password')
		cy.login(randUser, 'password')

		// Upload test files
		cy.uploadFile('test.md', 'text/markdown')
	})

	beforeEach(function() {
		cy.login(randUser, 'password')
	})

	it('displays conflicts', function() {
		cy.openFile('test.md')

		cy.log('Inspect editor')
		const viewer = cy.get('#viewer')
		const editor = viewer.get('#editor .ProseMirror')
		editor.type('Hello you cruel conflicting world')
		cy.uploadFile('test.md', 'text/markdown')

		cy.get('#viewer .modal-header button.header-close').click()
		cy.get('#viewer').should('not.exist')
		cy.openFile('test.md')
		cy.get('#editor-container .document-status .icon-error')
		const wrapper = cy.get('#editor-wrapper.has-conflicts.is-rich-editor ')
		wrapper.get('#read-only-editor h2').should('contain', 'Hello world')
		wrapper.get('#editor h2').should('contain', 'Hello world')
		cy.screenshot()
	})
})

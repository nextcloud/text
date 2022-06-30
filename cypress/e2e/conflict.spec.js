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

import { initUserAndFiles, randHash } from '../utils/index.js'

const randUser = randHash()
const fileName = 'test.md'

describe('Open test.md in viewer', function() {
	const getWrapper = () => cy.get('#editor-wrapper.has-conflicts.is-rich-editor')

	before(() => {
		initUserAndFiles(randUser, fileName)
	})

	beforeEach(function() {
		cy.login(randUser, 'password')
	})

	it('displays conflicts', function() {
		cy.openFile(fileName)

		cy.log('Inspect editor')
		cy.getContent()
			.type('Hello you cruel conflicting world')
		cy.uploadFile('test.md', 'text/markdown')

		cy.get('#viewer .modal-header button.header-close').click()
		cy.get('#viewer').should('not.exist')
		cy.openFile('test.md')
		cy.get('#editor-container .document-status .icon-error')
		getWrapper()
			.get('#read-only-editor h2')
			.should('contain', 'Hello world')
		getWrapper()
			.get('#editor h2')
			.should('contain', 'Hello world')
		cy.screenshot()
	})
})

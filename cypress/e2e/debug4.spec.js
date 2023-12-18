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

	it('deletes file just fine', () => {
		cy.login(user)
		const fileName = 'deleteMe.md'
		cy.createFile(fileName, '# Hello world!', 'text/markdown')
		cy.visit('/apps/files')
		cy.getFile(fileName)
			.should('exist')
		cy.deleteFile(fileName)
		cy.reloadFileList()
	})

})

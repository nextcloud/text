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

export const getSearchParams = url => {
	return url
		.split(/[?&]/)
		.reduce((acc, cur) => {
			const parts = cur.split('=')
			parts[1] && (acc[parts[0]] = parts[1])
			return acc
		}, {})
}

/**
 * Creates a new user with default passwort `password` and upload one or multiple test files
 * Can be used e.g. for a `before()`
 *
 * @param {string} userName Username of the user to create
 * @param {...string} files one ore more markdown file names to create
 */
export function initUserAndFiles(userName, ...files) {
	// Init user
	cy.nextcloudCreateUser(userName, 'password')
	cy.login(userName, 'password')

	// Upload test files
	;(files || []).forEach(file => {
		cy.uploadFile(file, 'text/markdown')
	})
}

export const randHash = () => Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 10)

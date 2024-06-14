/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { User } from '@nextcloud/cypress'

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
 * Creates a new user and upload one or multiple test files
 * Can be used e.g. for a `before()`
 *
 * @param {User} user - to create
 * @param {...string} files one ore more markdown file names to create
 */
export function initUserAndFiles(user, ...files) {
	// Init user
	cy.createUser(user)
	cy.login(user)

	// Upload test files
	;(files || []).forEach(file => {
		cy.uploadFile(file, 'text/markdown')
	})
}

export const randHash = () => Math.random().toString(36).replace(/[^a-z]+/g, '').slice(0, 10)
export const randUser = () => new User(randHash(), randHash())

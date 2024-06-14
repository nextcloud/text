/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// jest-raw-loader compatibility with Jest version 28.
// See: https://github.com/keplersj/jest-raw-loader/pull/239
module.exports = {
	process: (content) => {
		return {
			code: 'module.exports = ' + JSON.stringify(content),
		}
	},
}

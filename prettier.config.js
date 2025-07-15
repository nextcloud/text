/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import nextcloud from '@nextcloud/prettier-config'

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	...nextcloud,
	plugins: [...nextcloud.plugins, 'prettier-plugin-organize-imports'],
}

export default config

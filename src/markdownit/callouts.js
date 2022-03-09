/*
 * @copyright Copyright (c) 2022 Vinicius Reis <vinicius@nextcloud.com>
 *
 * @author Vinicius Reis <vinicius@nextcloud.com>
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

import container from 'markdown-it-container'

export const typesAvailable = ['info', 'warn', 'error', 'success']

const buildRender = type => (tokens, idx, options, env, slf) => {
	const tag = tokens[idx]

	// add attributes to the opening tag
	if (tag.nesting === 1) {
		tag.attrSet('data-callout', type)
		tag.attrJoin('class', `callout callout-${type}`)
	}

	return slf.renderToken(tokens, idx, options, env, slf)
}

/**
 * @param {object} md Markdown object
 */
export default (md) => {
	// create a custom container to each callout type
	typesAvailable.forEach(type => {
		md.use(container, type, {
			render: buildRender(type),
		})
	})

	return md
}

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

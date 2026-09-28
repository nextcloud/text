/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { MarkdownIt, RendererRule } from 'markdown-it'

import container from 'markdown-it-container'

export const typesAvailable = ['info', 'warn', 'error', 'success', 'question']

/**
 *
 * @param type one of 'info', 'warn', 'error' and 'success'
 */
function buildRender(type: string): RendererRule {
	return (tokens, idx, options, _env, slf) => {
		const tag = tokens[idx]

		// add attributes to the opening tag
		if (tag.nesting === 1) {
			tag.attrSet('data-callout', type)
			tag.attrJoin('class', `callout callout-${type}`)
		}

		return slf.renderToken(tokens, idx, options)
	}
}

/**
 * @param md Markdown object
 */
export default (md: MarkdownIt): MarkdownIt => {
	// create a custom container to each callout type
	typesAvailable.forEach((type) => {
		md.use(container, type, {
			render: buildRender(type),
		})
	})

	return md
}

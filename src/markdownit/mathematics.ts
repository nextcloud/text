/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Turn tex expressions into divs and spans with data-latex set.
 *
 * These will then be picked up by the mathematics nodes.
 */

import type MarkdownIt from 'markdown-it'

import { tex } from '@mdit/plugin-tex'

/**
 *
 * @param unsafe
 */
function escapeHtml(unsafe: string) {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')
}

/**
 *
 * @param content
 */
function renderBlock(content: string) {
	return `<div data-type="block-math" data-latex="${escapeHtml(content)}" />`
}

/**
 *
 * @param content
 */
function renderInline(content: string) {
	return `<span data-type="inline-math" data-latex="${escapeHtml(content)}">${escapeHtml(content)}</span>`
}

/**
 *
 * @param content
 * @param displayMode
 */
function render(content: string, displayMode: boolean) {
	return displayMode ? renderBlock(content) : renderInline(content)
}

export default (md: MarkdownIt) => md.use(tex, { render })

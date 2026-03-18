/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Turn tex expressions into divs and spans with data-latex set.
 *
 * These will then be picked up by the mathematics nodes.
 */

import { tex } from '@mdit/plugin-tex'
import type MarkdownIt from 'markdown-it'

const escapeHtml = (unsafe: string) =>
	unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;')

const renderBlock = (content: string) =>
	`<div data-type="block-math" data-latex="${escapeHtml(content)}" />`

const renderInline = (content: string) =>
	`<span data-type="inline-math" data-latex="${escapeHtml(content)}">${escapeHtml(content)}</span>`

const render = (content: string, displayMode: boolean) =>
	displayMode ? renderBlock(content) : renderInline(content)

export default (md: MarkdownIt) => md.use(tex, { render })

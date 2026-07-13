/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

import footnote from 'markdown-it-footnote'
import { escapeHtml } from 'markdown-it/lib/common/utils.mjs'

/**
 * Return footnote label
 *
 * @param token markdown-it token
 */
function labelOf(token: Token): string {
	return token.meta?.label || String(token.meta?.id ?? '')
}

/**
 * Customized markdown-it footnotes extension
 *
 * @param md markdown-it markdown object
 */
export default function footnotes(md: MarkdownIt): void {
	md.use(footnote)

	md.renderer.rules.footnote_ref = (tokens, idx) => {
		const label = labelOf(tokens[idx])
		return `<sup data-type="footnote-reference" data-reference-id="${escapeHtml(label)}"></sup>`
	}
	md.renderer.rules.footnote_block_open = () => '<section data-type="footnotes">\n'
	md.renderer.rules.footnote_block_close = () => '</section>\n'
	md.renderer.rules.footnote_open = (tokens, idx) => {
		const label = labelOf(tokens[idx])
		return `<div data-type="footnote" data-reference-id="${escapeHtml(label)}">\n`
	}
	md.renderer.rules.footnote_close = () => '</div>\n'
	md.renderer.rules.footnote_anchor = () => ''
}

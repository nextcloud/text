/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownitMentions from '@quartzy/markdown-it-mentions'
import MarkdownIt from 'markdown-it'
import frontMatter from 'markdown-it-front-matter'
import implicitFigures from 'markdown-it-image-figures'
import mark from 'markdown-it-mark'
import multimdTable from 'markdown-it-multimd-table'
import callouts from './callouts.ts'
import comments from './comments.ts'
import details from './details.ts'
import footnotes from './footnotes.ts'
import hardbreak from './hardbreak.ts'
import keepSyntax from './keepSyntax.ts'
import mathematics from './mathematics.ts'
import preview from './preview.ts'
import referenceLinks from './referenceLinks.ts'
import splitMixedLists from './splitMixedLists.js'
import taskLists from './taskLists.ts'
import underline from './underline.ts'
import wikiLinks from './wikiLinks.ts'

/**
 * markdown-it-multimd-table calls `md.utils.assign`, which markdown-it 15 removed
 *
 * @param md Markdown object
 * @param options multimd-table options
 */
function multimdTableCompat(md: InstanceType<typeof MarkdownIt>, options: Parameters<typeof multimdTable>[1]): void {
	const utils = { ...md.utils, assign: Object.assign }
	md.utils = utils
	multimdTable(md, options)
}

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')
	.enable('table')
	.use(taskLists)
	.use(frontMatter, () => {})
	.use(splitMixedLists) // needs task Lists to be used first
	.use(underline)
	.use(hardbreak)
	.use(callouts)
	.use(details)
	.use(footnotes)
	.use(comments) // needs to come after footnotes and before markdownitMentions
	.use(preview)
	.use(keepSyntax)
	.use(markdownitMentions)
	.use(wikiLinks)
	.use(referenceLinks)
	.use(implicitFigures)
	.use(mark)
	.use(mathematics)
	.use(multimdTableCompat, {
		multiline: true,
		rowspan: false,
		multibody: false,
	})

// Render front matter tokens
markdownit.renderer.rules.front_matter = (tokens, idx) => `<pre id="frontmatter"><code>${markdownit.utils.escapeHtml(String(tokens[idx].meta))}</code></pre>`

// Render horizontal rules with markup attribute
markdownit.renderer.rules.hr = (tokens, idx) => `<hr data-markup="${markdownit.utils.escapeHtml(tokens[idx].markup || '---')}" />\n`

// Render lists with bullet attribute
markdownit.renderer.rules.bullet_list_open = (tokens, idx, options) => {
	tokens[idx].attrs = [
		...(tokens[idx].attrs || []),
		['data-bullet', tokens[idx].markup],
	]
	return markdownit.renderer.renderToken(tokens, idx, options)
}

export default markdownit

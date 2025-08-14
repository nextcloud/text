/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownitMentions from '@quartzy/markdown-it-mentions'
import MarkdownIt from 'markdown-it'
import frontMatter from 'markdown-it-front-matter'
import implicitFigures from 'markdown-it-image-figures'
import multimdTable from 'markdown-it-multimd-table'
import { escapeHtml } from 'markdown-it/lib/common/utils.mjs'
import callouts from './callouts.js'
import details from './details.ts'
import hardbreak from './hardbreak.js'
import keepSyntax from './keepSyntax.js'
import preview from './preview.js'
import splitMixedLists from './splitMixedLists.js'
import taskLists from './taskLists.ts'
import underline from './underline.js'

const markdownit = MarkdownIt('commonmark', { html: false, breaks: false })
	.enable('strikethrough')
	.enable('table')
	.use(taskLists, { enable: true, labelAfter: true })
	.use(frontMatter, (fm) => {})
	.use(splitMixedLists) // needs task Lists to be used first.
	.use(underline)
	.use(hardbreak)
	.use(callouts)
	.use(details)
	.use(preview)
	.use(keepSyntax)
	.use(markdownitMentions)
	.use(implicitFigures)
	.use(multimdTable, {
		multiline: true,
		rowspan: false,
		headerless: false,
		multibody: false,
	})

// Render front matter tokens
markdownit.renderer.rules.front_matter = (tokens, idx, options) =>
	`<pre id="frontmatter"><code>${escapeHtml(tokens[idx].meta)}</code></pre>`

// Render lists with bullet attribute
markdownit.renderer.rules.bullet_list_open = (tokens, idx, options) => {
	tokens[idx].attrs = [
		...(tokens[idx].attrs || []),
		['data-bullet', tokens[idx].markup],
	]
	return markdownit.renderer.renderToken(tokens, idx, options)
}

export default markdownit

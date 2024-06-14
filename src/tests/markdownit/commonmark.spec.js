/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import spec from "../fixtures/spec"
import markdownit from '../../markdownit'

describe('Commonmark', () => {
	const skippedMarkdownTests = [
		// we interpret this as front matter
		96, 98,
		// contain HTML
		21, 31, 201, 344, 474, 475, 476, 490, 493, 523, 535, 642, 643,
		// contain comments
		309, 308,
	];

	const normalize = (str) => {
		// https://github.com/markdown-it/markdown-it/blob/df4607f1d4d4be7fdc32e71c04109aea8cc373fa/test/commonmark.js#L10
		return str.replace(/<blockquote><\/blockquote>/g, '<blockquote>\n</blockquote>')
			.replace(/<span class="keep-md">([^<]+)<\/span>/g, '$1')
			.replace(/<br data-syntax=".{1,2}" \/>/g, '<br />\n')
			.replace(/<ul data-bullet="."/g, '<ul')
	}

	// special treatment because we use markdown-it-image-figures
	const figureImageMarkdownTests = [
		516, 519, 530, 571, 572, 573, 574, 575, 576, 577, 579, 580, 581, 582, 583, 584, 585, 587, 588, 590
	]

	spec.forEach((entry) => {
		// We do not support HTML
		if (entry.section === 'HTML blocks' || entry.section === 'Raw HTML') return;

		if (skippedMarkdownTests.indexOf(entry.example) !== -1) {
			return
		}

		test('commonmark parsing ' + entry.example, () => {
			let expected = entry.markdown.includes('__')
				? entry.html.replace(/<strong>/g, '<u>').replace(/<\/strong>/g, '</u>')
				: entry.html
			if (figureImageMarkdownTests.indexOf(entry.example) !== -1) {
				expected = expected.replace(/<p>/g, '<figure>').replace(/<\/p>/g, '</figure>')
			}

			const rendered = markdownit.render(entry.markdown)

			// Ignore special markup for untouched markdown
			expect(normalize(rendered)).toBe(expected)
		})
	})
})

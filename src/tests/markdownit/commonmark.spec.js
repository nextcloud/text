/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'
import spec from '../fixtures/spec.js'

describe('Commonmark', () => {
	const skippedMarkdownTests = [
		// we interpret this as front matter
		96, 98,
		// contain HTML
		21, 31, 201, 344, 475, 476, 477, 491, 494, 524, 536, 642, 643,
		// contain comments
		309, 308,
		// wiki image link (![[...]]) intentionally renders different from CommonMark
		590,
	]

	const normalize = (str) => {
		// https://github.com/markdown-it/markdown-it/blob/df4607f1d4d4be7fdc32e71c04109aea8cc373fa/test/commonmark.js#L10
		return str
			.replace(/<blockquote><\/blockquote>/g, '<blockquote>\n</blockquote>')
			.replace(/<span class="keep-md">([^<]+)<\/span>/g, '$1')
			.replace(/<br data-syntax=".{1,2}" \/>/g, '<br />\n')
			.replace(/<hr data-markup="[*_-]+"/g, '<hr')
			.replace(/<ul data-bullet="."/g, '<ul')
	}

	// special treatment because we use markdown-it-image-figures
	const figureImageMarkdownTests = [
		517, 520, 531, 572, 573, 574, 575, 576, 577, 578, 580, 581, 582, 583, 584,
		585, 586, 588, 589, 591,
	]

	const referenceLinkTests = [
		23, 33, 192, 193, 194, 195, 196, 198, 200, 201, 202, 203, 204, 205, 206, 214,
		215, 216, 217, 218, 514, 515, 516, 517, 518, 527, 528, 529, 530, 531, 532,
		533, 534, 535, 539, 540, 541, 542, 543, 544, 549, 550, 553, 554, 555, 556,
		557, 558, 559, 560, 561, 562, 564, 565, 566, 568, 569, 570, 571, 593,
	]

	spec.forEach((entry) => {
		// We do not support HTML
		if (entry.section === 'HTML blocks' || entry.section === 'Raw HTML') return

		if (skippedMarkdownTests.indexOf(entry.example) !== -1) {
			return
		}

		test('commonmark parsing ' + entry.example, () => {
			let expected = entry.markdown.includes('__')
				? entry.html
						.replace(/<strong>/g, '<u>')
						.replace(/<\/strong>/g, '</u>')
				: entry.html

			if (figureImageMarkdownTests.indexOf(entry.example) !== -1) {
				expected = expected
					.replace(/<p>/g, '<figure>')
					.replace(/<\/p>/g, '</figure>')
			}

			let rendered = markdownit.render(entry.markdown)

			if (referenceLinkTests.indexOf(entry.example) !== -1) {
				rendered = rendered.replace(
					/ data-md-reference-label="[^"]+" data-md-reference-type="[a-z]+"/g,
					'',
				)
			}

			// Ignore special markup for untouched markdown
			expect(normalize(rendered)).toBe(expected)
		})
	})
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'

describe('footnotes (markdown-it)', () => {
	it('simple footnote', () => {
		expect(markdownit.render('Foo[^1]\n\n[^1]: bar'))
			.to.equal('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup></p>\n<section data-type="footnotes">\n<div data-type="footnote" data-reference-id="1">\n<p>bar</p>\n</div>\n</section>\n')
	})
	it('footnote with custom numeric label', () => {
		expect(markdownit.render('Foo[^42]\n\n[^42]: bar'))
			.to.equal('<p>Foo<sup data-type="footnote-reference" data-reference-id="42"></sup></p>\n<section data-type="footnotes">\n<div data-type="footnote" data-reference-id="42">\n<p>bar</p>\n</div>\n</section>\n')
	})
	it('footnote with custom string label', () => {
		expect(markdownit.render('Foo[^label]\n\n[^label]: bar'))
			.to.equal('<p>Foo<sup data-type="footnote-reference" data-reference-id="label"></sup></p>\n<section data-type="footnotes">\n<div data-type="footnote" data-reference-id="label">\n<p>bar</p>\n</div>\n</section>\n')
	})
	it('multi-line footnote', () => {
		expect(markdownit.render('Foo[^12]\n\n[^12]: first\n        second'))
			.to.equal('<p>Foo<sup data-type="footnote-reference" data-reference-id="12"></sup></p>\n<section data-type="footnotes">\n<div data-type="footnote" data-reference-id="12">\n<p>first\nsecond</p>\n</div>\n</section>\n')
	})
	it('multi-paragraph footnote with list item', () => {
		expect(markdownit.render('Foo[^1]\n\n[^1]: first\n\n      * item'))
			.to.equal('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup></p>\n<section data-type="footnotes">\n<div data-type="footnote" data-reference-id="1">\n<p>first</p>\n<ul data-bullet="*">\n<li>item</li>\n</ul>\n</div>\n</section>\n')
	})
	it('multiple footnotes', () => {
		expect(markdownit.render('Foo[^1] bar[^2]\n\n[^1]: first\n\n[^2]: second'))
			.to.equal('<p>Foo<sup data-type="footnote-reference" data-reference-id="1"></sup> bar<sup data-type="footnote-reference" data-reference-id="2"></sup></p>\n<section data-type="footnotes">\n<div data-type="footnote" data-reference-id="1">\n<p>first</p>\n</div>\n<div data-type="footnote" data-reference-id="2">\n<p>second</p>\n</div>\n</section>\n')
	})
	it('multiple references to same label', () => {
		expect(markdownit.render('Foo[^x] bar[^x]\n\n[^x]: label'))
			.to.equal('<p>Foo<sup data-type="footnote-reference" data-reference-id="x"></sup> bar<sup data-type="footnote-reference" data-reference-id="x"></sup></p>\n<section data-type="footnotes">\n<div data-type="footnote" data-reference-id="x">\n<p>label</p>\n</div>\n</section>\n')
	})
	it('dangling reference', () => {
		expect(markdownit.render('Foo[^dangling]'))
			.to.equal('<p>Foo<span class="keep-md">[</span>^dangling<span class="keep-md">]</span></p>\n')
	})
})

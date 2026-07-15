/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'

describe('comments (markdown-it)', () => {
	it('standard comment', () => {
		const md = 'The quick[^comment-1] brown fox.\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-15T13:12Z)*\n'
			+ '      Comment by Jane\n'
		expect(markdownit.render(md)).to.eq('<p>The quick<sup data-type="comment-reference" data-reference-id="comment-1"></sup> brown fox.</p>\n'
			+ '<section data-type="comments">\n'
			+ '<div data-type="comment" data-reference-id="comment-1">\n'
			+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T13:12Z">\n'
			+ '<p>Comment by Jane</p>\n'
			+ '</div>\n'
			+ '</div>\n'
			+ '</section>\n')
	})

	it('multiple comment items', () => {
		const md = 'The quick[^comment-1] brown fox.\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-15T13:12Z)*\n'
			+ '      Comment by Jane\n'
			+ '    - @[bob](mention://user/bob) *(2026-07-15T15:11Z)*\n'
			+ '      Comment by Bob\n'
		expect(markdownit.render(md)).to.eq('<p>The quick<sup data-type="comment-reference" data-reference-id="comment-1"></sup> brown fox.</p>\n'
			+ '<section data-type="comments">\n'
			+ '<div data-type="comment" data-reference-id="comment-1">\n'
			+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T13:12Z">\n'
			+ '<p>Comment by Jane</p>\n'
			+ '</div>\n'
			+ '<div data-type="comment-item" data-author="bob" data-author-label="bob" data-timestamp="2026-07-15T15:11Z">\n'
			+ '<p>Comment by Bob</p>\n'
			+ '</div>\n'
			+ '</div>\n'
			+ '</section>\n')
	})

	it('guest comment', () => {
		const md = 'The quick[^comment-1] brown fox.\n\n'
			+ '[^comment-1]:\n'
			+ '    - @guestname *(2026-07-15T13:12Z)*\n'
			+ '      Comment from guest\n'
		expect(markdownit.render(md)).to.eq('<p>The quick<sup data-type="comment-reference" data-reference-id="comment-1"></sup> brown fox.</p>\n'
			+ '<section data-type="comments">\n'
			+ '<div data-type="comment" data-reference-id="comment-1">\n'
			+ '<div data-type="comment-item" data-author="" data-author-label="guestname" data-timestamp="2026-07-15T13:12Z">\n'
			+ '<p>Comment from guest</p>\n'
			+ '</div>\n'
			+ '</div>\n'
			+ '</section>\n')
	})

	it('comment without metadata', () => {
		const md = 'Foo[^comment-1] bar\n\n'
			+ '[^comment-1]:\n'
			+ '    - first reply\n'
			+ '    - second reply'
		expect(markdownit.render(md)).to.eq('<p>Foo<sup data-type="comment-reference" data-reference-id="comment-1"></sup> bar</p>\n'
			+ '<section data-type="comments">\n'
			+ '<div data-type="comment" data-reference-id="comment-1">\n'
			+ '<div data-type="comment-item" data-author="" data-author-label="" data-timestamp="">\n'
			+ '<p>first reply</p>\n'
			+ '</div>\n'
			+ '<div data-type="comment-item" data-author="" data-author-label="" data-timestamp="">\n'
			+ '<p>second reply</p>\n'
			+ '</div>\n'
			+ '</div>\n'
			+ '</section>\n')
	})

	it('plain comment without metadata and without bullet list', () => {
		const md = 'The quick[^comment-1] brown fox.\n\n'
			+ '[^comment-1]: some comment'
		expect(markdownit.render(md)).to.eq('<p>The quick<sup data-type="comment-reference" data-reference-id="comment-1"></sup> brown fox.</p>\n'
			+ '<section data-type="comments">\n'
			+ '<div data-type="comment" data-reference-id="comment-1">\n'
			+ '<div data-type="comment-item" data-author="" data-author-label="" data-timestamp="">\n'
			+ '<p>some comment</p>\n'
			+ '</div>\n'
			+ '</div>\n'
			+ '</section>\n')
	})

	it('comments and footnotes in the same document', () => {
		const md = 'A[^comment-1] B[^1] C[^comment-2]\n\n'
			+ '[^comment-1]:\n'
			+ '    - @[jane](mention://user/jane) *(2026-07-15T13:12Z)*\n'
			+ '      Comment by Jane\n\n'
			+ '[^1]: footnote\n\n'
			+ '[^comment-2]:\n'
			+ '    - @[bob](mention://user/bob) *(2026-07-15T15:11Z)*\n'
			+ '      Comment by Bob'
		expect(markdownit.render(md)).to.eq('<p>A<sup data-type="comment-reference" data-reference-id="comment-1"></sup> B<sup data-type="footnote-reference" data-reference-id="1"></sup> C<sup data-type="comment-reference" data-reference-id="comment-2"></sup></p>\n'
			+ '<section data-type="comments">\n'
			+ '<div data-type="comment" data-reference-id="comment-1">\n'
			+ '<div data-type="comment-item" data-author="jane" data-author-label="jane" data-timestamp="2026-07-15T13:12Z">\n'
			+ '<p>Comment by Jane</p>\n'
			+ '</div>\n'
			+ '</div>\n'
			+ '<div data-type="comment" data-reference-id="comment-2">\n'
			+ '<div data-type="comment-item" data-author="bob" data-author-label="bob" data-timestamp="2026-07-15T15:11Z">\n'
			+ '<p>Comment by Bob</p>\n'
			+ '</div>\n'
			+ '</div>\n'
			+ '</section>\n'
			+ '<section data-type="footnotes">\n'
			+ '<div data-type="footnote" data-reference-id="1">\n'
			+ '<p>footnote</p>\n'
			+ '</div>\n'
			+ '</section>\n')
	})
})

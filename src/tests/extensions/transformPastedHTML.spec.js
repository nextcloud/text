/**
 * SPDX-FileCopyrightText: 2023-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import transformPastedHTML from './../../extensions/transformPastedHTML.js'

describe('transformPastedHTML', () => {

	// alias so the strings line up nicely
	const tr = transformPastedHTML

	it('strips newlines from input', () => {
		expect(tr('a\nb\n\nc'))
			.toBe('a b  c')
	})

	it('strips newlines from input', () => {
		expect(tr('a\nb\n\nc'))
			.toBe('a b  c')
	})

	it('strips newlines from tags', () => {
		expect(tr('<p>a\nb</p>'))
			.toBe('<p>a b</p>')
	})

	it('preserve newlines in pre tags', () => {
		expect(tr('<pre>a\nb</pre>'))
			.toBe('<pre>a\nb</pre>')
	})

	it('strips newlines in tags with white-space: normal', () => {
		expect(tr('<div style="white-space: normal;">a\nb</div>'))
			.toBe('<div style="white-space: normal;">a b</div>')
	})

	it('strips newlines in tags with white-space: nowrap', () => {
		expect(tr('<div style="white-space: nowrap;">a\nb</div>'))
			.toBe('<div style="white-space: nowrap;">a b</div>')
	})

	it('preserves newlines in tags with white-space: pre', () => {
		expect(tr('<div style="white-space: pre;">a\nb</div>'))
			.toBe('<div style="white-space: pre;">a\nb</div>')
	})

	it('preserve newlines in tags with white-space: pre-wrap', () => {
		expect(tr('<div style="white-space: pre-wrap;">a\nb</div>'))
			.toBe('<div style="white-space: pre-wrap;">a\nb</div>')
	})

	it('preserve newlines in tags with white-space: pre-line', () => {
		expect(tr('<div style="white-space: pre-line;">a\nb</div>'))
			.toBe('<div style="white-space: pre-line;">a\nb</div>')
	})

	it('preserve newlines in tags with white-space: break-spaces', () => {
		expect(tr('<div style="white-space: break-spaces;">a\nb</div>'))
			.toBe('<div style="white-space: break-spaces;">a\nb</div>')
	})

	it('handles different tags', () => {
		expect(tr('<pre>a\nb</pre><p>c\nd</p>'))
			.toBe('<pre>a\nb</pre><p>c d</p>')
	})

	it('preserve newlines in nested code blocks', () => {
		expect(tr('<pre><code>this\nis code\nplease preserve\n  whitespace!\nThanks</code></pre>'))
			.toBe('<pre><code>this\nis code\nplease preserve\n  whitespace!\nThanks</code></pre>')
	})

	it('preserve newlines in deep nested code blocks', () => {
		expect(tr('<pre><code><em>this\nis code</em>\nplease preserve\n  whitespace!\nThanks</code></pre>'))
			.toBe('<pre><code><em>this\nis code</em>\nplease preserve\n  whitespace!\nThanks</code></pre>')
	})

})

/**
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'
import stripIndent from './stripIndent.js'

describe('Details extension', () => {
	it('renders', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>summary</summary>\ncontent\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary>summary</summary><p>content</p></details>',
		)
	})
	it('renders with empty summary', () => {
		const rendered = markdownit.render(
			'<details>\n<summary></summary>\ncontent\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary></summary><p>content</p></details>',
		)
	})
	it('renders with empty content', () => {
		const rendered = markdownit.render(
			'<details>\n<summary></summary>\n</details>',
		)
		expect(stripIndent(rendered)).toBe('<details><summary></summary></details>')
	})
	it('renders with spaces', () => {
		const rendered = markdownit.render(
			'  <details>  \n <summary> summary </summary> \n  content \n  </details>  ',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary>summary</summary><p>content</p></details>',
		)
	})
	it('renders with marks in summary', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>**summary**</summary>\ncontent\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary><strong>summary</strong></summary><p>content</p></details>',
		)
	})
	it('renders with marks in content', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>summary</summary>\n**content**\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary>summary</summary><p><strong>content</strong></p></details>',
		)
	})
	it('renders with block elements in content', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>summary</summary>\nparagraph\n- one\n- two\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary>summary</summary><p>paragraph</p><ul data-bullet="-"><li>one</li><li>two</li></ul></details>',
		)
	})
	it('renders nested details', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>summary</summary>\n<details>\n<summary>nested summary</summary>\nnested content\n</details>\ncontent\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary>summary</summary><details><summary>nested summary</summary><p>nested content</p></details><p>content</p></details>',
		)
	})
	it('renders without linebreak after details open', () => {
		const rendered = markdownit.render(
			'<details><summary>summary</summary>\ncontent\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<details><summary>summary</summary><p>content</p></details>',
		)
	})
	it('does not render with missing linebreak after summary', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>summary</summary>content\n</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<p>&lt;details&gt;&lt;summary&gt;summary&lt;/summary&gt;content&lt;/details&gt;</p>',
		)
	})
	it('does not render with missing linebreak before details close', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>summary</summary>\ncontent</details>',
		)
		expect(stripIndent(rendered)).toBe(
			'<p>&lt;details&gt;&lt;summary&gt;summary&lt;/summary&gt;content&lt;/details&gt;</p>',
		)
	})
	it('does not render without summary', () => {
		const rendered = markdownit.render('<details>\ncontent\n</details>')
		expect(stripIndent(rendered)).toBe(
			'<p>&lt;details&gt;content&lt;/details&gt;</p>',
		)
	})
	it('does not render with missing closing tag', () => {
		const rendered = markdownit.render(
			'<details>\n<summary>summary</summary>\ncontent',
		)
		expect(stripIndent(rendered)).toBe(
			'<p>&lt;details&gt;&lt;summary&gt;summary&lt;/summary&gt;content</p>',
		)
	})
	it('does not render with just summary', () => {
		const rendered = markdownit.render('<summary>summary</summary>')
		expect(stripIndent(rendered)).toBe(
			'<p>&lt;summary&gt;summary&lt;/summary&gt;</p>',
		)
	})
})

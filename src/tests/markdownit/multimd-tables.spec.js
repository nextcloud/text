/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import markdownit from '../../markdownit/index.js'
import stripIndent from './stripIndent.js'

describe('multimd-table extension', () => {
	it('renders simple table', () => {
		const rendered = markdownit.render(`
| header1 | header2 |
| --- | --- |
| cell1 | cell2 |
`)
		expect(stripIndent(rendered)).toBe(
			stripIndent(`
			<table>
			<thead><tr><th>header1</th><th>header2</th></tr></thead>
			<tbody><tr><td>cell1</td><td>cell2</td></tr></tbody>
			</table>`),
		)
	})

	it('renders table with line breaks', () => {
		const rendered = markdownit.render(`
| header1 | header2 |
| --- | --- |
| cell1<br>second line | cell2 |
`)
		expect(stripIndent(rendered)).toBe(
			stripIndent(`
			<table>
			<thead><tr><th>header1</th><th>header2</th></tr></thead>
			<tbody><tr><td>cell1<br data-syntax="html" />second line</td><td>cell2</td></tr></tbody>
			</table>`),
		)
	})

	it('renders mulitline with alignment, paragraph, list, codeblock and image', () => {
		const rendered = markdownit.render(`
|  #| header1           | header2       |
|--:|-------------------|---------------|
|  1| list:             | code:         | \\
|   |                   |               | \\
|   | * item1           | \`\`\`js         | \\
|   | * item2           | const x = '1' | \\
|   |                   | \`\`\`           | \\
|   | ![alt](/test.png) |               |
|  2| cell3             | cell4         |
|  3|                   | cell5         |
`)
		expect(stripIndent(rendered)).toBe(
			stripIndent(`
			<table>
			<thead><tr>
				<th style="text-align:right">#</th>
				<th>header1</th>
				<th>header2</th>
			</tr></thead>
			<tbody>
			<tr>
				<td style="text-align:right"><p>1</p></td>
				<td>
					<p>list:</p>
					<ul data-bullet="*"><li>item1</li><li>item2</li></ul>
					<figure><img src="/test.png" alt="alt" /></figure>
				</td><td>
					<p>code:</p>
					<pre><code class="language-js">const x = '1'</code></pre>
				</td>
			</tr>
			<tr>
				<td style="text-align:right">2</td>
				<td>cell3</td>
				<td>cell4</td></tr>
			<tr>
				<td style="text-align:right">3</td>
				<td></td>
				<td>cell5</td>
			</tr>
			</tbody>
			</table>`),
		)
	})
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { compileString } from 'sass'
import { describe, expect, it } from 'vitest'

/**
 * Compile one component's style block.
 *
 * These contracts live in the cascade rather than in the DOM, so jsdom cannot
 * see them: it applies no component CSS, and every assertion made through
 * `getComputedStyle` there would pass whatever the stylesheet said.
 *
 * @param component Component file name
 */
function compileComponentStyles(component: string) {
	const source = readFileSync(resolve(process.cwd(), 'src/components', component), 'utf8')
	const block = source.match(/<style lang="scss">([\s\S]*?)<\/style>/)
	expect(block, `${component} has a SCSS style block`).not.toBeNull()
	return compileString(block![1]!.replace(/@use[^;]+;/gu, '')).css
}

describe('comparison stylesheet contracts', () => {
	const contentStyles = compileComponentStyles('MarkdownContentComparison.vue')
	const listStyles = compileComponentStyles('ComparisonChangeList.vue')
	const sourceStyles = compileComponentStyles('MarkdownSourceComparison.vue')

	it('never paints with a colour variable Nextcloud does not define', () => {
		// --color-error-light, --color-success-light and --color-warning-light
		// exist nowhere in the server. Using one makes the whole declaration
		// invalid, so the mark silently renders with no fill at all.
		for (const [name, css] of Object.entries({ contentStyles, listStyles, sourceStyles })) {
			expect(css, name).not.toMatch(/--color-(error|success|warning|info|primary)-light\b/u)
		}
	})

	it('leaves a moved block on the relocation colour', () => {
		// A moved block node carries both --move and --block. The block rule is
		// later and more specific, so without an exclusion it repaints
		// relocation with the warning tokens.
		const blockRule = contentStyles
			.split('}')
			.find((rule) => rule.includes('.text-comparison-change--block'))
		expect(blockRule).toBeDefined()
		expect(blockRule).toContain('.text-comparison-change--move')
	})

	it('outranks the global bare-button rule on the list controls', () => {
		// core/css/inputs.scss styles every <button> at (0,1,1) — width 130px,
		// its own border, padding, background and cursor. A single-class
		// selector loses to it.
		for (const control of ['__section-toggle', '__change-item']) {
			expect(listStyles).toContain(`.text-comparison .text-comparison${control} {`)
			expect(listStyles).not.toContain(`\n.text-comparison${control} {`)
		}
	})
})

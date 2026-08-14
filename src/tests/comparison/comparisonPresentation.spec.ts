/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonAttributeCode, ComparisonSignal } from '../../comparison/markdownComparisonTypes.ts'

import { describe, expect, it } from 'vitest'
import { selectComparisonSignal } from '../../comparison/comparisonPresentation.ts'

const bold: ComparisonSignal = { type: 'mark', mark: 'bold', change: 'added' }

function attribute(attribute: ComparisonAttributeCode): ComparisonSignal {
	return { type: 'attribute', attribute, change: 'changed' }
}

describe('comparison presentation signal priority', () => {
	it.each([
		[['image-alt'], 'image-alt'],
		[['image-target'], 'image-target'],
		[['image-alt', 'image-target'], 'image-target'],
	] as const)('selects %s as %s', (attributes, expected) => {
		const signals = attributes.map(attribute)
		expect(selectComparisonSignal(signals)).toEqual(attribute(expected))
		expect(selectComparisonSignal([...signals].reverse())).toEqual(attribute(expected))
	})

	it.each([
		'link',
		'link-target',
		'task-state',
		'heading-level',
		'list-start',
		'code-language',
		'text-direction',
		'table-span',
		'table-alignment',
		'mention-identity',
		'mathematics',
		'preview-target',
		'footnote-reference',
		'callout-type',
		'details-state',
		'unknown-attribute',
	] as const)('prioritizes %s over generic formatting', (code) => {
		const expected = attribute(code)
		expect(selectComparisonSignal([bold, expected])).toEqual(expected)
		expect(selectComparisonSignal([expected, bold])).toEqual(expected)
	})

	it('prioritizes structure over generic formatting', () => {
		const node: ComparisonSignal = { type: 'node' }
		expect(selectComparisonSignal([bold, node])).toEqual(node)
		expect(selectComparisonSignal([node, bold])).toEqual(node)
	})
})

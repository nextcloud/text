/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonDescriptor, ComparisonEdit } from '../../comparison/markdownComparisonTypes.ts'

import { describe, expect, it } from 'vitest'
import {
	currentIdAfterFilter,
	currentOrdinal,
	isPureFormatting,
	moveCurrentId,
} from '../../comparison/comparisonNavigation.ts'

function descriptor(id: string, facets: ComparisonDescriptor['facets'], operation: ComparisonDescriptor['operation'] = 'replace'): ComparisonDescriptor {
	return {
		id,
		operation,
		detail: 'inline',
		facets,
		before: { from: 0, to: 1 },
		after: { from: 0, to: 1 },
		context: { before: null, after: null },
		preview: { before: null, after: null },
		signals: [],
	}
}

function edit(id: string, descriptors: ComparisonDescriptor[]): ComparisonEdit {
	return { id, kind: 'content', primary: descriptors.at(-1)!, descriptors }
}

describe('edit-first comparison navigation', () => {
	const edits = [
		edit('e0', [descriptor('d0', ['text'])]),
		edit('e1', [descriptor('d1', ['formatting'])]),
		edit('e2', [descriptor('d2a', ['formatting']), descriptor('d2b', ['text', 'formatting'])]),
		edit('e3', [descriptor('d3', ['attribute'])]),
	]

	it('requires every member to be formatting-only', () => {
		expect(isPureFormatting(edits[1]!)).toBe(true)
		expect(isPureFormatting(edits[2]!)).toBe(false)
	})

	it('V02 preserves the current edit or moves next then previous after filtering', () => {
		expect(currentIdAfterFilter(edits, ['e0', 'e2', 'e3'], 'e2')).toBe('e2')
		expect(currentIdAfterFilter(edits, ['e0', 'e2', 'e3'], 'e1')).toBe('e2')
		expect(currentIdAfterFilter(edits, ['e0'], 'e1')).toBe('e0')
		expect(currentIdAfterFilter(edits, [], 'e1')).toBeNull()
	})

	it('V01 wraps navigation and reports one ordinal per first-class edit', () => {
		const active = ['e0', 'e2', 'e3']
		expect(moveCurrentId(active, 'e0', -1)).toBe('e3')
		expect(moveCurrentId(active, 'e3', 1)).toBe('e0')
		expect(currentOrdinal(active, 'e2')).toBe(2)
		expect(currentOrdinal([], null)).toBe(0)
	})
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { ComparisonAttributeCode, ComparisonSignal } from '../../comparison/markdownComparisonTypes.ts'

import { describe, expect, it } from 'vitest'
import { selectComparisonSignal } from '../../comparison/comparisonPresentation.ts'

const bold: ComparisonSignal = { type: 'mark', mark: 'bold', change: 'added' }
const attribute = (code: ComparisonAttributeCode): ComparisonSignal => ({ type: 'attribute', attribute: code, change: 'changed' })

describe('AUD-10 comparison presentation', () => {
	it('selects the same strongest attribute regardless of descriptor storage order', () => {
		const signals = [bold, attribute('image-alt'), attribute('image-target')]
		expect(selectComparisonSignal(signals)).toEqual(attribute('image-target'))
		expect(selectComparisonSignal([...signals].reverse())).toEqual(attribute('image-target'))
	})

	it('prioritizes every specific attribute and node structure over generic formatting', () => {
		for (const code of ['link', 'task-state', 'heading-level', 'table-span', 'unknown-attribute'] as const) {
			expect(selectComparisonSignal([bold, attribute(code)])).toEqual(attribute(code))
		}
		const node: ComparisonSignal = { type: 'node' }
		expect(selectComparisonSignal([bold, node])).toEqual(node)
	})
})

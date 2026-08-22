/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import { confirmReservedExactMoves } from '../../comparison/markdownComparisonMoves.ts'

describe('Markdown comparison moves', () => {
	it('does not traverse either document without reserved move candidates', () => {
		const beforeEditor = createComparisonEditor('Before')
		const afterEditor = createComparisonEditor('After')
		try {
			const beforeDescendants = vi.spyOn(beforeEditor.state.doc, 'descendants')
			const afterDescendants = vi.spyOn(afterEditor.state.doc, 'descendants')

			expect(confirmReservedExactMoves(beforeEditor.state.doc, afterEditor.state.doc, []))
				.toEqual({ groups: [], rejected: [] })
			expect(beforeDescendants).not.toHaveBeenCalled()
			expect(afterDescendants).not.toHaveBeenCalled()
		} finally {
			beforeEditor.destroy()
			afterEditor.destroy()
		}
	})
})

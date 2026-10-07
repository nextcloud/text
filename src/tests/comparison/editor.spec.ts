/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { createComparisonEditor } from '../../comparison/editor.ts'

describe('createComparisonEditor', () => {
	it('creates a read-only editor with inferred text direction', () => {
		const editor = createComparisonEditor('English\n\nالعربية')
		try {
			expect(editor.isEditable).toBe(false)
			const directions: Array<string | null> = []
			editor.state.doc.forEach((node) => directions.push(node.attrs.dir))
			expect(directions.slice(0, 2)).toEqual(['ltr', 'rtl'])
		} finally {
			editor.destroy()
		}
	})
})

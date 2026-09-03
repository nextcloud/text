/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'

describe('comparison editor', () => {
	it('creates a complete immutable detached Text editor with directional paragraphs', () => {
		const editor = createComparisonEditor('English\n\nالعربية')
		try {
			expect(editor.options.element).toBeInstanceOf(HTMLElement)
			expect((editor.options.element as HTMLElement).isConnected).toBe(false)
			expect(editor.isEditable).toBe(false)
			expect(editor.state.doc.textContent).toBe('Englishالعربية')
			const directions: Array<string | null> = []
			editor.state.doc.descendants((node) => {
				if (node.type.name === 'paragraph') {
					directions.push(node.attrs.dir as string | null)
				}
			})
			expect(directions.slice(0, 2)).toEqual(['ltr', 'rtl'])
		} finally {
			editor.destroy()
		}
	})
})

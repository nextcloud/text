/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Editor } from '@tiptap/vue-3'
import { describe, expect, it, vi } from 'vitest'
import { consumeStateOnlyComparisonEditor } from '../../comparison/comparisonEditorLifecycle.ts'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import EditableTable from '../../nodes/EditableTable.js'
import Table from '../../nodes/Table.js'

describe('comparison editor lifecycle', () => {
	it('claims only registered state-only comparison editors once', () => {
		const comparisonEditor = createComparisonEditor('State only')
		try {
			expect(() => consumeStateOnlyComparisonEditor(comparisonEditor)).not.toThrow()
			expect(() => consumeStateOnlyComparisonEditor(comparisonEditor))
				.toThrow('Comparison editor plugin initialization failed')
		} finally {
			comparisonEditor.destroy()
		}
	})

	it('parses the complete read-only document without creating a detached view', () => {
		const mount = vi.spyOn(Editor.prototype, 'mount')
		const editor = createComparisonEditor('Before\n\n| A |\n| --- |\n| one |')
		try {
			expect(mount).not.toHaveBeenCalled()
			expect(editor.options.element).toBeNull()
			expect(editor.state.doc.textContent).toBe('BeforeAone')
			expect(editor.state.plugins).toEqual([])
			expect(editor.isDestroyed).toBe(true)
			expect(() => editor.view.dom).toThrow('editor view is not available')
			expect(editor.extensionManager.nodeViews.callout).toBeTypeOf('function')
			const table = editor.extensionManager.extensions.find(({ name }) => name === 'table')
			expect(table).toBe(Table)
			expect(table).not.toBe(EditableTable)
		} finally {
			editor.destroy()
			mount.mockRestore()
		}
	})

	it('infers text direction while parsing an immutable comparison document', () => {
		const editor = createComparisonEditor('English\n\nالعربية')
		try {
			const directions: Array<string | null> = []
			editor.state.doc.descendants((node) => {
				if (node.type.name === 'paragraph') {
					directions.push(node.attrs.dir as string | null)
				}
				return true
			})

			expect(directions.slice(0, 2)).toEqual(['ltr', 'rtl'])
			expect(editor.state.plugins).toEqual([])
		} finally {
			editor.destroy()
		}
	})

	it('can parse both documents with one schema', () => {
		const before = createComparisonEditor('::: info\nBefore\n:::')
		const after = createComparisonEditor('::: warn\nAfter\n:::', { schema: before.schema })
		try {
			expect(after.schema).toBe(before.schema)
			expect(after.extensionManager.schema).toBe(before.schema)
			expect(after.state.doc.type.schema).toBe(before.state.doc.type.schema)
			expect(before.state.doc.firstChild?.attrs.type).toBe('info')
			expect(after.state.doc.firstChild?.attrs.type).toBe('warn')
		} finally {
			before.destroy()
			after.destroy()
		}
	})
})

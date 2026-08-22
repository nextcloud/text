/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it, vi } from 'vitest'
import { registerMountedPlugin } from '../../comparison/comparisonEditorLifecycle.ts'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import {
	createComparisonDecorationPlugin,
	createMarkdownComparisonModel,
	prepareComparisonDecorations,
	setComparisonDecorationState,
} from '../../comparison/markdownComparison.ts'

describe('comparison decorations', () => {
	it('avoids a descriptor-by-document cross product for full-document block changes', () => {
		const before = createComparisonEditor(Array.from({ length: 65 }, (_, index) => `before ${index}`).join('\n\n'))
		const after = createComparisonEditor(Array.from({ length: 65 }, (_, index) => `# after ${index}`).join('\n\n'))
		try {
			const descriptors = createMarkdownComparisonModel(before.state.doc, after.state.doc).descriptors
			expect(descriptors.length).toBeGreaterThan(60)
			expect(descriptors.every(({ detail }) => detail === 'block')).toBe(true)
			const topLevelTraversal = vi.spyOn(before.state.doc, 'forEach')

			const { key, plugin } = createComparisonDecorationPlugin(descriptors, 'before', 'Changed content')
			const decorations = key.getState(before.state.reconfigure({ plugins: [plugin] }))!.decorations.find()

			expect(decorations.length).toBeGreaterThan(60)
			expect(topLevelTraversal.mock.calls.length).toBeLessThanOrEqual(2)
		} finally {
			before.destroy()
			after.destroy()
		}
	})

	it('bounds inline preparation by range intersections instead of document size', () => {
		const count = 200
		const before = createComparisonEditor(Array.from({ length: count }, () => '- [ ] a x a x a x a x a x a x a x a x').join('\n'))
		const after = createComparisonEditor(Array.from({ length: count }, () => '- [ ] b x b x b x b x b x b x b x b x').join('\n'))
		try {
			const descriptors = createMarkdownComparisonModel(before.state.doc, after.state.doc).descriptors
			const audit = { examinedNodes: 0 }
			const prepared = prepareComparisonDecorations(before.state.doc, descriptors, 'before', audit)

			expect(descriptors).toHaveLength(count * 8)
			expect(prepared.length).toBeGreaterThanOrEqual(descriptors.length)
			expect(audit.examinedNodes).toBeLessThan(descriptors.length * 50)
		} finally {
			before.destroy()
			after.destroy()
		}
	})

	it('outlines coarse replacements at node level without destructive inline treatment', () => {
		const before = createComparisonEditor(`Before ${'a'.repeat(4600)}`)
		const after = createComparisonEditor(`After ${'b'.repeat(4600)}`)
		try {
			const descriptors = createMarkdownComparisonModel(before.state.doc, after.state.doc).descriptors
			expect(descriptors).toHaveLength(1)
			expect(descriptors[0]?.detail).toBe('block')
			for (const [editor, side] of [[before, 'before'], [after, 'after']] as const) {
				const { key, plugin } = createComparisonDecorationPlugin(descriptors, side, 'Changed content')
				const decorations = key.getState(editor.state.reconfigure({ plugins: [plugin] }))!.decorations.find()
				expect(decorations).toHaveLength(1)
				expect(decorations[0]).toMatchObject({
					from: 0,
					to: editor.state.doc.firstChild!.nodeSize,
				})
				const attributes = (decorations[0] as unknown as { type: { attrs: Record<string, string> } }).type.attrs
				expect(attributes.class).toContain('text-comparison-change--block')
				expect(attributes.class).not.toContain('text-comparison-change--removed')
				expect(attributes.class).not.toContain('text-comparison-change--added')
			}
		} finally {
			before.destroy()
			after.destroy()
		}
	})

	it('keeps empty block ranges as widgets when other block changes index nodes', () => {
		const before = createComparisonEditor([
			'Alpha old',
			'Beta old',
			'Gamma old',
			'Same anchor',
			'Delete me',
		].join('\n\n'))
		const after = createComparisonEditor([
			'Alpha new',
			'Insert',
			'Beta new',
			'Gamma new',
			'Same anchor',
		].join('\n\n'))
		try {
			const descriptors = createMarkdownComparisonModel(before.state.doc, after.state.doc).descriptors
			const inserted = descriptors.find((descriptor) => descriptor.operation === 'insert'
				&& descriptor.detail === 'block'
				&& descriptor.before.from === descriptor.before.to)
			expect(inserted).toBeDefined()
			expect(descriptors.some((descriptor) => descriptor.detail === 'block'
				&& descriptor.before.from < descriptor.before.to)).toBe(true)

			const prepared = prepareComparisonDecorations(before.state.doc, descriptors, 'before')
				.filter(({ descriptor }) => descriptor.id === inserted!.id)

			expect(prepared).toHaveLength(1)
			expect(prepared[0]).toMatchObject({
				from: inserted!.before.from,
				to: inserted!.before.from,
				type: 'widget',
			})
		} finally {
			before.destroy()
			after.destroy()
		}
	})

	it('uses stable IDs on both sides and does not traverse on navigation', () => {
		const before = createComparisonEditor('Before one\n\nBefore two')
		const after = createComparisonEditor('After one\n\nAfter two')
		try {
			const descriptors = createMarkdownComparisonModel(before.state.doc, after.state.doc).descriptors
			const beforeTraversal = vi.spyOn(before.state.doc, 'descendants')
			const afterTraversal = vi.spyOn(after.state.doc, 'descendants')
			const beforeHost = document.createElement('div')
			const afterHost = document.createElement('div')
			before.setOptions({ element: beforeHost })
			after.setOptions({ element: afterHost })
			before.mount(beforeHost)
			after.mount(afterHost)
			const beforeDecorations = createComparisonDecorationPlugin(descriptors, 'before', 'Removed')
			const afterDecorations = createComparisonDecorationPlugin(descriptors, 'after', 'Added')
			registerMountedPlugin(before, beforeDecorations.plugin)
			registerMountedPlugin(after, afterDecorations.plugin)
			const beforeKey = beforeDecorations.key
			const afterKey = afterDecorations.key
			beforeTraversal.mockClear()
			afterTraversal.mockClear()
			const activeIds = descriptors.map(({ id }) => id)
			const currentId = activeIds.at(-1)!
			setComparisonDecorationState(before, beforeKey, { activeIds, currentId })
			setComparisonDecorationState(after, afterKey, { activeIds, currentId })

			expect(beforeKey.getState(before.state)).toMatchObject({ activeIds, currentId })
			expect(afterKey.getState(after.state)).toMatchObject({ activeIds, currentId })
			// Other Text plugins perform a constant number of maintenance walks on
			// any transaction. Comparison navigation must not add one per descriptor.
			expect(beforeTraversal.mock.calls.length).toBeLessThanOrEqual(4)
			expect(afterTraversal.mock.calls.length).toBeLessThanOrEqual(4)
			const beforeIds = beforeKey.getState(before.state)?.decorations.find()
				.map((decoration) => (decoration as unknown as { type: { attrs?: Record<string, string> } }).type.attrs?.['data-comparison-change'])
				.filter((id): id is string => id !== undefined)
			const afterIds = afterKey.getState(after.state)?.decorations.find()
				.map((decoration) => (decoration as unknown as { type: { attrs?: Record<string, string> } }).type.attrs?.['data-comparison-change'])
				.filter((id): id is string => id !== undefined)
			expect(new Set(beforeIds)).toEqual(new Set(activeIds))
			expect(new Set(afterIds)).toEqual(new Set(activeIds))
			expect(beforeIds?.every((id) => !/^\d+$/.test(id))).toBe(true)
		} finally {
			before.destroy()
			after.destroy()
		}
	})
})

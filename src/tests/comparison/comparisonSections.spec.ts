/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { Node } from '@tiptap/pm/model'
import type { ComparisonDescriptor, ComparisonEdit } from '../../comparison/markdownComparisonTypes.ts'

import { schema } from 'prosemirror-schema-basic'
import { describe, expect, it } from 'vitest'
import { buildComparisonSections, headingLocations, nearestHeading } from '../../comparison/comparisonSections.ts'

function doc(...blocks: Array<[type: 'heading' | 'paragraph', text: string]>): Node {
	return schema.node('doc', null, blocks.map(([type, text]) => schema.node(type, type === 'heading' ? { level: 1 } : null, text ? schema.text(text) : undefined)))
}

function descriptor(id: string, operation: ComparisonDescriptor['operation'], before: number, after: number): ComparisonDescriptor {
	return {
		id,
		operation,
		detail: 'inline',
		facets: ['text'],
		before: { from: before, to: before + 1 },
		after: { from: after, to: after + 1 },
		context: {
			before: { code: 'paragraph', path: [1], from: before, to: before + 1 },
			after: { code: 'paragraph', path: [1], from: after, to: after + 1 },
		},
		preview: { before: null, after: null },
		signals: [],
	}
}

function edit(id: string, primary: ComparisonDescriptor, members: ComparisonDescriptor[] = [primary]): ComparisonEdit {
	return { id, kind: 'content', primary, descriptors: members }
}

describe('edit-first comparison sections', () => {
	it('finds ordered headings and resolves the nearest preceding heading', () => {
		const document = doc(['paragraph', 'Intro'], ['heading', 'One'], ['paragraph', 'Body'], ['heading', 'Two'])
		const headings = headingLocations(document)
		expect(headings.map(({ text }) => text)).toEqual(['One', 'Two'])
		expect(nearestHeading(headings, 0)).toBe('')
		expect(nearestHeading(headings, headings[1]!.from)).toBe('Two')
	})

	it('builds one row source per edit', () => {
		const before = doc(['heading', 'Alpha'], ['paragraph', 'Before'])
		const after = doc(['heading', 'Alpha'], ['paragraph', 'After'])
		const headingEnd = after.child(0).nodeSize
		const primary = descriptor('d-primary', 'replace', headingEnd, headingEnd)
		const formatting = { ...descriptor('d-format', 'replace', headingEnd, headingEnd), facets: ['formatting'] as const }
		const sections = buildComparisonSections([edit('edit-1', primary, [formatting, primary])], before, after)

		expect(sections).toEqual([expect.objectContaining({
			id: 'edit-1',
			title: 'Alpha',
			edits: [expect.objectContaining({ id: 'edit-1', primary })],
		})])
	})

	it('uses Before context for deletions and the After title for a correlated rename', () => {
		const before = doc(['heading', 'Old'], ['paragraph', 'Before'])
		const after = doc(['heading', 'New'], ['paragraph', 'After'])
		const beforeBody = before.child(0).nodeSize
		const afterBody = after.child(0).nodeSize
		const rename = descriptor('rename', 'replace', 0, 0)
		rename.context.before = { code: 'heading', path: [0], from: 0, to: beforeBody }
		rename.context.after = { code: 'heading', path: [0], from: 0, to: afterBody }
		const deletion = descriptor('delete', 'delete', beforeBody, afterBody)
		const sections = buildComparisonSections([edit('rename-edit', rename), edit('delete-edit', deletion)], before, after)

		expect(sections.map(({ title }) => title)).toEqual(['New'])
		expect(sections[0]!.edits.map(({ id }) => id)).toEqual(['rename-edit', 'delete-edit'])
	})
})

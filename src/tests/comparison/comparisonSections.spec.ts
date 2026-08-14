/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { groupComparisonDescriptors } from '../../comparison/comparisonNavigation.ts'
import {
	buildComparisonSections,
	headingLocations,
	nearestHeading,
} from '../../comparison/comparisonSections.ts'
import { createComparisonEditor } from '../../comparison/createComparisonEditor.ts'
import { createMarkdownComparisonModel } from '../../comparison/markdownComparison.ts'

/** @param content Markdown content */
function documentOf(content: string) {
	const editor = createComparisonEditor(content)
	try {
		return editor.state.doc
	} finally {
		editor.destroy()
	}
}

/**
 * @param beforeContent Before Markdown
 * @param afterContent After Markdown
 */
function sectionsOf(beforeContent: string, afterContent: string) {
	const before = documentOf(beforeContent)
	const after = documentOf(afterContent)
	const { descriptors } = createMarkdownComparisonModel(before, after)
	return buildComparisonSections(groupComparisonDescriptors(descriptors), before, after)
}

describe('comparison sections', () => {
	it('lists headings in document order and skips empty ones', () => {
		const headings = headingLocations(documentOf('# One\n\ntext\n\n#\n\n## Two\n\nmore'))
		expect(headings.map(({ text }) => text)).toEqual(['One', 'Two'])
		expect(headings[0]!.from).toBeLessThan(headings[1]!.from)
	})

	it('resolves the heading at or before a position and none above the first heading', () => {
		const headings = headingLocations(documentOf('Intro\n\n# One\n\ntext\n\n## Two\n\nmore'))
		expect(headings.map(({ text }) => text)).toEqual(['One', 'Two'])
		expect(nearestHeading(headings, 0)).toBe('')
		expect(nearestHeading(headings, headings[0]!.from - 1)).toBe('')
		expect(nearestHeading(headings, headings[0]!.from)).toBe('One')
		expect(nearestHeading(headings, headings[1]!.from - 1)).toBe('One')
		expect(nearestHeading(headings, headings[1]!.from)).toBe('Two')
		expect(nearestHeading(headings, headings[1]!.from + 1000)).toBe('Two')
		expect(nearestHeading([], 7)).toBe('')
	})

	it('groups changes under the nearest preceding heading', () => {
		const sections = sectionsOf(
			'# Alpha\n\nalpha text\n\n# Beta\n\nbeta text',
			'# Alpha\n\nalpha changed\n\n# Beta\n\nbeta changed',
		)
		expect(sections.map(({ title }) => title)).toEqual(['Alpha', 'Beta'])
	})

	it('names a renamed section by its new heading', () => {
		const sections = sectionsOf(
			'# Release plan\n\nBefore objective\n\nBefore owner',
			'# Launch plan\n\nAfter objective\n\nAfter owner',
		)
		expect(sections.map(({ title }) => title)).toEqual(['Launch plan'])
	})

	it('falls back to the Before document so a deleted section still resolves', () => {
		const sections = sectionsOf('# Removed\n\nremoved text\n\ncommon tail', 'common tail')
		expect(headingLocations(documentOf('common tail'))).toEqual([])
		expect(sections.map(({ title }) => title)).toEqual(['Removed'])
	})

	it('does not borrow a Before heading for a change that now sits above every heading', () => {
		// The body moves above the heading. Its After title is '' because it
		// really is above the first heading there — an answer, not a miss — so
		// the Before name 'Old' must not stand in for it.
		const sections = sectionsOf('# Old\n\nbody one', 'body two\n\n# Old')
		expect(sections[0]?.title).toBe('')
	})

	it('correlates headings in a document large enough to defeat a quadratic alignment', () => {
		// 501 and 502 headings: a quadratic table would be 250k cells, and a
		// cutoff there would fall back to pairing by position, which the early
		// insertion shifts by one — filing the last section's delete under its
		// predecessor while the row still claimed the right name.
		const body = (index: number, value: string) => `# H${index}\n\nbody ${index} ${value}`
		const beforeSections = Array.from({ length: 501 }, (_, index) => body(index, 'same'))
		const afterSections = [...beforeSections]
		afterSections.splice(1, 0, '# Inserted\n\nfresh')
		beforeSections[500] = '# H500\n\nremove me\n\nstable anchor\n\nold value'
		afterSections[501] = '# H500\n\nstable anchor\n\nnew value'
		const sections = sectionsOf(beforeSections.join('\n\n'), afterSections.join('\n\n'))
		const last = sections.find(({ title }) => title === 'H500')
		expect(last).toBeDefined()
		expect(last!.groups.map((group) => group.descriptors[0]!.operation))
			.toEqual(expect.arrayContaining(['delete', 'replace']))
		expect(sections.some(({ title }) => title === 'H499')).toBe(false)
	})

	it('keeps later headings correlated when one is inserted before them', () => {
		// An inserted heading shifts every later After index by one. Pairing by
		// position alone would correlate Before's Beta with After's Inserted, so
		// the delete under Beta would be filed under the new section instead.
		const sections = sectionsOf(
			'# Alpha\n\nalpha body\n\n# Beta\n\nremove me\n\nbeta value',
			'# Alpha\n\nalpha body\n\n# Inserted\n\nfresh\n\n# Beta\n\nbeta VALUE',
		)
		const beta = sections.find(({ title }) => title === 'Beta')
		expect(beta).toBeDefined()
		expect(beta!.groups.map((group) => group.descriptors[0]!.operation))
			.toEqual(expect.arrayContaining(['delete', 'replace']))
		expect(sections.find(({ title }) => title === 'Inserted')!.groups
			.every((group) => group.descriptors[0]!.operation === 'insert')).toBe(true)
	})

	it('does not correlate an unequal ambiguous heading gap by position', () => {
		const sections = sectionsOf(
			'# Start\n\nstable start\n\n# Old\n\nremove one\n\nremove two\n\nstable anchor\n\nold value\n\n# End\n\nstable end',
			'# Start\n\nstable start\n\n# Inserted\n\nfresh\n\n# New\n\nstable anchor\n\nnew value\n\n# End\n\nstable end',
		)
		const inserted = sections.find(({ title }) => title === 'Inserted')
		const old = sections.find(({ title }) => title === 'Old')

		expect(inserted).toBeDefined()
		expect(inserted!.groups.map((group) => group.descriptors[0]!.operation)).not.toContain('delete')
		expect(old).toBeDefined()
		expect(old!.groups.map((group) => group.descriptors[0]!.operation)).toContain('delete')
	})

	it('does not correlate a multi-heading ambiguous gap by position', () => {
		const sections = sectionsOf(
			'# Start\n\nstable start\n\n# Removed\n\nremove one\n\nremove two\n\n# Old\n\nstable anchor\n\nold value\n\n# End\n\nstable end',
			'# Start\n\nstable start\n\n# Inserted\n\nfresh\n\n# New\n\nstable anchor\n\nnew value\n\n# End\n\nstable end',
		)
		const inserted = sections.find(({ title }) => title === 'Inserted')
		const removed = sections.find(({ title }) => title === 'Removed')

		expect(inserted).toBeDefined()
		expect(inserted!.groups.map((group) => group.descriptors[0]!.operation)).not.toContain('delete')
		expect(removed).toBeDefined()
		expect(removed!.groups.map((group) => group.descriptors[0]!.operation)).toContain('delete')
	})

	it('does not correlate two renamed headings only because their counts match', () => {
		const sections = sectionsOf(
			'# Start\n\nstable start\n\n# Old one\n\nremove one\n\nstable anchor one\n\nold value one\n\n# Old two\n\nremove two\n\nstable anchor two\n\nold value two\n\n# End\n\nstable end',
			'# Start\n\nstable start\n\n# New one\n\nstable anchor one\n\nnew value one\n\n# New two\n\nstable anchor two\n\nnew value two\n\n# End\n\nstable end',
		)
		const titles = sections.map(({ title }) => title)

		expect(titles).toEqual(expect.arrayContaining(['Old one', 'Old two', 'New one', 'New two']))
		expect(sections.find(({ title }) => title === 'Old one')!.groups
			.some((group) => group.descriptors[0]!.operation === 'delete')).toBe(true)
		expect(sections.find(({ title }) => title === 'New one')!.groups
			.some((group) => group.descriptors[0]!.operation === 'delete')).toBe(false)
	})

	it('correlates a renamed heading instead of splitting it in three', () => {
		// The heading change and the replacement resolve from After as New, the
		// delete from Before as Old. Correlating only on title would report New,
		// Old, New for what is one section under a new name.
		const sections = sectionsOf(
			'# Old\n\nremove me\n\nstable anchor\n\nold value',
			'# New\n\nstable anchor\n\nnew value',
		)
		expect(sections.map(({ title }) => title)).toEqual(['New'])
	})

	it('keeps a delete and a replace under one heading in the same section', () => {
		// The delete resolves from Before and the replace from After. If the key
		// carried the document side, one unchanged heading would split into two
		// sections with the same title.
		const sections = sectionsOf(
			'# Alpha\n\nremove me\n\nstable anchor\n\nold value',
			'# Alpha\n\nstable anchor\n\nnew value',
		)
		expect(sections).toHaveLength(1)
		expect(sections[0]!.title).toBe('Alpha')
		expect(sections[0]!.groups.map((group) => group.descriptors[0]!.operation))
			.toEqual(expect.arrayContaining(['delete', 'replace']))
	})

	it('keeps a repeated heading separate even when nothing changed between them', () => {
		// The middle section produces no group, so the two Alpha runs become
		// adjacent. Matching on heading text alone merges them into one section
		// spanning two different places in the document; matching on which
		// heading does not.
		const sections = sectionsOf(
			'# Alpha\n\nalpha one\n\n# Beta\n\nbeta same\n\n# Alpha\n\nalpha two',
			'# Alpha\n\nalpha ONE\n\n# Beta\n\nbeta same\n\n# Alpha\n\nalpha TWO',
		)
		expect(sections.map(({ title }) => title)).toEqual(['Alpha', 'Alpha'])
		expect(new Set(sections.map(({ id }) => id)).size).toBe(2)
	})

	it('keeps a repeated heading as separate runs rather than one merged section', () => {
		const sections = sectionsOf(
			'# Alpha\n\nalpha one\n\n# Beta\n\nbeta one\n\n# Alpha\n\nalpha two',
			'# Alpha\n\nalpha five\n\n# Beta\n\nbeta five\n\n# Alpha\n\nalpha nine',
		)
		expect(sections.map(({ title }) => title)).toEqual(['Alpha', 'Beta', 'Alpha'])
		expect(sections.filter(({ title }) => title === 'Alpha')).toHaveLength(2)
		expect(new Set(sections.map(({ id }) => id)).size).toBe(3)
	})

	it('leaves changes above the first heading without a section title', () => {
		const sections = sectionsOf(
			'intro before\n\n# Alpha\n\nalpha one',
			'intro after\n\n# Alpha\n\nalpha two',
		)
		expect(sections.map(({ title }) => title)).toEqual(['', 'Alpha'])
	})

	it('reports the kinds in stable order and the first group ID', () => {
		const [section, ...rest] = sectionsOf(
			'# Alpha\n\nplain text\n\nsecond line',
			'# Alpha\n\nplain **text**\n\nsecond changed',
		)
		expect(rest).toEqual([])
		// Formatting changed first in the document, but kinds keep presentation order.
		expect(section!.kinds).toEqual(['content', 'formatting'])
		expect(section!.groups).toHaveLength(2)
		expect(section!.id).toBe(section!.groups[0]!.id)
	})

	it('derives section kinds from grouped descriptors', () => {
		const [section, ...rest] = sectionsOf(
			'# Alpha\n\none alpha two beta three',
			'# Alpha\n\none gamma two delta three',
		)
		expect(rest).toEqual([])
		expect(section!.groups).toHaveLength(1)
		expect(section!.groups[0]!.descriptors).toHaveLength(2)
		expect(section!.kinds).toEqual(['content'])
	})
})

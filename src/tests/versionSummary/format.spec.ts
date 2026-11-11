/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { describe, expect, it } from 'vitest'
import { parseSummary } from '../../versionSummary/format.ts'

describe('parseSummary', () => {
	it('splits the gist from the changes grouped under their names', () => {
		const summary = 'The launch moves two weeks later, from 12 to 26 March.\n\nTimeline\n- Build ends 12 March instead of 26 February.\n\nBudget:\n- 48,000 EUR to 55,000 EUR.\n- 4,000 EUR for the agency.'

		expect(parseSummary(summary)).toEqual({
			gist: ['The launch moves two weeks later, from 12 to 26 March.'],
			groups: [
				{ label: 'Timeline', paragraphs: [], items: ['Build ends 12 March instead of 26 February.'] },
				{ label: 'Budget', paragraphs: [], items: ['48,000 EUR to 55,000 EUR.', '4,000 EUR for the agency.'] },
			],
		})
	})

	it('keeps a gist alone, and the changes right under it without a name', () => {
		expect(parseSummary('Only spelling fixes.')).toEqual({ gist: ['Only spelling fixes.'], groups: [] })
		expect(parseSummary('Locks no longer expire.\n- Locks expired after 30 minutes; now an admin removes them.').groups)
			.toEqual([{ paragraphs: [], items: ['Locks expired after 30 minutes; now an admin removes them.'] }])
	})

	it('shows a list without a gist as one group', () => {
		expect(parseSummary('- The pilot runs 3 weeks.\n* Lunch is at 12:30.')).toEqual({
			gist: [],
			groups: [{ paragraphs: [], items: ['The pilot runs 3 weeks.', 'Lunch is at 12:30.'] }],
		})
	})

	it('drops Markdown the answer should not have, and keeps a closing line', () => {
		expect(parseSummary('**Rent goes up.**\n\n## Rent\n- From **850 EUR** to 920 EUR.\nAlso: spelling fixes.')).toEqual({
			gist: ['Rent goes up.'],
			groups: [
				{ label: 'Rent', paragraphs: [], items: ['From 850 EUR to 920 EUR.'] },
				{ paragraphs: ['Also: spelling fixes.'], items: [] },
			],
		})
	})

	it('keeps a second opening sentence in the gist when items follow it', () => {
		expect(parseSummary('The budget grows by 10%.\nThe deadline moves to May.\n- Budget: 100 to 110\n- Deadline: April to May')).toEqual({
			gist: ['The budget grows by 10%.', 'The deadline moves to May.'],
			groups: [{ paragraphs: [], items: ['Budget: 100 to 110', 'Deadline: April to May'] }],
		})
	})

	it('keeps values that only look like emphasis', () => {
		expect(parseSummary('- Limit changed from 2**10 to 2**12.\n- __init__.py moved.').groups[0]!.items)
			.toEqual(['Limit changed from 2**10 to 2**12.', '__init__.py moved.'])
	})
})

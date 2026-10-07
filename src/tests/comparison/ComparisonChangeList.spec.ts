/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { afterAll, describe, expect, it } from 'vitest'
import ComparisonChangeList from '../../components/ComparisonChangeList.vue'
import { compareDocuments } from '../../comparison/compare.ts'
import { createComparisonEditor } from '../../comparison/editor.ts'

const before = createComparisonEditor('# Intro\n\nHello world\n\n# Tasks\n\n- [ ] Buy milk\n\nRemoved here')
const after = createComparisonEditor('# Intro\n\nHello there\n\n# Tasks\n\n- [x] Buy milk')
const changes = compareDocuments(before.state.doc, after.state.doc)

afterAll(() => {
	before.destroy()
	after.destroy()
})

function mountList(currentId: string | null = null) {
	return mount(ComparisonChangeList, {
		props: { changes, currentId, beforeDocument: before.state.doc, afterDocument: after.state.doc },
	})
}

describe('ComparisonChangeList', () => {
	it('groups changes under the heading they belong to', () => {
		const wrapper = mountList()

		expect(wrapper.findAll('.text-comparison__section-title').map((title) => title.text()))
			.toEqual(['Intro', 'Tasks'])
		expect(wrapper.findAll('.text-comparison__change strong').map((label) => label.text()))
			.toEqual(['Text changed', 'Task state changed', 'Paragraph removed'])
	})

	it('shows before and after previews', () => {
		const rows = mountList().findAll('.text-comparison__change')

		expect(rows[0]!.find('del').text()).toBe('world')
		expect(rows[0]!.find('ins').text()).toBe('there')
		expect(rows[1]!.find('.text-comparison__change-preview').text()).toBe('Buy milk')
		expect(rows[2]!.find('del').text()).toBe('Removed here')
		expect(rows[2]!.find('ins').exists()).toBe(false)
	})

	it('marks the current change and emits the selected one', async () => {
		const wrapper = mountList(changes[1]!.id)

		expect(wrapper.find('[aria-current="true"]').attributes('data-comparison-select')).toBe(changes[1]!.id)
		await wrapper.findAll('.text-comparison__change')[2]!.trigger('click')
		expect(wrapper.emitted('select')).toEqual([[changes[2]!.id]])
	})
})

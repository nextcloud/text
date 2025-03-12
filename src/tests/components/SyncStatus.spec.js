/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SyncStatus from '../../components/Editor/DocumentStatus/SyncStatus.vue'
import { ERROR_TYPE } from '../../services/SyncService.js'

const FLAGS = ['idle', 'hasConnectionIssue']

test('is empty without props', () => {
	const wrapper = shallowMount(SyncStatus)
	expect(wrapper.contains('p')).toBe(false)
	expect(wrapper.html()).toBe('')
})

FLAGS.forEach(flag => {
	test(`renders ${flag}`, () => {
		const wrapper = shallowMount(SyncStatus, {
			propsData: { [flag]: true },
		})
		expect(wrapper.html()).toMatchSnapshot()
	})
})

Object.values(ERROR_TYPE).forEach(type => {
	test(`renders sync error ${type}`, () => {
		const data = {
			data: { error: 'Error Message goes here' },
			status: 412,
		}
		const wrapper = shallowMount(SyncStatus, {
			propsData: { syncError: { type, data } },
		})
		expect(wrapper.html()).toMatchSnapshot()
	})
})

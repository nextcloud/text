/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { loadState } from '@nextcloud/initial-state'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import VersionSummariesSettings from '../../views/VersionSummariesSettings.vue'

vi.mock('@nextcloud/initial-state', () => ({ loadState: vi.fn() }))

// Mount the settings as the server described them
function mountSettings(enabled: boolean, provider: string | null, fields: Record<string, unknown> = {}) {
	vi.mocked(loadState).mockReturnValue({ enabled, provider, hourlyLimit: 60, userHourlyLimit: 10, startedLastHour: 3, maxInputBytes: 240_000, removalPending: false, ...fields })
	return mount(VersionSummariesSettings)
}

// The server's answer to a change
function saved(fields: Record<string, unknown>) {
	return { data: { ocs: { data: { enabled: true, hourlyLimit: 60, userHourlyLimit: 10, removed: null, ...fields } } } }
}

afterEach(() => {
	vi.restoreAllMocks()
})

describe('VersionSummariesSettings', () => {
	it('names the provider as it is written', () => {
		const wrapper = mountSettings(true, 'Smith & Sons <AI>')

		expect(wrapper.text()).toContain('AI provider: Smith & Sons <AI>')
	})

	it('keeps a limit edited while its earlier value was being saved', async () => {
		let answer!: (value: unknown) => void
		vi.spyOn(axios, 'put').mockReturnValueOnce(new Promise((resolve) => {
			answer = resolve
		}) as never)
		const wrapper = mountSettings(true, 'LocalAI')
		const [instance] = wrapper.findAll('input[type="number"]')

		await instance!.setValue('20')
		;(instance!.element as HTMLInputElement).value = '5'
		await instance!.trigger('input')
		answer(saved({ hourlyLimit: 20 }))
		await flushPromises()

		expect((instance!.element as HTMLInputElement).value).toBe('5')
	})

	it('keeps the stored limit when the field is left empty', async () => {
		const put = vi.spyOn(axios, 'put')
		const wrapper = mountSettings(true, 'LocalAI')
		const [instance] = wrapper.findAll('input[type="number"]')

		await instance!.setValue('')
		await flushPromises()
		await instance!.trigger('change')
		await flushPromises()

		expect(put).not.toHaveBeenCalledWith(expect.anything(), { hourlyLimit: 0 })
		expect(wrapper.findAllComponents({ name: 'NcInputField' })[0]!.props('modelValue')).toBe('60')
	})

	it('counts the instructions in the size both versions may have', () => {
		const wrapper = mountSettings(true, 'LocalAI')

		expect(wrapper.text()).toContain('Both versions and the instructions together may have at most')
	})

	it('shows the switch as stored, and takes no second change while saving', async () => {
		let answer!: (value: unknown) => void
		const put = vi.spyOn(axios, 'put').mockReturnValueOnce(new Promise((resolve) => {
			answer = resolve
		}) as never)
		const wrapper = mountSettings(false, 'LocalAI')

		await wrapper.find('input[type="checkbox"]').setValue(true)
		expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined()
		answer(saved({ enabled: false }))
		await flushPromises()

		expect(put).toHaveBeenCalledTimes(1)
		expect(wrapper.find('input[type="checkbox"]').element).toHaveProperty('checked', false)
	})
})

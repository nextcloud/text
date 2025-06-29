/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { test as baseTest, expect } from 'vitest'
import RichTextReader from '../../components/RichTextReader.vue'
import { nextTick } from 'vue'

const test = baseTest.extend({
	content: ({ task: _ }, use) => use(''),
	wrapper: async ({ content }, use) => {
		const wrapper = mount(RichTextReader, { propsData: { content } })
		await nextTick()
		await use(wrapper)
		wrapper.destroy()
	}
})

test.scoped({ content: '# Hello world\n\n[this is a link](https://nextcloud.com)' })
test('renders markdown', async ({ wrapper }) => {
	expect(wrapper.get('h1').text()).toBe('#Hello world') // # is the heading anchor
	expect(wrapper.get('a[href="https://nextcloud.com"]').text()).toBe('this is a link')
})

test('updates markdown', async ({ wrapper }) => {
	await wrapper.setProps({ content: '## Hello world' })
	expect(wrapper.get('h2').text()).toBe('#Hello world') // # is the heading anchor
	expect(wrapper.find('a[href="https://nextcloud.com"]').exists()).toBeFalsy()
})

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import RichTextReader from '../../components/RichTextReader.vue'
import { nextTick } from 'vue'

const content = '# Hello world\n\n[this is a link](https://nextcloud.com)'
test('renders markdown', async () => {
	const wrapper = mount(RichTextReader, {
		propsData: { content },
	})
	await nextTick()
	expect(wrapper.get('h1').text()).toBe('#Hello world') // # is the heading anchor
	expect(wrapper.get('a[href="https://nextcloud.com"]').text()).toBe('this is a link')
	wrapper.destroy()
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, inject, ref } from 'vue'
import { ATTACHMENT_RESOLVER } from '../../components/Editor.provider.ts'
import { useComparisonAttachments } from '../../composables/useComparisonAttachments.ts'

vi.mock('@nextcloud/auth', async (importOriginal) => ({ ...await importOriginal<object>(), getCurrentUser: () => ({ uid: 'alice' }) }))

describe('useComparisonAttachments', () => {
	it('resolves relative images from the folder of the file, once its path is known', async () => {
		const path = ref<string>()
		let resolver: { value: { resolve: (src: string) => Promise<{ fullUrl: string }> } } | undefined
		const child = defineComponent({
			setup() {
				resolver = inject(ATTACHMENT_RESOLVER)
				return () => h('div')
			},
		})
		const wrapper = mount(defineComponent({
			setup() {
				useComparisonAttachments({ fileId: 7, filePath: path })
				return () => h(child)
			},
		}))
		path.value = '/Notes/plan.md'

		const { fullUrl } = await resolver!.value.resolve('diagram.png')
		expect(fullUrl).toContain('/Notes/diagram.png')
		wrapper.unmount()
	})
})

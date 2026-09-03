/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import MarkdownSourceFallback from '../../components/MarkdownSourceFallback.vue'

vi.mock('../../comparison/markdownSourceComparison.ts', () => {
	throw new Error('enhanced Source is unavailable')
})

describe('complete Markdown source fallback', () => {
	it('always renders both complete snapshots as inert literal text with visible controls', () => {
		const wrapper = mount(MarkdownSourceFallback, {
			props: {
				beforeContent: '<script>globalThis.pwned = true</script>\nzero\u200Bwidth',
				afterContent: '<img src=x onerror=alert(1)>\nlast',
			},
		})
		const sources = wrapper.findAll('pre code')
		expect(sources).toHaveLength(2)
		expect(sources[0]!.text()).toContain('<script>globalThis.pwned = true</script>')
		expect(sources[0]!.text()).toContain('⟦ZWSP⟧')
		expect(sources[1]!.text()).toContain('<img src=x onerror=alert(1)>')
		expect(wrapper.find('script').exists()).toBe(false)
		expect(wrapper.find('img').exists()).toBe(false)
	})
})

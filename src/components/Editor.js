/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineComponent, h, nextTick, ref, watch } from 'vue'
import Editor from './Editor.vue'

export default defineComponent({
	emits: ['focus'],
	props: Editor.props,
	setup(props, { attrs, emit, slots }) {
		const reloading = ref(false)
		watch(reloading, (val) => {
			if (val) {
				nextTick(() => {
					reloading.value = false
				})
			}
		})
		return () =>
			!reloading.value
			&& h(Editor, {
				attrs,
				props,
				on: {
					focus: () => emit('focus'),
					reload: () => (reloading.value = true),
				},
				scopedSlots: slots,
			})
	},
})

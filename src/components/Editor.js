/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineComponent, h, nextTick, ref, watch } from 'vue'
import Editor from './Editor.vue'

export default defineComponent({
	emits: ['focus', 'ready'],
	props: Editor.props,
	setup(props, { attrs, emit }) {
		const reloading = ref(false)
		const localChange = ref('')
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
				props: {
					...props,
					localChange: localChange.value,
				},
				on: {
					focus: () => emit('focus'),
					ready: () => emit('ready'),
					reload: (change) => {
						localChange.value = change
						reloading.value = true
					},
					resolved: () => {
						localChange.value = ''
					},
				},
			})
	},
})

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp, defineComponent, h } from 'vue'
import ViewerComponent from '../components/ViewerComponent.vue'

// The vue instance used inside text constructed with the import above.
let innerApp

/**
 * This thin Component wrapper can be rendered inside the viewer.
 *
 * The viewers vue instance is used for this component as it simply exports
 * the options for the options api.
 *
 * When mounted this component constructs the vue instance
 * used inside text based on texts vue import.
 */
export default defineComponent({
	name: 'ViewerView',
	render: (h) => h('div', { style: { display: 'contents' } }),
	props: ViewerComponent.props,
	mounted() {
		innerApp = createApp({
			render: () => h(ViewerComponent, {
				...this.$props,
				...this.$attrs,
				onLoadedHandler: () => this.$emit('update:loaded', true)
			}),
		})
		innerApp.mount(this.$el)
	},
	beforeUnmount() {
		innerApp.unmount()
		innerApp = undefined
	},
})

/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue, { defineComponent } from 'vue'
import ViewerComponent from '../components/ViewerComponent.vue'

// The vue instance used inside text constructed with the import above.
let innerVue

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
	render: (h) => h('div'),
	props: ViewerComponent.props,
	mounted() {
		innerVue = new Vue({
			render: (h) => {
				return h(ViewerComponent, {
					attrs: this.$attrs,
					props: this.$props,
					on: this.$listeners,
				})
			},
		})
		innerVue.$mount(this.$el)
	},
	beforeDestroy() {
		innerVue.$destroy()
	},
})

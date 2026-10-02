/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { createApp, defineComponent } from 'vue'
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
	inheritAttrs: false,
	data() {
		return {
			hasLoaded: false,
		}
	},

	watch: {
		// Viewer creates a new file object when the same file is opened again,
		// e.g. for a version comparison, and resets its loaded flag while its
		// component is kept. Report loaded again in that case.
		'$attrs.loaded': function(loaded) {
			if (!loaded && this.hasLoaded) {
				this.$emit('update:loaded', true)
			}
		},
	},

	mounted() {
		innerApp = createApp(ViewerComponent, {
			...this.$props,
			...this.$attrs,
			onLoadedHandler: () => {
				this.hasLoaded = true
				this.$emit('update:loaded', true)
			},
		})
		innerApp.mount(this.$el)
	},
	// Viewer still uses Vue 2
	beforeDestroy() {
		innerApp.unmount()
		innerApp = undefined
	},
	// Once Viewer migrated to Vue 3
	beforeUnmount() {
		innerApp.unmount()
		innerApp = undefined
	},
})

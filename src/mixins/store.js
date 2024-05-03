/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import store, { textModule } from '../store/index.js'

/**
 * This mixin is required since we cannot be sure that the root Vue instance has
 * registered the global store. This might be the case if the text app components
 * are mounted in other apps e.g. viewer
 */
export default {
	data() {
		return {
			$store: store,
		}
	},
	beforeMount() {
		if (typeof this.$store === 'undefined') {
			// Store is undefined, e.g. when used through `viewer.js`
			this.$store = store
		} else if (!this.$store.hasModule('text')) {
			// Store lacks text modul (another store exists), e.g. when used as component via NPM package
			this.$store.registerModule('text', textModule)
		}
	},
}

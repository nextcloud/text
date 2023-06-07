/*
 * @copyright Copyright (c) 2021 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
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

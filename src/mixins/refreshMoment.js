/*
 * @copyright Copyright (c) 2023 Max <max@nextcloud.com>
 *
 * @author Max <max@nextcloud.com>
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

/* moment.js displays intervals as "Some seconds ago" and the like.
 * Use `this.refreshMoment` in a computed to live update these.
 *
 * Updates happen every 20 seconds as that is enough
 * given the granularity of moment.js
 */
export default {

	data() {
		return {
			refreshMoment: 0,
		}
	},

	mounted() {
		this.$refreshInterval = setInterval(() => {
			this.refreshMoment++
		}, 20000)
	},

	beforeDestroy() {
		clearInterval(this.$refreshInterval)
	},

}

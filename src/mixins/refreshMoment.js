/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
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

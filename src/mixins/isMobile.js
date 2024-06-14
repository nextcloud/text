/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import debounce from 'debounce'

const getClientWidth = () => document.documentElement.clientWidth
const isMobile = () => getClientWidth() < 768

export default {
	data() {
		return {
			isMobile: isMobile(),
		}
	},
	beforeMount() {
		this.$onResize = debounce(() => {
			this.isMobile = isMobile()
		}, 100)

		window.addEventListener('resize', this.$onResize)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.$onResize)
	},
}

/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export const MENU_ID = Symbol('menu::id')

export const useMenuIDMixin = {
	inject: {
		$menuID: { from: MENU_ID, default: null },
	},
	computed: {
		menuIDSelector() {
			return `#${this.$menuID}`
		},
	},
}

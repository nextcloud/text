/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import store from './store/index.js'
// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

if (document.getElementById('app-content')) {
	Promise.all([
		import(/* webpackChunkName: "editor" */'vue'),
		import(/* webpackChunkName: "editor" */'./views/DirectEditing.vue'),
	]).then((imports) => {
		const Vue = imports[0].default
		Vue.prototype.t = window.t
		Vue.prototype.OCA = window.OCA
		const DirectEditing = imports[1].default
		const vm = new Vue({
			render: h => h(DirectEditing),
			store,
		})
		vm.$mount(document.getElementById('app-content'))
	})
}

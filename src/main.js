/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'
import Vue from 'vue'
import DirectEditing from './views/DirectEditing.vue'

Vue.prototype.t = window.t
Vue.prototype.OCA = window.OCA

const instance = Vue.extend(DirectEditing)
instance.$mount({ el: '#app-content' })

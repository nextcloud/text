/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'
import './testHelpers/jsdomMocks.js'
import './testHelpers/nextcloudMocks.js'

Vue.prototype.t = global.t
Vue.prototype.n = global.n
Vue.prototype.OC = global.OC
Vue.prototype.OCA = global.OCA
// suppress errors from not-explicitly-imported @nc-vue component
global.appName = 'text'

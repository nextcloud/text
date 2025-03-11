/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import './testHelpers/jsdomMocks.js'
import './testHelpers/nextcloudMocks.js'
import './testHelpers/vueMocks.js'
import Vue from 'vue'

Vue.prototype.t = global.t
Vue.prototype.n = global.n
Vue.prototype.OC = global.OC
Vue.prototype.OCA = global.OCA

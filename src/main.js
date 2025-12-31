/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'
import DirectEditing from './views/DirectEditing.vue'

const DirectView = Vue.extend(DirectEditing)
new DirectView().$mount('#app-content')

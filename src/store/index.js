/*
 * @copyright Copyright (c) 2020 Julius Härtl <jus@bitgrid.net>
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

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { getBuilder } from '@nextcloud/browser-storage'

import {
	SET_SHOW_AUTHOR_ANNOTATIONS,
	SET_CURRENT_SESSION,
	SET_VIEW_WIDTH,
} from './mutation-types.js'
import plugin, { getClientWidth } from './plugin.js'

const persistentStorage = getBuilder('text').persist().build()

Vue.use(Vuex)

const store = new Store({
	plugins: [plugin],
	state: {
		showAuthorAnnotations: persistentStorage.getItem('showAuthorAnnotations') === 'true',
		currentSession: persistentStorage.getItem('currentSession'),
		viewWidth: getClientWidth(),
	},
	mutations: {
		[SET_VIEW_WIDTH](state, value) {
			state.viewWidth = value
		},
		[SET_SHOW_AUTHOR_ANNOTATIONS](state, value) {
			state.showAuthorAnnotations = value
			persistentStorage.setItem('showAuthorAnnotations', '' + value)
		},
		[SET_CURRENT_SESSION](state, value) {
			state.currentSession = value
			persistentStorage.setItem('currentSession', value)
		},
	},
	getters: {
		isMobileView({ viewWidth }) {
			return viewWidth < 768
		},
	},
	actions: {
		setShowAuthorAnnotations({ commit }, value) {
			commit(SET_SHOW_AUTHOR_ANNOTATIONS, value)
		},
		setCurrentSession({ commit }, value) {
			commit(SET_CURRENT_SESSION, value)
		},
	},
})

export default store

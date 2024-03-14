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
import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

import {
	SET_SHOW_AUTHOR_ANNOTATIONS,
	SET_VIEW_WIDTH,
	SET_HEADINGS,
	SET_ATTACHMENT_LIST,
} from './mutation-types.js'
import plugin, { getClientWidth } from './plugin.js'

const persistentStorage = getBuilder('text').persist().build()

Vue.use(Vuex)

export const textModule = {
	state: {
		showAuthorAnnotations: persistentStorage.getItem('showAuthorAnnotations') === 'true',
		viewWidth: getClientWidth(),
		headings: Object.freeze([]),
		attachmentList: [],
	},
	getters: {
		imageAttachments: (state) => state.attachmentList.filter(a => a.isImage),
		findAttachment: (state) => (fileName) => state.attachmentList.find(a => a.name === fileName),
	},
	mutations: {
		[SET_VIEW_WIDTH](state, value) {
			state.viewWidth = value
		},
		[SET_SHOW_AUTHOR_ANNOTATIONS](state, value) {
			state.showAuthorAnnotations = value
			persistentStorage.setItem('showAuthorAnnotations', '' + value)
		},
		[SET_HEADINGS](state, value) {
			if (state.headings.length !== value.length) {
				state.headings = Object.freeze(value)
				return
			}

			// merge with previous position
			const old = state.headings
			const headings = value.map((row, index) => {
				const previous = old[index].level

				return Object.freeze({
					...row,
					previous,
				})
			})

			state.headings = Object.freeze(headings)
		},
		[SET_ATTACHMENT_LIST](state, value) {
			state.attachmentList = value
		},
	},
	actions: {
		setShowAuthorAnnotations({ commit }, value) {
			commit(SET_SHOW_AUTHOR_ANNOTATIONS, value)
		},
		setHeadings({ commit }, value) {
			commit(SET_HEADINGS, value)
		},
		async setAttachmentList({ commit }, { documentId, session, shareToken }) {
			const response = await axios.post(generateUrl('/apps/text/attachments'), {
				documentId: session?.documentId ?? documentId,
				sessionId: session?.id,
				sessionToken: session?.token,
				shareToken,
			})

			commit(SET_ATTACHMENT_LIST, response.data)
		},
	},
}

const store = new Store({
	plugins: [plugin],
	modules: {
		text: {
			namespaced: true,
			...textModule,
		},
	},
})

export default store

/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

import {
	SET_VIEW_WIDTH,
	SET_HEADINGS,
	SET_ATTACHMENT_LIST,
} from './mutation-types.js'
import plugin, { getClientWidth } from './plugin.js'

Vue.use(Vuex)

export const textModule = {
	state: {
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

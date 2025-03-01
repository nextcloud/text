/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { generateUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'

import {
	SET_ATTACHMENT_LIST,
} from './mutation-types.js'

Vue.use(Vuex)

export const textModule = {
	state: {
		attachmentList: [],
	},
	getters: {
		findAttachment: (state) => (fileName) => state.attachmentList.find(a => a.name === fileName),
	},
	mutations: {
		[SET_ATTACHMENT_LIST](state, value) {
			state.attachmentList = value
		},
	},
	actions: {
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
	modules: {
		text: {
			namespaced: true,
			...textModule,
		},
	},
})

export default store

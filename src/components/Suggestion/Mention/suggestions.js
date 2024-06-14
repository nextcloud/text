/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import MentionList from './MentionList.vue'
import createSuggestions from '../suggestions.js'

const USERS_LIST_ENDPOINT_URL = generateUrl('apps/text/api/v1/users')

const emitMention = ({ session, props }) => {
	const documentId = session.documentId
	axios.put(generateUrl(`apps/text/session/${documentId}/mention`), {
		documentId,
		sessionId: session.id,
		sessionToken: session.token,
		mention: props.id,
	})
}

export default ({ session, params }) => createSuggestions({
	listComponent: MentionList,
	items: async ({ query }) => {
		const params = {
			documentId: session.documentId,
			sessionId: session.id,
			sessionToken: session.token,
			filter: query,
		}
		const response = await axios.post(USERS_LIST_ENDPOINT_URL, params)
		const users = JSON.parse(JSON.stringify(response.data))
		const result = []

		Object.keys(users).map(key => result.push({
			id: key,
			label: users[key],
		}))

		return result
	},

	command: ({ editor, range, props }) => {
		if (params?.emitMention) {
			params.emitMention({ props })
		} else {
			emitMention({
				session,
				props,
			})
		}

		// Insert mention
		// from https://github.com/ueberdosis/tiptap/blob/9a254bf9daf6d839bd02c968e14837098b903b38/packages/extension-mention/src/mention.ts

		// increase range.to by one when the next node is of type "text"
		// and starts with a space character
		const nodeAfter = editor.view.state.selection.$to.nodeAfter
		const overrideSpace = nodeAfter?.text?.startsWith(' ')

		if (overrideSpace) {
			range.to += 1
		}

		editor
			.chain()
			.focus()
			.insertContentAt(range, [
				{
					type: 'mention',
					attrs: props,
				},
				{
					type: 'text',
					text: ' ',
				},
			])
			.run()

		window.getSelection()?.collapseToEnd()
	},
	...params,
})

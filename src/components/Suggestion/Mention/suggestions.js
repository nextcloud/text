/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import MentionList from './MentionList.vue'
import createSuggestions from '../suggestions.js'
import { unref } from 'vue'

const USERS_LIST_ENDPOINT_URL = generateUrl('apps/text/api/v1/users')

const emitMention = ({ connection, props }) => {
	const { documentId, sessionId, sessionToken } = unref(connection) ?? {}
	if (!documentId) {
		// TODO: emit the mention on reconnect
		console.warn('Disconnected. Could not notify user about mention.', { user: props.id })
		return
	}
	axios.put(generateUrl(`apps/text/session/${documentId}/mention`), {
		documentId,
		sessionId,
		sessionToken,
		mention: props.id,
		scope: window.location,
	})
}

export default ({ connection, options } = {}) => createSuggestions({
	listComponent: MentionList,
	items: async ({ query }) => {
		const { documentId, sessionId, sessionToken } = unref(connection) ?? {}
		if (!documentId) {
			// looks like we're not connected right now.
			return []
		}
		const params = {
			documentId,
			sessionId,
			sessionToken,
			filter: query,
		}
		const response = await axios.post(USERS_LIST_ENDPOINT_URL, params)
		const users = JSON.parse(JSON.stringify(response.data))
		return Object.entries(users).map(([id, label]) => ({ id, label }))
	},

	command: ({ editor, range, props }) => {
		if (options?.emitMention) {
			options.emitMention({ props })
		} else {
			emitMention({
				connection,
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
	...options,
})

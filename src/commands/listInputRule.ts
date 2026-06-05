/**
 * SPDX-FileCopyrightText: 2021 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import type { NodeType } from '@tiptap/pm/model'

import { InputRule, wrappingInputRule } from '@tiptap/core'

type FindType = Parameters<typeof wrappingInputRule>[0]['find']
type GetAttributesType = Parameters<typeof wrappingInputRule>[0]['getAttributes']
type HandlerType = ConstructorParameters<typeof InputRule>[0]['handler']

/**
 * Wrapping input handler that will append the content of the last match
 *
 * @param find find param for the wrapping input rule
 * @param type Node Type object
 * @param getAttributes handler to get the attributes
 */
export default function(find: FindType, type: NodeType, getAttributes: GetAttributesType = null) {
	const handler: HandlerType = (props) => {
		const wrap = wrappingInputRule({ find, type, getAttributes })
		wrap.handler(props)
		// Insert the first character after bullet if there is one
		if (props.match.length >= 3) {
			props.state.tr.insertText(props.match[2])
		}
	}
	return new InputRule({ find, handler })
}

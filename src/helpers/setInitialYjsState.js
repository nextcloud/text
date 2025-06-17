/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import escapeHtml from 'escape-html'
import markdownit from '../markdownit/index.js'
import { Doc, encodeStateAsUpdate, XmlFragment, applyUpdate } from 'yjs'
import { generateJSON } from '@tiptap/core'
import { prosemirrorToYXmlFragment } from 'y-prosemirror'
import { Node } from '@tiptap/pm/model'
import { createRichEditor, createPlainEditor } from '../EditorFactory.js'

export const setInitialYjsState = (ydoc, content, { isRichEditor }) => {
	const html = isRichEditor
		? markdownit.render(content) + '<p/>'
		: `<pre>${escapeHtml(content)}</pre>`

	const editor = isRichEditor ? createRichEditor() : createPlainEditor()

	const json = generateJSON(html, editor.options.extensions)

	const node = Node.fromJSON(editor.schema, json)
	const getBaseDoc = (node) => {
		const baseDoc = new Doc()
		// In order to make the initial document state idempotent, we need to reset the clientID
		// While this is not recommended, we cannot avoid it here as we lack another mechanism
		// to generate the initial state on the server side
		// The only other option to avoid this could be to generate the initial state once and push
		// it to the server immediately, however this would require read only sessions to be able
		// to still push a state
		baseDoc.clientID = 0
		const type = /** @type {XmlFragment} */ (baseDoc.get('default', XmlFragment))
		if (!type.doc) {
			// This should not happen but is aligned with the upstream implementation
			// https://github.com/yjs/y-prosemirror/blob/8db24263770c2baaccb08e08ea9ef92dbcf8a9da/src/lib.js#L209
			return baseDoc
		}

		prosemirrorToYXmlFragment(node, type)
		return baseDoc
	}

	const baseUpdate = encodeStateAsUpdate(getBaseDoc(node))
	applyUpdate(ydoc, baseUpdate)
}

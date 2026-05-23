/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Collaboration } from '@tiptap/extension-collaboration'
import escapeHtml from 'escape-html'
import { applyUpdate, Doc, encodeStateAsUpdate, encodeStateVector } from 'yjs'
import { createPlainEditor, createRichEditor } from '../EditorFactory.js'
import markdownit from '../markdownit/index.js'

/**
 *
 * @param baseDoc
 * @param content
 * @param root0
 * @param root0.isRichEditor
 */
export function updateFromContent(
	baseDoc: Doc,
	content: string,
	{ isRichEditor }: { isRichEditor: boolean },
): Uint8Array {
	// work on a copy
	const copy = new Doc()
	// we might still want to only apply this once
	// copy.clientID = 0
	applyUpdate(copy, encodeStateAsUpdate(baseDoc))
	setContent(copy, content, { isRichEditor })
	return encodeStateAsUpdate(copy, encodeStateVector(baseDoc))
}

/**
 *
 * @param doc
 * @param content
 * @param root0
 * @param root0.isRichEditor
 */
function setContent(
	doc: Doc,
	content: string,
	{ isRichEditor }: { isRichEditor: boolean },
) {
	const html = isRichEditor
		? markdownit.render(content) + '<p/>'
		: `<pre>\n${escapeHtml(content)}</pre>`
	const editor = isRichEditor
		? createRichEditor({
				extensions: [Collaboration.configure({ document: doc })],
			})
		: createPlainEditor({
				extensions: [Collaboration.configure({ document: doc })],
			})
	editor.commands.setContent(html)
}

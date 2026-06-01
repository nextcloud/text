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
 * Compute an update that changes baseDoc to have content
 *
 * @param baseDoc document to start with
 * @param content desired content of the final document
 * @param options options
 * @param options.isRichEditor use a rich editor for the content
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
 * Change the document to have the given content
 *
 * @param doc document to update
 * @param content desired content of the final document
 * @param options options
 * @param options.isRichEditor use a rich editor for the content
 */
function setContent(
	doc: Doc,
	content: string,
	{ isRichEditor }: { isRichEditor: boolean },
) {
	const html = isRichEditor
		? markdownit.render(content) + '<p/>'
		: `<pre>${escapeHtml(content)}</pre>`
	const editor = isRichEditor
		? createRichEditor({
				extensions: [Collaboration.configure({ document: doc })],
			})
		: createPlainEditor({
				extensions: [Collaboration.configure({ document: doc })],
			})
	editor.commands.setContent(html)
}

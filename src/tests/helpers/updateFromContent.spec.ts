/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { Collaboration } from '@tiptap/extension-collaboration'
import { describe, expect, it } from 'vitest'
import * as Y from 'yjs'
import type { Connection } from '../../composables/useConnection.js'
import { createRichEditor } from '../../EditorFactory.js'
import { createMarkdownSerializer } from '../../extensions/Markdown.js'
import { updateFromContent } from '../../helpers/updateFromContent'

describe('apply content', () => {
	it('applies content to an empty doc', () => {
		const ydoc = new Y.Doc()
		const content = '## Hello world'
		const update = updateFromContent(ydoc, content, { isRichEditor: true })
		expect(contentWithUpdates(Y.encodeStateAsUpdate(ydoc), update)).toBe(content)
	})

	it('applies content to a doc that already has content', () => {
		const ydoc = new Y.Doc()
		const initialContent = `
## Hello world

### Section one

Nothing to see here.

### Section two

Carry on!
`
		const changeOne = `
## Hello world

### Section one

Uh... wow!

### Section two

Carry on!
`
		const changeTwo = `
## Hello world

### Section one

Nothing to see here.

### Section two

What's that?
`

		const initialUpdate = updateFromContent(ydoc, initialContent, {
			isRichEditor: true,
		})
		Y.applyUpdate(ydoc, initialUpdate)
		const updateOne = updateFromContent(ydoc, changeOne, { isRichEditor: true })
		const updateTwo = updateFromContent(ydoc, changeTwo, { isRichEditor: true })
		expect(contentWithUpdates(initialUpdate, updateOne, updateTwo))
			.toMatchInlineSnapshot(`
				"## Hello world

				### Section one

				Uh... wow!

				### Section two

				What's that?"
			`)
	})
})

/**
 * Apply all updates to a new ydoc and return the markdown content
 * @param updates updates to apply
 */
function contentWithUpdates(...updates: Uint8Array[]) {
	const dummyConnection: Connection = {
		documentId: 123,
		sessionId: 234,
		sessionToken: 'token',
		baseVersionEtag: 'etag',
		filePath: '/file.md',
	}
	const ydoc = new Y.Doc()
	updates.forEach((update) => {
		Y.applyUpdate(ydoc, update)
	})
	const editor = createRichEditor({
		connection: dummyConnection,
		extensions: [Collaboration.configure({ document: ydoc })],
		relativePath: '',
	})
	const serializer = createMarkdownSerializer(editor.schema)
	return serializer.serialize(editor.state.doc)
}

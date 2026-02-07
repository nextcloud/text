/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Image from '../../nodes/Image.js'
import extractAttachmentSrcs from '../../plugins/extractAttachmentSrcs.ts'
import createCustomEditor from '../testHelpers/createCustomEditor.ts'

describe('extractAttachmentSrcs', () => {
	it('returns an empty array for an empty doc', () => {
		const doc = prepareDoc('')
		const attachmentSrcs = extractAttachmentSrcs(doc)
		expect(attachmentSrcs).toEqual([])
	})

	it('returns headings', () => {
		const content =
			'<figure><img src=".attachments.123/test.pdf"></figure><br><figure><img src=".attachments.456/test2.png"></figure>'
		const doc = prepareDoc(content)
		const attachmentSrcs = extractAttachmentSrcs(doc)
		expect(attachmentSrcs).toEqual([
			'.attachments.123/test.pdf',
			'.attachments.456/test2.png',
		])
	})

	it('ignores an empty src', () => {
		const content = '<img>'
		const doc = prepareDoc(content)
		const attachmentSrcs = extractAttachmentSrcs(doc)
		expect(attachmentSrcs).toEqual([])
	})
})

const prepareDoc = (content) => {
	const editor = createCustomEditor(content, [Image])
	const doc = editor.state.doc
	editor.destroy()
	return doc
}

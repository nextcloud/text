/**
 * SPDX-FileCopyrightText: 2022-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import AttachmentResolver from './../../services/AttachmentResolver.js'
import axios from '@nextcloud/axios'

const fileId = 4173
const sessionId = 456
const sessionToken = 'mySessionToken'
const a1name = 'group pic.jpg'
const a1nameEncoded = 'group%20pic.jpg'
const a2name = 'archive.tar.gz'
function initAttachmentResolver(args) {
	const attachmentList = [{
		fileId: 1234,
		name: a1name,
		size: '1 KB',
		mimetype: 'image/jpg',
		mtime: 1,
		isImage: true,
		fullUrl: `http://nextcloud.local/apps/text/image?documentId=${fileId}&sessionId=${sessionId}&sessionToken=${sessionToken}&imageFileName=${a1nameEncoded}&preferRawImage=1"`,
		previewUrl: `http://nextcloud.local/apps/text/image?documentId=${fileId}&sessionId=${sessionId}&sessionToken=${sessionToken}&imageFileName=${a1nameEncoded}"`
	}, {
		fileId: 1236,
		name: a2name,
		size: '1 KB',
		mimetype: 'application/gzip',
		mtime: 1,
		isImage: false,
		fullUrl: `http://nextcloud.local/apps/text/media?documentId=${fileId}&sessionId=${sessionId}&sessionToken=${sessionToken}&mediaFileName=${a2name}"`,
		previewUrl: `http://nextcloud.local/apps/text/mediaPreview?documentId=${fileId}&sessionId=${sessionId}&sessionToken=${sessionToken}&mediaFileName=${a2name}"`
	}]
	const axiosSpy = jest.spyOn(axios, 'post').mockReturnValue({ data: attachmentList })
	const resolver = new AttachmentResolver(args)
	expect(axiosSpy).toHaveBeenCalled()
	return resolver
}

describe('Image resolver', () => {

	const session = {
		documentId: fileId,
		id: sessionId,
		token: sessionToken,
	}
	const user = {
		uid: 'user-uid',
	}
	const currentDirectory = '/parentDir'
	const shareToken = 'myShareToken'

	it('is a class with one constructor argument', () => {
		const resolver = new AttachmentResolver({ fileId })
		expect(resolver).toBeInstanceOf(AttachmentResolver)
	})

	it('handles .attachments urls to own fileId via Text API', async () => {
		const src = `.attachments.${session.documentId}/${a1name}`
		const resolver = initAttachmentResolver({ session })
		const attachment = await resolver.resolve(src)
		expect(attachment.isImage).toBe(true)
		expect(attachment.name).toBe(a1name)
	})

	it('leaves urls unchanged if they can be loaded directly', async () => {
		const sources = [
			'http://nextcloud.com/pic.jpg',
			'https://nextcloud.com/pic.jpg',
			'data:4173456789ASDF',
		]
		const resolver = initAttachmentResolver({ fileId })
		for (const src of sources) {
			const attachment = await resolver.resolve(src)
			expect(attachment.isImage).toBe(true)
			expect(attachment.previewUrl).toBe(src)
			expect(attachment.fullUrl).toBe(src)
		}
	})

	it('handles .attachments urls to different fileId via webdav with text API fallback', async () => {
		const src = `.attachments.${session.documentId + 1}/${a2name}`
		const resolver = initAttachmentResolver({ session })
		const attachment = await resolver.resolve(src)
		expect(attachment.isImage).toBe(false)
		expect(attachment.name).toBe(a2name)
	})

	it('handles non-native urls wia webdav', async () => {
		const src = `/path/to/some image.png`
		const resolver = new AttachmentResolver({ fileId, user, currentDirectory })
		const attachment = await resolver.resolve(src)
		expect(attachment.isImage).toBe(true)
		expect(attachment.previewUrl).toBe('http://localhost/remote.php/dav/files/user-uid/parentDir/path/to/some%20image.png')
	})

})

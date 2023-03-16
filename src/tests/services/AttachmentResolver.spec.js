import AttachmentResolver from './../../services/AttachmentResolver.js'

describe('Image resolver', () => {

	const fileId = 4173
	const session = {
		documentId: fileId,
		id: 456,
		token: 'mySessionToken',
	}
	const user = {
		uid: 'user-uid',
	}
	const currentDirectory = '/parentDir'
	const shareToken = 'myShareToken'

	it('is a class with one constructor argument', () => {
		const resolver = new AttachmentResolver({})
		expect(resolver).toBeInstanceOf(AttachmentResolver)
	})

	it('handles text:// urls via Text API', async () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new AttachmentResolver({ session })
		const [candidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&preferRawImage=0')
	})

	it('handles text:// urls with token via Text API', async () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new AttachmentResolver({
			session,
			shareToken: 'myShareToken',
		})
		const [candidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&shareToken=myShareToken&preferRawImage=0')
	})

	it('uses user auth over token auth', async () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new AttachmentResolver({
			session,
			user,
			shareToken: 'myShareToken',
		})
		const [candidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).not.toContain('myShareToken')
	})

	it('handles .attachments urls to own fileId via Text API', async () => {
		const src = `.attachments.${session.documentId}/group%20pic.jpg`
		const resolver = new AttachmentResolver({ session })
		const [candidate, fallbackCandidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&preferRawImage=0')
		expect(fallbackCandidate.type).toBe('media')
		expect(fallbackCandidate.url).toBe('/nc-webroot/apps/text/mediaPreview?documentId=4173&sessionId=456&sessionToken=mySessionToken&mediaFileName=group%20pic.jpg')
		expect(fallbackCandidate.name).toBe('group pic.jpg')
		const metadataUrl = resolver.getMediaMetadataUrl(fallbackCandidate.name)
		expect(metadataUrl).toBe('/nc-webroot/apps/text/mediaMetadata?documentId=4173&sessionId=456&sessionToken=mySessionToken&mediaFileName=group%20pic.jpg')
	})

	it('handles .attachments urls to own fileId with token via Text API', async () => {
		const src = `.attachments.${session.documentId}/group%20pic.jpg`
		const resolver = new AttachmentResolver({
			session,
			shareToken,
		})
		const [candidate, fallbackCandidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&shareToken=myShareToken&preferRawImage=0')
		expect(fallbackCandidate.type).toBe('media')
		expect(fallbackCandidate.url).toBe('/nc-webroot/apps/text/mediaPreview?documentId=4173&sessionId=456&sessionToken=mySessionToken&mediaFileName=group%20pic.jpg&shareToken=myShareToken')
		expect(fallbackCandidate.name).toBe('group pic.jpg')
		const metadataUrl = resolver.getMediaMetadataUrl(fallbackCandidate.name)
		expect(metadataUrl).toBe('/nc-webroot/apps/text/mediaMetadata?documentId=4173&sessionId=456&sessionToken=mySessionToken&mediaFileName=group%20pic.jpg&shareToken=myShareToken')
	})

	it('leaves urls unchanged if they can be loaded directly', async () => {
		const sources = [
			'http://nextcloud.com/pic.jpg',
			'https://nextcloud.com/pic.jpg',
			'data:4173456789ASDF',
			'/core/preview.png?file=pic.jpg&x=1024&y=1024&a=true',
			'/apps/files_sharing/publicpreview/ASDFWERASDF?x=1024&y=1024&a=true',
		]
		const resolver = new AttachmentResolver({ })
		for (const src of sources) {
			const [candidate] = await resolver.resolve(src)
			expect(candidate.type).toBe('image')
			expect(candidate.url).toBe(src)
		}
	})

	it('uses fileId for preview', async () => {
		const src = '/Media/photo.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new AttachmentResolver({ user })
		const [candidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toContain('/core/preview?fileId=7')
	})

	it('uses .png endpoint if no fileId is given', async () => {
		const src = '/Media/photo.jpeg?mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new AttachmentResolver({ user })
		const [candidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toBe('/nc-webroot/core/preview.png?file=%2FMedia%2Fphoto.jpeg&x=1024&y=1024&a=true')
	})

	it('retrieves public preview by path', async () => {
		const src = '/Media/photo.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new AttachmentResolver({
			shareToken: 'SHARE_TOKEN'
		})
		const [candidate] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toBe('/nc-webroot/apps/files_sharing/publicpreview/SHARE_TOKEN?file=%2FMedia%2Fphoto.jpeg&x=1024&y=1024&a=true')
	})

	it('handles .attachments urls to different fileId via webdav with text API fallback', async () => {
		const src = `.attachments.${session.documentId + 1}/group%20pic.jpg`
		const resolver = new AttachmentResolver({ session, user, currentDirectory })
		const [candidate, fallbackCandidate, secondFallback] = await resolver.resolve(src)
		expect(candidate.type).toBe('image')
		expect(candidate.url).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/parentDir/.attachments.4174/group%20pic.jpg')
		expect(fallbackCandidate.type).toBe('image')
		expect(fallbackCandidate.url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&preferRawImage=0')
		expect(secondFallback.type).toBe('media')
		expect(secondFallback.url).toBe('/nc-webroot/apps/text/mediaPreview?documentId=4173&sessionId=456&sessionToken=mySessionToken&mediaFileName=group%20pic.jpg')
		expect(secondFallback.name).toBe('group pic.jpg')
		const metadataUrl = resolver.getMediaMetadataUrl(secondFallback.name)
		expect(metadataUrl).toBe('/nc-webroot/apps/text/mediaMetadata?documentId=4173&sessionId=456&sessionToken=mySessionToken&mediaFileName=group%20pic.jpg')
	})

	describe('missing session', () => {

		it('resolves text:// urls as authenticated dav', async () => {
			const src = 'text://image?imageFileName=group%20pic.jpg'
			const resolver = new AttachmentResolver({
				fileId: 4173,
				user,
				currentDirectory,
			})
			const [candidate] = await resolver.resolve(src)
			expect(candidate.type).toBe('image')
			expect(candidate.url).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/parentDir/.attachments.4173/group%20pic.jpg')
		})

		it('resolves text:// urls as share token download', async () => {
			const src = 'text://image?imageFileName=group%20pic.jpg'
			const resolver = new AttachmentResolver({
				fileId,
				shareToken,
				currentDirectory,
			})
			const [candidate] = await resolver.resolve(src)
			expect(candidate.type).toBe('image')
			expect(candidate.url).toBe('/nc-webroot/s/myShareToken/download?path=%2FparentDir%2F.attachments.4173&files=group%20pic.jpg')
		})

		it('handles .attachments urls via webdav with mimetype URL fallback', async () => {
			const src = `.attachments.${session.documentId + 1}/group%20pic.jpg`
			const resolver = new AttachmentResolver({ user, currentDirectory, fileId })

			jest.spyOn(resolver, 'getMetadata').mockReturnValue({mimetype: 'application/pdf', size: '1 KB'})
			jest.spyOn(resolver, 'getMimeUrl').mockReturnValue('/nc-webroot/apps/theming/img/core/filetypes/application-pdf.svg')
			const [candidate, fallbackCandidate] = await resolver.resolve(src)
			expect(candidate.type).toBe('image')
			expect(candidate.url).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/parentDir/.attachments.4174/group%20pic.jpg')
			expect(fallbackCandidate.type).toBe('media')
			expect(fallbackCandidate.url).toBe('/nc-webroot/apps/theming/img/core/filetypes/application-pdf.svg')
		})

	})

})

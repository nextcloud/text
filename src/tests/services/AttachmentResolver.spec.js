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

	it('handles text:// urls via Text API', () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new AttachmentResolver({ session })
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg')
	})

	it('handles text:// urls with token via Text API', () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new AttachmentResolver({
			session,
			shareToken: 'myShareToken',
		})
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&shareToken=myShareToken')
	})

	it('uses user auth over token auth', () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new AttachmentResolver({
			session,
			user,
			shareToken: 'myShareToken',
		})
		const [url] = resolver.resolve(src)
		expect(url).not.toContain('myShareToken')
	})

	it('handles .attachments urls via Text API', () => {
		const src = `.attachments.${session.documentId}/group%20pic.jpg`
		const resolver = new AttachmentResolver({ session })
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg')
	})

	it('handles .attachments urls with token via Text API', () => {
		const src = `.attachments.${session.documentId}/group%20pic.jpg`
		const resolver = new AttachmentResolver({
			session,
			shareToken,
		})
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&shareToken=myShareToken')
	})

	it('leaves urls unchanged if they can be loaded directly', () => {
		const sources = [
			'http://nextcloud.com/pic.jpg',
			'https://nextcloud.com/pic.jpg',
			'data:4173456789ASDF',
			'/core/preview.png?file=pic.jpg&x=1024&y=1024&a=true',
			'/apps/files_sharing/publicpreview/ASDFWERASDF?x=1024&y=1024&a=true',
		]
		const resolver = new AttachmentResolver({ })
		for (const src of sources) {
			const [url] = resolver.resolve(src)
			expect(url).toBe(src)
		}
	})

	it('uses fileId for preview', () => {
		const src = '/Media/photo.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new AttachmentResolver({ user })
		const [url] = resolver.resolve(src)
		expect(url).toContain('/core/preview?fileId=7')
	})

	it('uses .png endpoint if no fileId is given', () => {
		const src = '/Media/photo.jpeg?mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new AttachmentResolver({ user })
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/core/preview.png?file=%2FMedia%2Fphoto.jpeg&x=1024&y=1024&a=true')
	})

	it('retrieves public preview by path', () => {
		const src = '/Media/photo.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new AttachmentResolver({
			shareToken: 'SHARE_TOKEN'
		})
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/files_sharing/publicpreview/SHARE_TOKEN?file=%2FMedia%2Fphoto.jpeg&x=1024&y=1024&a=true')
	})

	it('handles old .attachments urls via webdav with text API fallback', () => {
		const src = `.attachments.${session.documentId + 1}/group%20pic.jpg`
		const resolver = new AttachmentResolver({ session, user, currentDirectory })
		const [url, fallback] = resolver.resolve(src)
		expect(url).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/parentDir/.attachments.4174/group%20pic.jpg')
		expect(fallback).toBe('/nc-webroot/apps/text/image?documentId=4173&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg')
	})

	describe('missing session', () => {

		it('resolves text:// urls as authenticated dav', () => {
			const src = 'text://image?imageFileName=group%20pic.jpg'
			const resolver = new AttachmentResolver({
				fileId: 4173,
				user,
				currentDirectory,
			})
			const [url] = resolver.resolve(src)
			expect(url).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/parentDir/.attachments.4173/group%20pic.jpg')
		})

		it('resolves text:// urls as share token download', () => {
			const src = 'text://image?imageFileName=group%20pic.jpg'
			const resolver = new AttachmentResolver({
				fileId,
				shareToken,
				currentDirectory,
			})
			const [url] = resolver.resolve(src)
			expect(url).toBe('/nc-webroot/s/myShareToken/download?path=%2FparentDir%2F.attachments.4173&files=group%20pic.jpg')
		})

		it('handles .attachments urls for other fileIds via webdav with webdav fallback', () => {
			const src = `.attachments.${session.documentId + 1}/group%20pic.jpg`
			const resolver = new AttachmentResolver({ user, currentDirectory, fileId })
			const [url, fallback] = resolver.resolve(src)
			expect(url).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/parentDir/.attachments.4174/group%20pic.jpg')
			expect(fallback).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/parentDir/.attachments.4173/group%20pic.jpg')
		})

	})

})

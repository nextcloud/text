import ImageResolver from './../../nodes/ImageResolver.js'

describe('Image resolver', () => {

	const session = {
		documentId: 123,
		id: 456,
		token: 'mySessionToken',
	}
	const user = {
		uid: 'user-uid',
	}

	it('is a class with one constructor argument', () => {
		const resolver = new ImageResolver({})
		expect(resolver).toBeInstanceOf(ImageResolver)
	})

	it('handles text:// urls via Text API', () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new ImageResolver({ session })
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=123&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg')
	})

	it('handles text:// urls with token via Text API', () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new ImageResolver({
			session,
			shareToken: 'myShareToken',
		})
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=123&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&shareToken=myShareToken')
	})

	it('uses user auth over token auth', () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new ImageResolver({
			session,
			user,
			shareToken: 'myShareToken',
		})
		const [url] = resolver.resolve(src)
		expect(url).not.toContain('myShareToken')
	})

	it('handles .attachments urls via Text API', () => {
		const src = `.attachments.${session.documentId}/group%20pic.jpg`
		const resolver = new ImageResolver({ session })
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=123&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg')
	})

	it('handles .attachments urls with token via Text API', () => {
		const src = `.attachments.${session.documentId}/group%20pic.jpg`
		const resolver = new ImageResolver({
			session,
			shareToken: 'myShareToken',
		})
		const [url] = resolver.resolve(src)
		expect(url).toBe('/nc-webroot/apps/text/image?documentId=123&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg&shareToken=myShareToken')
	})

	it('leaves urls unchanged if they can be loaded directly', () => {
		const sources = [
			'http://nextcloud.com/pic.jpg',
			'https://nextcloud.com/pic.jpg',
			'data:123456789ASDF',
			'/core/preview.png?file=pic.jpg&x=1024&y=1024&a=true',
			'/apps/files_sharing/publicpreview/ASDFWERASDF?x=1024&y=1024&a=true',
		]
		const resolver = new ImageResolver({ })
		for (const src of sources) {
			const [url] = resolver.resolve(src)
			expect(url).toBe(src)
		}
	})

	it('uses fileId for preview', () => {
		const src = '/Media/photo.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new ImageResolver({ user })
		const [url] = resolver.resolve(src)
		expect(url).toContain('/core/preview?fileId=7')
	})

	it('uses fileId for public preview', () => {
		const src = '/Media/photo.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'
		const resolver = new ImageResolver({ shareToken: 'SHARE_TOKEN' })
		const [url] = resolver.resolve(src)
		expect(url).toContain('/apps/files_sharing/publicpreview/SHARE_TOKEN?fileId=7')
	})

	it('handles old .attachments urls via webdav with text API fallback', () => {
		const src = `.attachments.${session.documentId + 1}/group%20pic.jpg`
		const resolver = new ImageResolver({ session, user })
		const [url, fallback] = resolver.resolve(src)
		expect(url).toBe('http://localhost/nc-webroot/remote.php/dav/files/user-uid/.attachments.124/group%20pic.jpg')
		expect(fallback).toBe('/nc-webroot/apps/text/image?documentId=123&sessionId=456&sessionToken=mySessionToken&imageFileName=group%20pic.jpg')
	})

	it.skip('handles text:// urls as a preview when missing session', () => {
		const src = 'text://image?imageFileName=group%20pic.jpg'
		const resolver = new ImageResolver({
		})
		const [url] = resolver.resolve(src)
		expect(url).toBe('https://cloud.nextcloud.com/core/preview.png?file=Kollektive%2Ftest%20new%20collective%2F.attachments.5934333%2FFOSDEM%20group%20pic.jpg&x=1024&y=1024&a=true')
	})

})

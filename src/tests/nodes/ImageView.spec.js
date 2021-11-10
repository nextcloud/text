import { shallowMount } from '@vue/test-utils'
import ImageView from '../../nodes/ImageView.vue'

global.OC = {
	requestToken: '123',
	config: {modRewriteWorking: true},
	MimeType: {getIconUrl: mime => mime},
	webroot: ''
}

describe('Image View src attribute based on markdown', () => {

	const factory = attrs => {
		const propsData = {
			options: {currentDirectory: '/current'},
			node: {attrs}
		}
		const data = () => ({
			imageLoaded: true,
			loaded: true,
			failed: false,
		})
		return shallowMount(ImageView, {propsData, data})
	}

	test('old style is used as is', () => {
		const src = '/core/preview?fileId=123#mimetype=image%2Fjpeg'
		const wrapper = factory({src})
		expect(wrapper.find('.image__main').attributes('src')).toBe(src)
	})

	test('old style with index.php is used as is', () => {
		const src = '/index.php/core/preview?fileId=9&x=1024&y=1024&a=true#mimetype=image%2Fjpeg&hasPreview=true&fileId=9'
		const wrapper = factory({src})
		expect(wrapper.find('.image__main').attributes('src')).toBe(src)
	})

	test('fileId is used for preview url', () => {
		const src = '/Media/photo.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'
		const wrapper = factory({src})
		expect(wrapper.vm.fileId).toBe('7')
		expect(wrapper.find('.image__main').attributes('src'))
			.toContain('/core/preview?fileId=7')
	})

	test('use dav paths for gifs so they are animated', () => {
		const src = '/Media/giffy.gif?fileId=7#mimetype=image%2Fgif&hasPreview=true'
		const wrapper = factory({src})
		expect(wrapper.vm.options.currentDirectory).toBe('/current')
		expect(wrapper.find('.image__main').attributes('src'))
			.toContain("remote.php/dav/files/user1/current/Media/giffy.gif")
	})

	test('without fileId relative path is used in file based preview url', () => {
		const wrapper = factory({src: 'sub/asdf.jpg?hasPreview=true'})
		expect(wrapper.vm.isSupportedImage).toBe(true)
		expect(wrapper.find('.image__main').attributes('src'))
			.toBe('/core/preview?file=%2Fcurrent%2Fsub%2Fasdf.jpg&x=1024&y=1024&a=true')
	})

	test('public share link previews are just used as they are', () => {
		const wrapper = factory({src: 'https://nextcloud/index.php/apps/files_sharing/publicpreview/CSYoWifBzrsMWeA?file=/deck11-calendar.png&x=1760&y=990&a=true'})
		expect(wrapper.vm.isSupportedImage).toBe(true)
		expect(wrapper.find('.image__main').attributes('src'))
			.toBe('https://nextcloud/index.php/apps/files_sharing/publicpreview/CSYoWifBzrsMWeA?file=/deck11-calendar.png&x=1760&y=990&a=true')
	})
})

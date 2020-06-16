import { shallowMount } from '@vue/test-utils'
import ImageView from '../../nodes/ImageView.vue'

global.FileList = {
	getCurrentDirectory: function() {return '/current'},
}
global.OC = {
	requestToken: '123',
	config: {modRewriteWorking: true},
	MimeType: {getIconUrl: mime => mime},
	webroot: ''
}

describe('Image View src attribute based on markdown', () => {

	const factory = attrs => {
		const propsData = {
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
		const wrapper = factory({src: '/Media/photo-1498855592392-af2bf1e0a4c7.jpeg?fileId=7#mimetype=image%2Fjpeg&hasPreview=true'})
		expect(wrapper.vm.fileId).toBe('7')
		expect(wrapper.find('.image__main').attributes('src'))
			.toBe('/core/preview?fileId=7&x=1024&y=1024&a=true')
	})

	test('without fileId relative path is used in file based preview url', () => {
		const wrapper = factory({src: 'sub/asdf.jpg'})
		expect(wrapper.vm.isSupportedImage).toBe(true)
		expect(wrapper.find('.image__main').attributes('src'))
			.toBe('/core/preview.png?file=%2Fcurrent%2Fsub%2Fasdf.jpg&x=1024&y=1024&a=true')
	})
})

import { domHref, parseHref } from '../../helpers/links'

global.OC = {
	Util: {
		History: {
			parseUrlQuery: () => ({
				dir: '/Wiki',
			}),
		},
	},
}

describe('Preparing href attributes for the DOM', () => {

	test('leave empty hrefs alone', () => {
		expect(domHref({attrs: {href: ''}})).toBe('')
	})

	test('leave undefined hrefs alone', () => {
		expect(domHref({attrs: {}})).toBe(undefined)
	})

	test('full url', () => {
		expect(domHref({attrs: {href: 'https://otherdomain.tld'}}))
			.toBe('https://otherdomain.tld')
	})

	test('other protocol', () => {
		expect(domHref({attrs: {href: 'mailTo:test@mail.example'}}))
			.toBe('mailTo:test@mail.example')
	})

	test('relative link with fileid', () => {
		expect(domHref({attrs: {href: 'otherfile?fileId=123'}}))
			.toBe('?dir=/Wiki&openfile=123&relPath=otherfile')
	})

	test('relative path with ../', () => {
		expect(domHref({attrs: {href: '../other/otherfile?fileId=123'}}))
			.toBe('?dir=/other&openfile=123&relPath=../other/otherfile')
	})

	test('absolute path', () => {
		expect(domHref({attrs: {href: '/other/otherfile?fileId=123'}}))
			.toBe('?dir=/other&openfile=123&relPath=/other/otherfile')
	})

	test('absolute path', () => {
		expect(domHref({attrs: {href: '/otherfile?fileId=123'}}))
			.toBe('?dir=/&openfile=123&relPath=/otherfile')
	})

})

describe('Extracting short urls from the DOM', () => {

	const domStub = (href) => ({
		getAttribute() {
			return href
		},
	})

	test('leave empty hrefs alone', () => {
		expect(parseHref(domStub(''))).toBe('')
	})

	test('leave undefined hrefs alone', () => {
		expect(parseHref(domStub())).toBe(undefined)
	})

	test('relative link with fileid', () => {
		expect(parseHref(domStub('?dir=/other&openfile=123&relPath=../other/otherfile')))
			.toBe('../other/otherfile?fileId=123')
	})

})

describe('Inserting hrefs into the dom and extracting them again', () => {

	function insertAndExtract(attrs) {
		const node = {attrs}
		const dom = {
			getAttribute() {
				return domHref(node)
			},
		}
		return parseHref(dom)
	}

	test('leave empty hrefs alone', () => {
		expect(insertAndExtract({href: ''})).toBe('')
	})

	test('leave undefined hrefs alone', () => {
		expect(insertAndExtract({})).toBe(undefined)
	})

	test('default relative link format is unchanged', () => {
		expect(insertAndExtract({href: 'otherfile?fileId=123'}))
			.toBe('otherfile?fileId=123')
	})

})

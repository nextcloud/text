import { domHref, parseHref } from '../../helpers/links'
import { loadState } from '@nextcloud/initial-state'
import { beforeEach, describe, expect, test, vi } from 'vitest'

global.OCA = {
	Viewer: {
		file: '/Wiki/file.md',
	},
}

global.OC = {
	config: {modRewriteWorking: true},
}

global._oc_webroot = ''

function setApp(app) {
	vi.mock('@nextcloud/initial-state',  async (importOriginal) => {
		const mod = await importOriginal ()
		return {
			...mod ,
			// replace some exports
			loadState: (_app, key) => app,
		}
	})
}

describe('Preparinghref attributes for the DOM', () => {

	beforeEach(() => setApp('files'))

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

	test('relative link with fileid (old format from file picker)', () => {
		expect(domHref({attrs: {href: 'otherfile?fileId=123'}}))
			.toBe('http://localhost:3000/f/123')
	})

	test('relative path with ../ (old format from file picker)', () => {
		expect(domHref({attrs: {href: '../other/otherfile?fileId=123'}}))
			.toBe('http://localhost:3000/f/123')
	})

	test('absolute path (old format from file picker)', () => {
		expect(domHref({attrs: {href: '/other/otherfile?fileId=123'}}))
			.toBe('http://localhost:3000/f/123')
	})

	test('absolute path (old format from file picker)', () => {
		expect(domHref({attrs: {href: '/otherfile?fileId=123'}}))
			.toBe('http://localhost:3000/f/123')
	})

})

describe('Extracting short urls from the DOM', () => {

	beforeEach(() => setApp('files'))

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

	test('relative link with fileid (old format from file picker)', () => {
		expect(parseHref(domStub('?dir=/other&openfile=123#relPath=../other/otherfile')))
			.toBe('http://localhost:3000/f/123')
	})

})

describe('Inserting hrefs into the dom and extracting them again', () => {

	beforeEach(() => setApp('files'))

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

	test('old relative link format (from file picker) is rewritten', () => {
		expect(insertAndExtract({href: 'otherfile?fileId=123'}))
			.toBe('http://localhost:3000/f/123')
	})

	test('old relative link format with ../ (from file picker) is rewritten', () => {
		expect(insertAndExtract({href: '../otherfile?fileId=123'}))
			.toBe('http://localhost:3000/f/123')
	})

	test('old absolute link format (from file picker) is rewritten', () => {
		expect(insertAndExtract({href: '/otherfile?fileId=123'}))
			.toBe('http://localhost:3000/f/123')
	})

	test('default full URL link format is unchanged', () => {
		expect(insertAndExtract({href: 'http://localhost:3000/f/123'}))
			.toBe('http://localhost:3000/f/123')
	})

	test('absolute link to collectives page is unchanged', () => {
		expect(insertAndExtract({href: '/apps/collectives/page?fileId=123'}))
			.toBe('/apps/collectives/page?fileId=123')
	})

})

describe('Preparing href attributes for the DOM in Collectives app', () => {

	beforeEach(() => setApp('collectives'))

	test('relative link with fileid in Collectives', () => {
		expect(domHref({attrs: {href: 'otherfile?fileId=123'}}))
			.toBe('otherfile?fileId=123')
	})
})

/**
 * SPDX-FileCopyrightText: 2020-2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { domHref, parseHref } from '../../helpers/links'
import { loadState } from '@nextcloud/initial-state'

global.OCA = {
	Viewer: {
		file: '/Wiki/file.md',
	},
}

global.OC = {
	config: {modRewriteWorking: true},
}

global._oc_webroot = ''

jest.mock('@nextcloud/initial-state')
loadState.mockImplementation((app, key) => 'files')

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

	test('relative link with fileid (old format from file picker)', () => {
		expect(domHref({attrs: {href: 'otherfile?fileId=123'}}))
			.toBe('http://localhost/f/123')
	})

	test('relative path with ../ (old format from file picker)', () => {
		expect(domHref({attrs: {href: '../other/otherfile?fileId=123'}}))
			.toBe('http://localhost/f/123')
	})

	test('absolute path (old format from file picker)', () => {
		expect(domHref({attrs: {href: '/other/otherfile?fileId=123'}}))
			.toBe('http://localhost/f/123')
	})

	test('absolute path (old format from file picker)', () => {
		expect(domHref({attrs: {href: '/otherfile?fileId=123'}}))
			.toBe('http://localhost/f/123')
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

	test('relative link with fileid (old format from file picker)', () => {
		expect(parseHref(domStub('?dir=/other&openfile=123#relPath=../other/otherfile')))
			.toBe('http://localhost/f/123')
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

	test('old relative link format (from file picker) is rewritten', () => {
		expect(insertAndExtract({href: 'otherfile?fileId=123'}))
			.toBe('http://localhost/f/123')
	})

	test('old relative link format with ../ (from file picker) is rewritten', () => {
		expect(insertAndExtract({href: '../otherfile?fileId=123'}))
			.toBe('http://localhost/f/123')
	})

	test('old absolute link format (from file picker) is rewritten', () => {
		expect(insertAndExtract({href: '/otherfile?fileId=123'}))
			.toBe('http://localhost/f/123')
	})

	test('default full URL link format is unchanged', () => {
		expect(insertAndExtract({href: 'http://localhost/f/123'}))
			.toBe('http://localhost/f/123')
	})

	test('absolute link to collectives page is unchanged', () => {
		expect(insertAndExtract({href: '/apps/collectives/page?fileId=123'}))
			.toBe('/apps/collectives/page?fileId=123')
	})

})

describe('Preparing href attributes for the DOM in Collectives app', () => {
	beforeAll(() => {
		loadState.mockImplementation((app, key) => 'collectives')
	})

	test('relative link with fileid in Collectives', () => {
		expect(domHref({attrs: {href: 'otherfile?fileId=123'}}))
			.toBe('otherfile?fileId=123')
	})
})

/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'

import { getCurrentUser } from '@nextcloud/auth'
import { isPublicShare } from '@nextcloud/sharing/public'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { comparedEnds, comparedPair, endOf, formatDate, formatDates, isOlder, versionNode } from '../../comparison/versionEnds.ts'

vi.mock('@nextcloud/files', async () => await vi.importActual('@nextcloud/files'))
vi.mock('@nextcloud/sharing/public', () => ({ isPublicShare: vi.fn(() => false) }))
vi.mock('@nextcloud/auth', async (importOriginal) => ({ ...await importOriginal<object>(), getCurrentUser: vi.fn(() => ({ uid: 'alice' })) }))

const origin = 'https://cloud.example'

// A node of the viewer, with only what the ends are read from
function node(path: string, fileid = 7): IFile {
	return { source: origin + path, fileid } as unknown as IFile
}

// As Files builds them (apps/files_versions/src/utils/versions.ts) and as
// Collectives does (src/util/viewer.ts): the same endpoints
const version = node('/remote.php/dav/versions/alice/versions/7/1691420501')
const current = node('/remote.php/dav/files/alice/Notes/plan.md')

afterEach(() => {
	vi.mocked(isPublicShare).mockReturnValue(false)
})

describe('endOf', () => {
	it('reads the revision of a version', () => {
		expect(endOf(version)).toEqual({ fileId: 7, id: '1691420501' })
	})

	it('reads the current file', () => {
		expect(endOf(current)).toEqual({ fileId: 7, id: 'current' })
	})

	it('knows nothing of other sources', () => {
		expect(endOf(node('/remote.php/dav/trashbin/alice/trash/plan.md.d1691420501'))).toBeUndefined()
		expect(endOf({ source: 'not a url' } as unknown as IFile)).toBeUndefined()
	})
})

describe('comparedEnds', () => {
	it('compares two versions of one file, older first', () => {
		expect(comparedEnds(version, current)).toEqual({ fileId: 7, from: '1691420501', to: 'current' })
	})

	it('compares nothing it cannot list versions for', () => {
		expect(comparedEnds(version, node('/remote.php/dav/files/alice/other.md', 8))).toBeUndefined()
		expect(comparedEnds(current, current)).toBeUndefined()
	})

	it('offers nothing on a public share', () => {
		vi.mocked(isPublicShare).mockReturnValue(true)
		expect(comparedEnds(version, current)).toBeUndefined()
	})

	it('offers nothing without a user', () => {
		vi.mocked(getCurrentUser).mockReturnValueOnce(null)
		expect(comparedEnds(version, current)).toBeUndefined()
	})
})

describe('comparedPair', () => {
	const at = (seconds: number, path: string) => ({ ...node(path), mtime: new Date(seconds * 1000) }) as IFile
	const older = at(1691420501, '/remote.php/dav/versions/alice/versions/7/1691420501')
	const newer = at(1691430000, '/remote.php/dav/files/alice/Notes/plan.md')

	it('dates each end by its node until the texts are loaded', () => {
		expect(comparedPair(older, newer)).toEqual({ fileId: 7, from: '1691420501', to: 'current', nodes: { from: older, to: newer }, saved: { from: 1691420501, to: 1691430000 } })
	})

	it('dates the current file as the server sent its text, at either end', () => {
		const loaded = { before: { modified: 1 }, after: { modified: 1691439999 } }
		expect(comparedPair(older, newer, loaded)?.saved).toEqual({ from: 1691420501, to: 1691439999 })
		// Collectives compares the current file as the older end after a restore
		expect(comparedPair(newer, older, { before: { modified: 1691439999 }, after: { modified: 1 } })?.saved).toEqual({ from: 1691439999, to: 1691420501 })
	})

	it('is nothing where the ends are nothing', () => {
		vi.mocked(isPublicShare).mockReturnValue(true)
		expect(comparedPair(older, newer)).toBeUndefined()
	})
})

describe('isOlder', () => {
	it('takes the current file as newer than every version, also when a restore set an older time', () => {
		expect(isOlder({ id: '300', mtime: 300 }, { id: 'current', mtime: 200 })).toBe(true)
		expect(isOlder({ id: 'current', mtime: 200 }, { id: '100', mtime: 100 })).toBe(false)
	})

	it('orders two versions by when they were saved', () => {
		expect(isOlder({ id: '100', mtime: 100 }, { id: '300', mtime: 300 })).toBe(true)
		expect(isOlder({ id: '300', mtime: 300 }, { id: '100', mtime: 100 })).toBe(false)
		expect(isOlder({ id: '100', mtime: 100 }, { id: '100', mtime: 100 })).toBe(false)
	})
})

describe('versionNode', () => {
	const entry = (id: string) => ({ id, mtime: 1_762_000_000, size: 12, label: '', author: null })

	it('makes the current file a node under the files endpoint, at its path', () => {
		const node = versionNode(entry('current'), 7, '/Notes/plan.md')

		expect(node.source).toMatch(/\/remote\.php\/dav\/files\/alice\/Notes\/plan\.md$/)
		expect(node.path).toBe('/Notes/plan.md')
		expect(endOf(node)).toEqual({ fileId: 7, id: 'current' })
	})

	it('makes a version a read-only node under the versions endpoint, named after its date', () => {
		const node = versionNode(entry('1762000000'), 7, '/Notes/plan.md')

		expect(endOf(node)).toEqual({ fileId: 7, id: '1762000000' })
		expect(node.permissions).toBe(1)
		expect(node.displayname).toBe(formatDate(1_762_000_000, 'long'))
	})
})

describe('formatDates', () => {
	it('shows seconds only where another date falls in the same minute', () => {
		const at = (minute: number, second: number) => new Date(2026, 2, 4, 9, minute, second).getTime() / 1000
		const [first, second, alone] = formatDates([at(7, 10), at(7, 30), at(9, 30)])

		expect(first).toContain(':10')
		expect(second).toContain(':30')
		expect(alone).not.toContain(':30')
		expect(alone).toBe(formatDate(at(9, 30)))
	})
})

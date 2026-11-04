/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { IFile } from '@nextcloud/files'

import { getCurrentUser } from '@nextcloud/auth'
import { isPublicShare } from '@nextcloud/sharing/public'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { comparedEnds, endOf } from '../../comparison/versionEnds.ts'

vi.mock('@nextcloud/files', async () => await vi.importActual('@nextcloud/files'))
vi.mock('@nextcloud/sharing/public', () => ({ isPublicShare: vi.fn(() => false) }))

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

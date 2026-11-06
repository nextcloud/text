/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { INode } from '@nextcloud/files'
import type { VersionEntry } from '../../comparison/versionEnds.ts'

import { loadState } from '@nextcloud/initial-state'
import { isPublicShare } from '@nextcloud/sharing/public'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { canSummarize } from '../../versionSummary/sidebarEntry.ts'
import { recentChangesBase } from '../../versionSummary/summarizeRecentChanges.ts'

vi.mock('@nextcloud/files', async () => await vi.importActual('@nextcloud/files'))
vi.mock('@nextcloud/initial-state', () => ({ loadState: vi.fn(() => true) }))
vi.mock('@nextcloud/sharing/public', () => ({ isPublicShare: vi.fn(() => false) }))

function version(id: string, mtime: number): VersionEntry {
	return { id, mtime, size: 10, label: '', author: null }
}

// A node of the Files sidebar
function node(fields: Record<string, unknown> = {}): INode {
	return { type: 'file', mime: 'text/markdown', permissions: 1, attributes: {}, fileid: 7, source: 'https://cloud.example/remote.php/dav/files/user1/plan.md', ...fields } as unknown as INode
}

describe('recentChangesBase', () => {
	const now = 100_000

	it('starts at the newest version at least an hour older', () => {
		expect(recentChangesBase([version('current', now), version('a', now - 600), version('b', now - 3600), version('c', now - 9000)])!.id).toBe('b')
	})

	it('starts at the oldest version of a young file', () => {
		expect(recentChangesBase([version('current', now), version('a', now - 600), version('b', now - 1200)])!.id).toBe('b')
	})

	it('has nothing to start from without older versions', () => {
		expect(recentChangesBase([version('current', now)])).toBeUndefined()
		expect(recentChangesBase([])).toBeUndefined()
	})
})

describe('canSummarize', () => {
	afterEach(() => {
		vi.mocked(loadState).mockReturnValue(true)
		vi.mocked(isPublicShare).mockReturnValue(false)
	})

	it('is offered for a readable Markdown file while summaries are on', () => {
		expect(canSummarize({ node: node() })).toBe(true)
	})

	it.each([
		['another type', { mime: 'text/plain' }],
		['a folder', { type: 'folder' }],
		['an unreadable file', { permissions: 0 }],
		['an end-to-end encrypted file', { attributes: { 'e2ee-is-encrypted': 1 } }],
		['an encrypted file', { attributes: { 'is-encrypted': 1 } }],
		['a share without downloads', { attributes: { 'share-attributes': JSON.stringify([{ scope: 'permissions', key: 'download', value: false }]) } }],
		['a link share hiding downloads', { attributes: { 'hide-download': true } }],
	])('is not offered for %s', (_, fields) => {
		expect(canSummarize({ node: node(fields) })).toBe(false)
	})

	it('is not offered while summaries are off or on a public share', () => {
		vi.mocked(loadState).mockReturnValueOnce(false)
		expect(canSummarize({ node: node() })).toBe(false)
		vi.mocked(isPublicShare).mockReturnValueOnce(true)
		expect(canSummarize({ node: node() })).toBe(false)
	})
})

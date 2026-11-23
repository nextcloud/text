/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { INode } from '@nextcloud/files'
import type { VersionEntry } from '../../comparison/versionEnds.ts'

import axios from '@nextcloud/axios'
import { loadState } from '@nextcloud/initial-state'
import { isPublicShare } from '@nextcloud/sharing/public'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useFileVersions } from '../../comparison/versions.ts'
import { canSummarize } from '../../versionSummary/sidebarEntry.ts'
import { recentChangesBase, summarizeRecentChanges } from '../../versionSummary/summarizeRecentChanges.ts'

vi.mock('@nextcloud/files', async () => await vi.importActual('@nextcloud/files'))
const viewer = vi.hoisted(() => Object.assign(new EventTarget(), { compare: vi.fn(async () => {}) }))
vi.mock('@nextcloud/viewer', () => ({ getViewer: () => viewer }))
vi.mock('@nextcloud/auth', async (importOriginal) => ({ ...await importOriginal<object>(), getCurrentUser: () => ({ uid: 'user1' }) }))
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

	it('counts from the latest change after a version was restored', () => {
		// Restoring sets the current file's time to the restored version's; the replaced content is the newest version
		expect(recentChangesBase([version('current', now - 90_000), version('a', now), version('b', now - 3600), version('c', now - 9000)])!.id).toBe('b')
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
		['a share without downloads, its attributes already read', { attributes: { 'share-attributes': [{ scope: 'permissions', key: 'download', value: false }] } }],
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

	it('offers it for Markdown under its other type too', () => {
		expect(canSummarize({ node: node({ mime: 'text/x-web-markdown' }) } as never)).toBe(true)
	})

	it('leaves share attributes it cannot read to the server, which checks again', () => {
		expect(canSummarize({ node: node({ attributes: { 'share-attributes': '{not json' } }) })).toBe(true)
	})
})

describe('summarizeRecentChanges', () => {
	it('lists the versions once, for the pickers of the comparison it opens too', async () => {
		const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: { ocs: { data: {
			path: '/plan.md',
			versionsAvailable: true,
			versions: [version('current', 100_000), version('a', 100_000 - 7200)],
		} } } })

		await summarizeRecentChanges(node())
		await useFileVersions(7).load()

		expect(get).toHaveBeenCalledOnce()
		expect(viewer.compare).toHaveBeenCalledOnce()
		get.mockRestore()
	})
})

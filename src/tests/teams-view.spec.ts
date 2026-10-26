/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import view, { apiVersion } from '../teams.ts'

const { stat, destroy, createEditor } = vi.hoisted(() => ({ stat: vi.fn(), destroy: vi.fn(), createEditor: vi.fn() }))
vi.mock('@nextcloud/files/dav', () => ({ defaultRootPath: '/files/user', getClient: () => ({ stat }), getDefaultPropfind: () => '', resultToNode: (node: object) => node }))
vi.mock('@nextcloud/files', () => ({ FileType: { File: 'file' } }))
vi.mock('../createEditor.ts', () => ({ createCollaborativeEditor: createEditor }))

describe('Text Teams embedded view', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		stat.mockResolvedValue({ type: 'file', fileid: 42, extension: '.md' })
		createEditor.mockResolvedValue({ destroy })
	})

	it('exports only the versioned mount adapter', () => {
		expect(apiVersion).toBe(2)
		expect(Object.keys(view)).toEqual(['mount'])
	})

	it('rechecks access, mounts the supplied page and cleans up', async () => {
		const element = document.createElement('div')
		const cleanup = await view.mount(element, { teamId: 'team', signal: new AbortController().signal }, { id: '42', label: 'Guide', viewData: { path: '/Team/Guide.md' } })
		expect(stat).toHaveBeenCalledWith('/files/user/Team/Guide.md', expect.objectContaining({ signal: expect.any(AbortSignal) }))
		expect(createEditor).toHaveBeenCalledWith({ el: element, context: { type: 'file', id: 42 }, filePath: '/Team/Guide.md' })
		cleanup()
		expect(destroy).toHaveBeenCalledOnce()
	})

	it('rejects a stale or inaccessible file before mounting', async () => {
		stat.mockResolvedValue({ type: 'file', fileid: 99, extension: '.md' })
		await expect(view.mount(document.createElement('div'), { teamId: 'team', signal: new AbortController().signal }, { id: '42', label: 'Guide', viewData: { path: '/Team/Guide.md' } })).rejects.toThrow('not accessible')
		expect(createEditor).not.toHaveBeenCalled()
	})

	it('destroys an editor created after the team scope was aborted', async () => {
		const controller = new AbortController()
		createEditor.mockImplementationOnce(async () => {
			controller.abort()
			return { destroy }
		})
		await expect(view.mount(document.createElement('div'), { teamId: 'team', signal: controller.signal }, { id: '42', label: 'Guide', viewData: { path: '/Team/Guide.md' } })).rejects.toThrow()
		expect(destroy).toHaveBeenCalledOnce()
	})
})

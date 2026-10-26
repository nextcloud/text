/**
 * SPDX-FileCopyrightText: 2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { TeamAppView } from '#server-types/teams'

import { FileType } from '@nextcloud/files'
import { defaultRootPath, getClient, getDefaultPropfind, resultToNode } from '@nextcloud/files/dav'

export const teamsView = {
	async mount(element, context, entry) {
		const path = entry.viewData?.path
		if (typeof path !== 'string' || !path.startsWith('/') || !/^[1-9][0-9]*$/.test(entry.id)) {
			throw new Error('Invalid team page view')
		}
		context.signal.throwIfAborted()
		const response = await getClient().stat(`${defaultRootPath}${path}`, { details: true, data: getDefaultPropfind(), signal: context.signal })
		const node = resultToNode('data' in response ? response.data : response, defaultRootPath)
		if (node.type !== FileType.File || String(node.fileid) !== entry.id || node.extension?.toLowerCase() !== '.md') {
			throw new Error('Team page is not accessible')
		}
		context.signal.throwIfAborted()
		const { createCollaborativeEditor } = await import('../createEditor.ts')
		context.signal.throwIfAborted()
		const editor = await createCollaborativeEditor({ el: element, context: { type: 'file', id: Number(entry.id) }, filePath: path })
		if (context.signal.aborted) {
			editor.destroy()
			context.signal.throwIfAborted()
		}
		return () => editor.destroy()
	},
} satisfies TeamAppView

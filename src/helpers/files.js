/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import TextSvg from '@mdi/svg/svg/text.svg?raw'
import { getCurrentUser } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import {
	addNewFileMenuEntry,
	File,
	NewMenuEntryCategory,
	Permission,
} from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { t } from '@nextcloud/l10n'
import { createApp } from 'vue'
import { logger } from './logger.ts'

const FILE_ACTION_IDENTIFIER = 'Edit with text app'

/**
 *
 */
export function addMenuRichWorkspace() {
	const descriptionFile
		= 'Readme.' + loadState('text', 'default_file_extension')
	addNewFileMenuEntry({
		id: 'rich-workspace-init',
		displayName: t('text', 'Add folder description'),
		category: NewMenuEntryCategory.Other,
		enabled(context) {
			if (!window?.OCA?.Text?.RichWorkspaceEnabled) {
				return false
			}
			if (Number(context.attributes['rich-workspace-file-flat'])) {
				return false
			}
			// Check read permission to not show option in file drop shares
			return (
				(context.permissions & Permission.READ) !== 0
				&& (context.permissions & Permission.CREATE) !== 0
			)
		},
		iconSvgInline: TextSvg,
		async handler(context, content) {
			const contentNames = content.map((node) => node.basename)

			if (contentNames.includes(descriptionFile)) {
				showError(t('text', '"{name}" already exist!', { name: descriptionFile }))
				return
			}

			const source
				= context.encodedSource + '/' + encodeURIComponent(descriptionFile)
			const response = await axios({
				method: 'PUT',
				url: source,
				headers: {
					Overwrite: 'F',
				},
			})
			const fileid = parseInt(response.headers['oc-fileid'])
			const file = new File({
				source: context.source + '/' + descriptionFile,
				id: fileid,
				mtime: new Date(),
				mime: 'text/markdown',
				owner: getCurrentUser()?.uid || null,
				permissions: Permission.ALL,
				root: context?.root || '/files/' + getCurrentUser()?.uid,
			})

			showSuccess(t('text', 'Created "{name}"', { name: descriptionFile }))

			context.attributes['rich-workspace-file-flat'] = fileid
			context.attributes['rich-workspace-flat'] = ''

			emit('files:node:created', file)
			emit('files:node:updated', context)
		},
	})
}

let FilesHeaderRichWorkspaceView
let FilesHeaderRichWorkspaceInstance
let latestFolder

/**
 * Helper function to check if the workspace header should be enabled
 *
 * @param {object} _ current folder (unused)
 * @param {string} view current view
 */
function enabled(_, view) {
	return ['files', 'favorites', 'public-share', 'personal'].includes(view.id)
}

/**
 * @type {import('@nexcloud/files').IFileListHeader}
 */
export const FilesWorkspaceHeader = {
	id: 'workspace',
	order: 10,
	enabled,

	render: async (el, folder) => {
		latestFolder = folder
		// Import the RichWorkspace component only when needed
		if (!FilesHeaderRichWorkspaceView) {
			FilesHeaderRichWorkspaceView = (
				await import('../views/RichWorkspace.vue')
			).default
		}

		// If an instance already exists, destroy it before creating a new one
		if (FilesHeaderRichWorkspaceInstance) {
			FilesHeaderRichWorkspaceInstance.$destroy()
			logger.debug('Destroying existing FilesHeaderRichWorkspaceInstance')
		}

		const hasRichWorkspace
			= !!latestFolder.attributes['rich-workspace-file-flat']
		const content = latestFolder.attributes['rich-workspace-flat'] || ''
		const path = latestFolder.path || ''

		// Create a new instance of the RichWorkspace component
		FilesHeaderRichWorkspaceInstance = createApp(FilesHeaderRichWorkspaceView, {
			content,
			hasRichWorkspace,
			path,
		}).$mount(el)

		window.FilesHeaderRichWorkspaceInstance = FilesHeaderRichWorkspaceInstance
	},

	updated(folder, view) {
		latestFolder = folder
		if (!FilesHeaderRichWorkspaceInstance) {
			logger.error('No vue instance found for FilesWorkspaceHeader')
			return
		}

		const hasRichWorkspace
			= !!folder.attributes['rich-workspace-file-flat'] && enabled(folder, view)
		FilesHeaderRichWorkspaceInstance.hasRichWorkspace = hasRichWorkspace
		FilesHeaderRichWorkspaceInstance.content
			= folder.attributes['rich-workspace-flat'] || ''
		FilesHeaderRichWorkspaceInstance.path = folder.path || ''
	},
}

export { FILE_ACTION_IDENTIFIER }

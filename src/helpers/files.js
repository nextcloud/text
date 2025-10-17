/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCurrentUser } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import {
	addNewFileMenuEntry,
	File,
	Header,
	NewMenuEntryCategory,
	Permission,
} from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'

import TextSvg from '@mdi/svg/svg/text.svg?raw'

import { t } from '@nextcloud/l10n'
import Vue from 'vue'

const FILE_ACTION_IDENTIFIER = 'Edit with text app'

export const addMenuRichWorkspace = () => {
	const descriptionFile =
		t('text', 'Readme') + '.' + loadState('text', 'default_file_extension')
	addNewFileMenuEntry({
		id: 'rich-workspace-init',
		displayName: t('text', 'Add folder description'),
		category: NewMenuEntryCategory.Other,
		enabled(context) {
			if (!window?.OCA?.Text?.RichWorkspaceEnabled) {
				return false
			}
			if (Number(context.attributes['rich-workspace-file'])) {
				return false
			}
			return (context.permissions & Permission.CREATE) !== 0
		},
		iconSvgInline: TextSvg,
		async handler(context, content) {
			const contentNames = content.map((node) => node.basename)

			if (contentNames.includes(descriptionFile)) {
				showError(
					t('text', '"{name}" already exist!', { name: descriptionFile }),
				)
				return
			}

			const source =
				context.encodedSource + '/' + encodeURIComponent(descriptionFile)
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

			context.attributes['rich-workspace-file'] = fileid
			context.attributes['rich-workspace'] = ''

			emit('files:node:created', file)
			emit('files:node:updated', context)
		},
	})
}

let FilesHeaderRichWorkspaceView
let FilesHeaderRichWorkspaceInstance
let latestFolder

const enabled = (_, view) => {
	return ['files', 'favorites', 'public-share'].includes(view.id)
}

export const FilesWorkspaceHeader = new Header({
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
			console.debug('Destroying existing FilesHeaderRichWorkspaceInstance')
		}

		const hasRichWorkspace = !!latestFolder.attributes['rich-workspace-file']
		const content = latestFolder.attributes['rich-workspace'] || ''
		const path = latestFolder.path || ''

		// Create a new instance of the RichWorkspace component
		FilesHeaderRichWorkspaceInstance = new Vue({
			extends: FilesHeaderRichWorkspaceView,
			propsData: {
				content,
				hasRichWorkspace,
				path,
			},
		}).$mount(el)

		window.FilesHeaderRichWorkspaceInstance = FilesHeaderRichWorkspaceInstance
	},

	updated(folder, view) {
		latestFolder = folder
		if (!FilesHeaderRichWorkspaceInstance) {
			console.error('No vue instance found for FilesWorkspaceHeader')
			return
		}

		const hasRichWorkspace =
			!!folder.attributes['rich-workspace-file'] && enabled(folder, view)
		FilesHeaderRichWorkspaceInstance.hasRichWorkspace = hasRichWorkspace
		FilesHeaderRichWorkspaceInstance.content =
			folder.attributes['rich-workspace'] || ''
		FilesHeaderRichWorkspaceInstance.path = folder.path || ''
	},
})

export { FILE_ACTION_IDENTIFIER }

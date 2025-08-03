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
import { imagePath } from '@nextcloud/router'
import { getSharingToken } from '@nextcloud/sharing/public'

import TextSvg from '@mdi/svg/svg/text.svg?raw'

import { t } from '@nextcloud/l10n'
import Vue from 'vue'
import { openMimetypes } from './mime.js'

const FILE_ACTION_IDENTIFIER = 'Edit with text app'

const registerFileCreate = () => {
	const newFileMenuPlugin = {
		attach(menu) {
			const fileList = menu.fileList

			// only attach to main file list, public view is not supported yet
			if (fileList.id !== 'files' && fileList.id !== 'files.public') {
				return
			}

			// register the new menu entry
			menu.addMenuEntry({
				id: 'file',
				displayName: t('text', 'New text file'),
				templateName:
					t('text', 'New text file')
					+ '.'
					+ loadState('text', 'default_file_extension'),
				iconClass: 'icon-filetype-text',
				fileType: 'file',
				actionLabel: t('text', 'Create new text file'),
				actionHandler(name) {
					fileList.createFile(name).then(function (status, data) {
						const fileInfoModel = new OCA.Files.FileInfoModel(data)
						if (typeof OCA.Viewer !== 'undefined') {
							OCA.Files.fileActions.triggerAction(
								'view',
								fileInfoModel,
								fileList,
							)
						} else if (typeof OCA.Viewer === 'undefined') {
							OCA.Files.fileActions.triggerAction(
								FILE_ACTION_IDENTIFIER,
								fileInfoModel,
								fileList,
							)
						}
					})
				},
			})
		},
	}
	OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin)
}

const registerFileActionFallback = () => {
	const sharingToken = getSharingToken()
	const filesTable = document.querySelector('#preview table.files-filestable')
	if (!sharingToken || !filesTable) {
		const ViewerRoot = document.createElement('div')
		ViewerRoot.id = 'text-viewer-fallback'
		document.body.appendChild(ViewerRoot)
		const registerAction = (mime) =>
			OCA.Files.fileActions.register(
				mime,
				FILE_ACTION_IDENTIFIER,
				OC.PERMISSION_UPDATE | OC.PERMISSION_READ,
				imagePath('core', 'actions/rename'),
				(filename) => {
					const file = window.FileList.findFile(filename)
					Promise.all([
						import('vue'),
						import(
							/* webpackChunkName: "files-modal" */ './../components/PublicFilesEditor.vue'
						),
					]).then((imports) => {
						const path =
							window.FileList.getCurrentDirectory() + '/' + filename
						const Vue = imports[0].default
						const Editor = imports[1].default
						const vm = new Vue({
							render: (h) => {
								// eslint-disable-line
								const self = this
								return h(Editor, {
									props: {
										fileId: file ? file.id : null,
										active: true,
										shareToken: sharingToken,
										relativePath: path,
										mimeType: file.mimetype,
									},
									on: {
										close: () => {
											// eslint-disable-line
											self.$destroy()
										},
									},
								})
							},
						})
						vm.$mount(ViewerRoot)
					})
				},
				t('text', 'Edit'),
			)

		for (let i = 0; i < openMimetypes.length; i++) {
			registerAction(openMimetypes[i])
			OCA.Files.fileActions.setDefault(
				openMimetypes[i],
				FILE_ACTION_IDENTIFIER,
			)
		}
	}
}

export const addMenuRichWorkspace = () => {
	const descriptionFile =
		t('text', 'Readme') + '.' + loadState('text', 'default_file_extension')
	addNewFileMenuEntry({
		id: 'rich-workspace-init',
		displayName: t('text', 'Add folder description'),
		category: NewMenuEntryCategory.Other,
		enabled(context) {
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

export { FILE_ACTION_IDENTIFIER, registerFileActionFallback, registerFileCreate }

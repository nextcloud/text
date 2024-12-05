/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCurrentUser } from '@nextcloud/auth'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { emit } from '@nextcloud/event-bus'
import { Header, addNewFileMenuEntry, Permission, File, NewMenuEntryCategory } from '@nextcloud/files'
import { loadState } from '@nextcloud/initial-state'
import { imagePath } from '@nextcloud/router'
import { dirname } from 'path'

import { getSharingToken } from './token.js'
import { openMimetypes } from './mime.js'
import store from '../store/index.js'
import axios from '@nextcloud/axios'

import TextSvg from '@mdi/svg/svg/text.svg?raw'

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
				templateName: t('text', 'New text file') + '.' + loadState('text', 'default_file_extension'),
				iconClass: 'icon-filetype-text',
				fileType: 'file',
				actionLabel: t('text', 'Create new text file'),
				actionHandler(name) {
					fileList.createFile(name).then(function(status, data) {
						const fileInfoModel = new OCA.Files.FileInfoModel(data)
						if (typeof OCA.Viewer !== 'undefined') {
							OCA.Files.fileActions.triggerAction('view', fileInfoModel, fileList)
						} else if (typeof OCA.Viewer === 'undefined') {
							OCA.Files.fileActions.triggerAction(FILE_ACTION_IDENTIFIER, fileInfoModel, fileList)
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
		const registerAction = (mime) => OCA.Files.fileActions.register(
			mime,
			FILE_ACTION_IDENTIFIER,
			OC.PERMISSION_UPDATE | OC.PERMISSION_READ,
			imagePath('core', 'actions/rename'),
			(filename) => {
				const file = window.FileList.findFile(filename)
				Promise.all([
					import('vue'),
					import(/* webpackChunkName: "files-modal" */'./../components/PublicFilesEditor.vue'),
				]).then((imports) => {
					const path = window.FileList.getCurrentDirectory() + '/' + filename
					const Vue = imports[0].default
					Vue.prototype.t = window.t
					Vue.prototype.n = window.n
					Vue.prototype.OCA = window.OCA
					const Editor = imports[1].default
					const vm = new Vue({
						render: function(h) { // eslint-disable-line
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
									close: function() { // eslint-disable-line
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
			OCA.Files.fileActions.setDefault(openMimetypes[i], FILE_ACTION_IDENTIFIER)
		}
	}

}

let newWorkspaceCreated = false

export const addMenuRichWorkspace = () => {
	const descriptionFile = t('text', 'Readme') + '.' + loadState('text', 'default_file_extension')
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
				showError(t('text', '"{name}" already exist!', { name: descriptionFile }))
				return
			}

			const source = context.encodedSource + '/' + encodeURIComponent(descriptionFile)
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

			if (contentNames.length === 0) {
				// We currently have no way to reliably trigger the filelist header rendering
				// When starting off in a new empty folder the header will only be rendered on a new PROPFIND
				newWorkspaceCreated = file
			}
			emit('files:node:created', file)
		},
	})
}

let vm = null

export const FilesWorkspaceHeader = new Header({
	id: 'workspace',
	order: 10,

	enabled(folder, view) {
		return view.id === 'files' || view.id === 'favorites'
	},

	async render(el, folder, view) {
		if (vm) {
			// Enforce destroying of the old rendering and rerender as the FilesListHeader calls render on every folder change
			vm.$destroy()
			vm = null
		}
		const hasRichWorkspace = !!folder.attributes['rich-workspace-file'] || !!newWorkspaceCreated
		const path = newWorkspaceCreated ? dirname(newWorkspaceCreated.path) : folder.path
		const content = newWorkspaceCreated ? '' : folder.attributes['rich-workspace']

		newWorkspaceCreated = false

		const { default: RichWorkspace } = await import('./../views/RichWorkspace.vue')

		import('vue').then((module) => {
			el.id = 'files-workspace-wrapper'

			// Todo: remove this hack
			const Vue = module.default
			Vue.prototype.t = window.t
			Vue.prototype.n = window.n
			Vue.prototype.OCA = window.OCA

			const View = Vue.extend(RichWorkspace)
			vm = new View({
				propsData: {
					path,
					hasRichWorkspace,
					content,
				},
				store,
			}).$mount(el)
		})
	},

	updated(folder, view) {
		newWorkspaceCreated = false

		if (!vm) {
			console.warn('No vue instance found for FilesWorkspaceHeader')
			return
		}

		// Currently there is not much use in updating the vue instance props since render is called on every folder change
		// removing the rendered element from the DOM
		// This is only relevant if switching to a folder that has no content as then the render function is not called

		const hasRichWorkspace = !!folder.attributes['rich-workspace-file']
		vm.path = folder.path
		vm.hasRichWorkspace = hasRichWorkspace
		vm.content = folder.attributes['rich-workspace']
	},
})

export {
	registerFileActionFallback,
	registerFileCreate,
	FILE_ACTION_IDENTIFIER,
}

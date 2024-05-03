/**
 * SPDX-FileCopyrightText: 2022 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'
// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

import {
	registerFileActionFallback,
	registerFileCreate,
} from './helpers/files.js'
import { logger } from './helpers/logger.js'
import { openMimetypes } from './helpers/mime.js'
import { documentReady } from './helpers/index.js'
import store from './store/index.js'
import { emit, subscribe } from '@nextcloud/event-bus'
import RichWorkspace from './views/RichWorkspace.vue'

const newRichWorkspaceFileMenuPlugin = {
	attach(menu) {
		const fileList = menu.fileList
		const descriptionFile = t('text', 'Readme') + '.' + loadState('text', 'default_file_extension')
		// only attach to main file list, public view is not supported yet
		if (fileList.id !== 'files' && fileList.id !== 'files.public') {
			return
		}

		// register the new menu entry
		menu.addMenuEntry({
			id: 'rich-workspace-init',
			displayName: t('text', 'Add folder description'),
			templateName: descriptionFile,
			iconClass: 'icon-add-folder-description',
			fileType: 'file',
			useInput: false,
			actionHandler() {
				return window.FileList
					.createFile(descriptionFile, { scrollTo: false, animate: false })
					.then(() => emit('Text::showRichWorkspace', { autofocus: true }))
			},
			shouldShow() {
				return !fileList.findFile(descriptionFile)
			},
		})
	},
}

const filesWorkspacePlugin = {
	el: null,

	attach(fileList) {
		if (fileList.id !== 'files' && fileList.id !== 'files.public') {
			return
		}
		this.el = document.createElement('div')
		fileList.registerHeader({
			id: 'workspace',
			el: this.el,
			render: this.render.bind(this),
			priority: 10,
		})
	},

	render(fileList) {
		if (fileList.id !== 'files' && fileList.id !== 'files.public') {
			return
		}

		OC.Plugins.register('OCA.Files.NewFileMenu', newRichWorkspaceFileMenuPlugin)
		import('vue').then((module) => {
			const Vue = module.default
			this.el.id = 'files-workspace-wrapper'
			Vue.prototype.t = window.t
			Vue.prototype.n = window.n
			Vue.prototype.OCA = window.OCA
			const View = Vue.extend(RichWorkspace)
			const vm = new View({
				propsData: {
					path: fileList.getCurrentDirectory(),
					hasRichWorkspace: true,
				},
				store,
			}).$mount(this.el)
			subscribe('files:navigation:changed', () => {
				// Expose if the default file list is active to the component
				// to only render the workspace if the file list is actually visible
				vm.active = OCA.Files.App.getCurrentFileList() === fileList
			})
			fileList.$el.on('urlChanged', data => {
				vm.path = data.dir.toString()
			})
			fileList.$el.on('changeDirectory', data => {
				vm.path = data.dir.toString()
			})
		})
	},
}

const loadEditor = ({ sharingToken, mimetype, fileId, $el }) => {
	const container = document.createElement('div')
	container.id = 'texteditor'

	document.getElementById('app-content').appendChild(container)

	Promise.all([
		import(/* webpackChunkName: "vendor" */'vue'),
		import(/* webpackChunkName: "editor" */'./components/Editor.vue'),
	])
		.then(([vue, editor]) => ({
			Vue: vue.default,
			Editor: editor.default,
		}))
		.then(({ Vue, Editor }) => {
			Vue.prototype.t = window.t
			Vue.prototype.OCA = window.OCA

			new Vue({
				render: h => h(Editor, {
					props: {
						active: true,
						shareToken: sharingToken,
						mime: mimetype,
						fileId,
					},
				}),
				store,
			})
				.$mount($el)

		})
		.catch((error) => logger.error('Failed to attach editor', { error }))
}

documentReady(() => {
	const sharingToken = document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null

	if (!sharingToken) {
		return
	}

	const filesTable = document.querySelector('#preview table.files-filestable')

	// list of files - dir sharing
	if (filesTable) {
		OC.Plugins.register('OCA.Files.FileList', filesWorkspacePlugin)
		registerFileActionFallback()
		registerFileCreate()
		return
	}

	// single file share
	const mimetype = document.getElementById('mimetype')?.value
	if (mimetype && openMimetypes.indexOf(mimetype) !== -1) {
		const $el = document.getElementById('preview')
		const fileId = loadState('text', 'file_id')
		loadEditor({ mimetype, sharingToken, fileId, $el })
	}
})

OCA.Text = {
	RichWorkspaceEnabled: loadState('text', 'workspace_available'),
}

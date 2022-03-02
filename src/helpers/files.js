/*
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import { openMimetypes } from './mime'
import RichWorkspace from '../views/RichWorkspace'
import { imagePath } from '@nextcloud/router'
import store from '../store'

const FILE_ACTION_IDENTIFIER = 'Edit with text app'

const optimalPath = function(from, to) {
	const current = from.split('/')
	const target = to.split('/')
	current.pop() // ignore filename
	while (current[0] === target[0]) {
		current.shift()
		target.shift()
	}
	const relativePath = current.fill('..').concat(target)
	const absolutePath = to.split('/')
	return relativePath.length < absolutePath.length
		? relativePath.join('/')
		: to
}

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
				displayName: t('text', 'New text document'),
				templateName: t('text', 'New text document') + '.md',
				iconClass: 'icon-filetype-text',
				fileType: 'file',
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
	const sharingToken = document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null
	const dir = document.getElementById('dir').value

	if (!sharingToken || dir !== '') {
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
					import(/* webpackChunkName: "files-modal" */'./../components/PublicFilesEditor'),
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
			t('text', 'Edit')
		)

		for (let i = 0; i < openMimetypes.length; i++) {
			registerAction(openMimetypes[i])
			OCA.Files.fileActions.setDefault(openMimetypes[i], FILE_ACTION_IDENTIFIER)
		}
	}

}

const FilesWorkspacePlugin = {

	el: null,
	vm: null,

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

		const PROPERTY_WORKSPACE_FILE = `{${OC.Files.Client.NS_NEXTCLOUD}}rich-workspace-file`

		const oldGetWebdavProperties = fileList._getWebdavProperties
		fileList._getWebdavProperties = function() {
			return [
				...oldGetWebdavProperties.apply(this, arguments),
				PROPERTY_WORKSPACE_FILE,
			]
		}

		let readmeId = null

		fileList.filesClient.addFileInfoParser((response, data) => {
			if (data.mimetype === 'httpd/unix-directory') {
				const props = response.propStat[0].properties
				const dir = data.path + (data.path.endsWith('/') ? '' : '/') + data.name
				if (dir === fileList.getCurrentDirectory()) {
					readmeId = props[PROPERTY_WORKSPACE_FILE]
					this.vm.folder = {
						permissions: data.permissions,
					}
					this.vm.loaded = true
					// in case no file is found we are done
					this.vm.ready = true
				}
			}
			if (readmeId && data.id === readmeId) {
				if (data.mimetype !== 'text/markdown') {
					console.warn('Expected workspace file to be markdown:', data)
				}
				this.open(data)
				return
			}
			/*
			 * Handle the creation of 'Readme.md'.
			 * The PROPFIND after the creation does not include the parent dir.
			 */
			if (data.name === 'Readme.md'
				&& data.mimetype === 'text/markdown'
				&& data.path === fileList.getCurrentDirectory()) {
				this.open(data)
			}
		})

	},

	render(fileList) {
		if (fileList.id !== 'files' && fileList.id !== 'files.public') {
			return
		}

		import('vue').then((module) => {
			const Vue = module.default
			this.el.id = 'files-workspace-wrapper'
			Vue.prototype.t = window.t
			Vue.prototype.n = window.n
			Vue.prototype.OCA = window.OCA
			const View = Vue.extend(RichWorkspace)
			this.vm = new View({
				propsData: {
					file: null,
					folder: null,
				},
				store,
			}).$mount(this.el)

			fileList.$el.on('urlChanged', data => {
				this.vm.file = null
				this.vm.folder = null
			})
			fileList.$el.on('changeDirectory', data => {
				this.vm.file = null
				this.vm.folder = null
			})
		})
	},

	open(data) {
		this.vm.file = {
			...data,
			id: parseInt(data.id),
		}
		// waiting for the editor to be ready
		this.vm.ready = false
	},
}

export {
	optimalPath,
	registerFileActionFallback,
	registerFileCreate,
	FilesWorkspacePlugin,
	FILE_ACTION_IDENTIFIER,
}

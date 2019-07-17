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

/**
 * Callback that should be executed after the document is ready
 * @param callback
 */
import axios from 'axios'
import { generateRemoteUrl } from 'nextcloud-server/dist/router'
import { openMimetypes } from './mime'

const FILE_ACTION_IDENTIFIER = 'Edit with text app'

const fetchFileInfo = async function(user, path) {
	const response = await axios({
		method: 'PROPFIND',
		url: generateRemoteUrl(`dav/files/${user}${path}`),
		headers: {
			requesttoken: OC.requestToken,
			'content-Type': 'text/xml'
		},
		data: `<?xml version="1.0"?>
<d:propfind  xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns" xmlns:ocs="http://open-collaboration-services.org/ns">
  <d:prop>
    <d:getlastmodified />
    <d:getetag />
    <d:getcontenttype />
    <d:resourcetype />
    <oc:fileid />
    <oc:permissions />
    <oc:size />
    <d:getcontentlength />
    <nc:has-preview />
    <nc:mount-type />
    <nc:is-encrypted />
    <ocs:share-permissions />
    <oc:tags />
    <oc:favorite />
    <oc:comments-unread />
    <oc:owner-id />
    <oc:owner-display-name />
    <oc:share-types />
  </d:prop>
</d:propfind>`
	})

	const files = OCA.Files.App.fileList.filesClient._client.parseMultiStatus(response.data)
	return files.map(file => {
		const fileInfo = OCA.Files.App.fileList.filesClient._parseFileInfo(file)
		fileInfo.href = file.href
		return fileInfo
	})
}

const registerFileCreate = () => {
	const newFileMenuPlugin = {
		attach: function(menu) {
			var fileList = menu.fileList

			// only attach to main file list, public view is not supported yet
			if (fileList.id !== 'files' && fileList.id !== 'files.public') {
				return
			}

			// register the new menu entry
			menu.addMenuEntry({
				id: 'file',
				displayName: t('text', 'New text document'),
				templateName: t('text', 'New text document.md'),
				iconClass: 'icon-filetype-text',
				fileType: 'file',
				actionHandler: function(name) {
					fileList.createFile(name).then(function(status, data) {
						let fileInfoModel = new OCA.Files.FileInfoModel(data)
						if (typeof OCA.Viewer !== 'undefined') {
							OCA.Files.fileActions.triggerAction('view', fileInfoModel, fileList)
						} else if (typeof OCA.Viewer === 'undefined') {
							OCA.Files.fileActions.triggerAction(FILE_ACTION_IDENTIFIER, fileInfoModel, fileList)
						}
					})
				}
			})
		}
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
			OC.imagePath('core', 'actions/rename'),
			(filename) => {
				const file = window.FileList.findFile(filename)
				Promise.all([
					import('vue'),
					import(/* webpackChunkName: "files-modal" */'./../components/PublicFilesEditor')
				]).then((imports) => {
					const path = window.FileList.getCurrentDirectory() + '/' + filename
					const Vue = imports[0].default
					Vue.prototype.t = window.t
					Vue.prototype.n = window.n
					Vue.prototype.OCA = window.OCA
					const Editor = imports[1].default
					const vm = new Vue({
						render: h => h(Editor, {
							props: {
								fileId: file ? file.id : null,
								active: true,
								shareToken: sharingToken,
								relativePath: path,
								mimeType: file.mimetype
							}
						})
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

export {
	fetchFileInfo,
	registerFileActionFallback,
	registerFileCreate,
	FILE_ACTION_IDENTIFIER
}

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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import FilesEditor from './components/FilesEditor'
import PreviewPlugin from './files/PreviewPlugin'
import RichWorkspace from './views/RichWorkspace'

import { registerFileActionFallback, registerFileCreate } from './helpers/files'
import { openMimetypesMarkdown, openMimetypesPlainText } from './helpers/mime'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

registerFileCreate()

document.addEventListener('DOMContentLoaded', () => {
	if (typeof OCA.Viewer === 'undefined') {
		console.error('Viewer app is not installed')
		registerFileActionFallback()
		return
	}
	OCA.Viewer.registerHandler({
		id: 'text',
		mimes: [...openMimetypesMarkdown, ...openMimetypesPlainText],
		component: FilesEditor,
		group: null
	})
	OC.Plugins.register('OCA.Files.SidebarPreviewManager', new PreviewPlugin())

})

const FilesPlugin = {

	el: null,

	attach: (fileList) => {
		if (fileList.id !== 'files') {
			return
		}

		FilesPlugin.el = document.createElement('div')
		fileList.registerHeader({
			id: 'workspace',
			el: FilesPlugin.el,
			render: FilesPlugin.render.bind(FilesPlugin),
			priority: 10
		})
	},

	render: (fileList) => {

		import('vue').then((module) => {
			const Vue = module.default
			FilesPlugin.el.id = 'files-workspace-wrapper'
			Vue.prototype.t = window.t
			Vue.prototype.n = window.n
			Vue.prototype.OCA = window.OCA
			const View = Vue.extend(RichWorkspace)
			const vm = new View({
				propsData: {
					path: fileList.getCurrentDirectory()
				}
			}).$mount(FilesPlugin.el)

			fileList.$el.on('changeDirectory', data => {
				vm.path = data.dir.toString()
			})
		})
	}
}

OC.Plugins.register('OCA.Files.FileList', FilesPlugin)

OCA.Text = {
	Editor: FilesEditor
}

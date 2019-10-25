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
import { registerFileActionFallback, registerFileCreate, FilesWorkspacePlugin } from './helpers/files'
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

OC.Plugins.register('OCA.Files.FileList', FilesWorkspacePlugin)

OCA.Text = {
	Editor: FilesEditor
}

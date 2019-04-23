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

const newFileMenuPlugin = {

	attach: function (menu) {
		var fileList = menu.fileList;

		// only attach to main file list, public view is not supported yet
		if (fileList.id !== 'files') {
			return;
		}

		// register the new menu entry
		menu.addMenuEntry({
			id: 'file',
			displayName: t('text', 'New text document'),
			templateName: t('text', 'New text document.md'),
			iconClass: 'icon-filetype-text',
			fileType: 'file',
			actionHandler: function (name) {
				var dir = fileList.getCurrentDirectory();
				// first create the file
				fileList.createFile(name).then(function () {
					// TODO: open editor
				});
			}
		});
	}
};
OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin);

import Editor from './components/Editor'
$(document).ready(function() {
	OCA.Viewer.registerHandler({
		id: 'text',
		mimes: ['text/markdown'],
		component: Editor,
		group: null
	});
});

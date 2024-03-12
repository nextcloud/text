/**
 * @copyright Copyright (c) 2019 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license AGPL-3.0-or-later
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
import { loadState } from '@nextcloud/initial-state'

import { logger } from './helpers/logger.js'
// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

const workspaceAvailable = loadState('text', 'workspace_available')
const workspaceEnabled = loadState('text', 'workspace_enabled')

document.addEventListener('DOMContentLoaded', async () => {
	if (typeof OCA.Viewer === 'undefined') {
		const { registerFileActionFallback } = await import('./helpers/files.js')
		logger.error('Viewer app is not installed')
		registerFileActionFallback()
	}

	if (workspaceAvailable && OCA && OCA?.Files?.Settings) {
		const { default: Vue } = await import('vue')
		const { default: FilesSettings } = await import('./views/FilesSettings.vue')
		const { default: store } = await import('./store/index.js')

		Vue.prototype.t = window.t
		Vue.prototype.n = window.n
		Vue.prototype.OCA = window.OCA
		const vm = new Vue({
			render: h => h(FilesSettings, {}),
			store,
		})
		const el = vm.$mount().$el
		OCA.Files.Settings.register(new OCA.Files.Settings.Setting('text', {
			el: () => { return el },
		}))
	}
})

OCA.Text = {
	RichWorkspaceEnabled: workspaceEnabled,
}

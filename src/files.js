/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { loadState } from '@nextcloud/initial-state'

import { logger } from './helpers/logger.js'
// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

const workspaceAvailable = loadState('text', 'workspace_available')
const workspaceEnabled = loadState('text', 'workspace_enabled')
const openReadOnlyEnabled = loadState('text', 'open_read_only_enabled')

document.addEventListener('DOMContentLoaded', async () => {
	if (typeof OCA.Viewer === 'undefined') {
		const { registerFileActionFallback } = await import('./helpers/files.js')
		logger.error('Viewer app is not installed')
		registerFileActionFallback()
	}

	if (workspaceAvailable && OCA && OCA?.Files?.Settings) {
		const { default: Vue } = await import('vue')
		const { default: FilesSettings } = await import('./views/FilesSettings.vue')

		Vue.prototype.t = window.t
		Vue.prototype.n = window.n
		Vue.prototype.OCA = window.OCA
		const vm = new Vue({
			render: h => h(FilesSettings, {}),
		})
		const el = vm.$mount().$el
		OCA.Files.Settings.register(new OCA.Files.Settings.Setting('text', {
			el: () => { return el },
		}))
	}
})

OCA.Text = {
	RichWorkspaceEnabled: workspaceEnabled,
	OpenReadOnlyEnabled: openReadOnlyEnabled,
}

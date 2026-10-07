/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { loadState } from '@nextcloud/initial-state'
import { initialize } from './oca.text'

// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

initialize()

const workspaceAvailable = loadState('text', 'workspace_available')

document.addEventListener('DOMContentLoaded', async () => {
	if (workspaceAvailable && window.OCA && window.OCA.Files?.Settings) {
		const { default: Vue } = await import('vue')
		const { default: FilesSettings } = await import('./views/FilesSettings.vue')

		const vm = new Vue({
			render: (h) => h(FilesSettings, {}),
		})
		const el = vm.$mount().$el
		window.OCA.Files.Settings.register(
			new window.OCA.Files.Settings.Setting('text', {
				el: () => {
					return el
				},
			}),
		)
	}
})

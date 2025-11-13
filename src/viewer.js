/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
// eslint-disable-next-line import/no-unresolved, n/no-missing-import
import 'vite/modulepreload-polyfill'

import { logger } from './helpers/logger.js'
import { openMimetypesMarkdown, openMimetypesPlainText } from './helpers/mime.js'

/**
 * Wrapper for async registration of ViewerComponent.
 * Note: it should be named function - the name is used for component registration.
 *
 * @return {Promise<import('./components/ViewerComponent.vue')>} ViewerComponent
 */
function AsyncTextViewerComponent() {
	return import('./components/ViewerComponent.vue')
}

if (typeof OCA.Viewer === 'undefined') {
	logger.error('Viewer app is not installed')
} else {
	OCA.Viewer.registerHandler({
		id: 'text',
		mimes: [...openMimetypesMarkdown, ...openMimetypesPlainText],
		component: AsyncTextViewerComponent,
		group: null,
		theme: 'default',
		canCompare: true,
		downloadCallback: async (fileInfo) => {
			// Save any unsaved changes before download
			const editors = window.OCA?.Text?.editorComponents
			if (editors instanceof Set) {
				for (const editor of editors) {
					if (editor?.fileId === fileInfo.fileid && editor?.dirty) {
						logger.debug('Saving file before download', {
							fileId: fileInfo.fileid,
						})
						await editor.save()
						return
					}
				}
			}
		},
	})
}

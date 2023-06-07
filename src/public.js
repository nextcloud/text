import { loadState } from '@nextcloud/initial-state'

import {
	FilesWorkspacePlugin,
	registerFileActionFallback,
	registerFileCreate,
} from './helpers/files.js'
import { logger } from './helpers/logger.js'
import { openMimetypes } from './helpers/mime.js'
import { documentReady } from './helpers/index.js'
import store from './store/index.js'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

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
		OC.Plugins.register('OCA.Files.FileList', FilesWorkspacePlugin)
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

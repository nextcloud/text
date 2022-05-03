import { documentReady } from './helpers/index.js'
import {
	FilesWorkspacePlugin,
	registerFileActionFallback,
	registerFileCreate,
} from './helpers/files.js'
import { openMimetypes } from './helpers/mime.js'
import { loadState } from '@nextcloud/initial-state'
import store from './store.js'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

documentReady(() => {
	const dir = document.getElementById('dir').value
	const mimetype = document.getElementById('mimetype').value
	const sharingToken = document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null

	if (!sharingToken) {
		return
	}

	if (dir !== '') {
		OC.Plugins.register('OCA.Files.FileList', FilesWorkspacePlugin)
		registerFileActionFallback()
		registerFileCreate()
	} else {
		// single file share
		const container = document.createElement('div')
		container.id = 'texteditor'
		const body = document.getElementById('app-content')
		body.appendChild(container)

		if (openMimetypes.indexOf(mimetype) !== -1) {
			Promise.all([
				import(/* webpackChunkName: "vendor" */'vue'),
				import(/* webpackChunkName: "editor" */'./components/EditorWrapper.vue'),
			]).then((imports) => {
				const Vue = imports[0].default
				Vue.prototype.t = window.t
				Vue.prototype.OCA = window.OCA
				const Editor = imports[1].default
				const vm = new Vue({
					render: h => h(Editor, {
						props: {
							active: true,
							shareToken: sharingToken,
							mime: mimetype,
						},
					}),
					store,
				})
				vm.$mount(document.getElementById('preview'))
			})
		}
	}
})

OCA.Text = {
	RichWorkspaceEnabled: loadState('text', 'workspace_available'),
}

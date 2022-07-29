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

const loadEditor = ({ sharingToken, mimetype, $el }) => {
	const container = document.createElement('div')
	container.id = 'texteditor'

	document.getElementById('app-content').appendChild(container)

	Promise.all([
		import(/* webpackChunkName: "vendor" */'vue'),
		import(/* webpackChunkName: "editor" */'./components/EditorWrapper.vue'),
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
					},
				}),
				store,
			})
				.$mount($el)

		})
		.catch(console.error)
}

documentReady(() => {
	const mimetype = document.getElementById('mimetype').value
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
	if (openMimetypes.indexOf(mimetype) !== -1) {
		loadEditor({ mimetype, sharingToken, $el: document.getElementById('preview') })
	}
})

OCA.Text = {
	RichWorkspaceEnabled: loadState('text', 'workspace_available'),
}

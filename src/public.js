import { documentReady } from './helpers'
import { registerFileActionFallback, registerFileCreate } from './helpers/files'
import { openMimetypes } from './helpers/mime'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

documentReady(() => {
	const dir = document.getElementById('dir').value
	const mimetype = document.getElementById('mimetype').value
	const sharingToken = document.getElementById('sharingToken') ? document.getElementById('sharingToken').value : null

	if (dir !== '') {
		registerFileActionFallback()
		registerFileCreate()
	} else {
		// single file share
		const container = document.createElement('div')
		container.id = 'texteditor'
		const body = document.getElementById('app-content')
		body.append(container)

		if (openMimetypes.indexOf(mimetype) !== -1) {
			Promise.all([
				import(/* webpackChunkName: "vendor" */'vue'),
				import(/* webpackChunkName: "editor" */'./components/EditorWrapper')
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
							mime: mimetype
						}
					})
				})
				vm.$mount(document.getElementById('preview'))
			})
		}
	}
})

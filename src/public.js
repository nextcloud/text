import { documentReady } from './helpers'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

documentReady(() => {
	const sharingToken = document.getElementById('sharingToken').value
	const dir = document.getElementById('dir').value
	const mimetype = document.getElementById('mimetype').value

	// Load regular viewer integration
	if (dir !== '') {
		// TODO: implement for public file lists
		// import('./files')
	}

	const container = document.createElement('div')
	container.id = 'texteditor'
	const body = document.getElementById('app-content')
	body.append(container)

	if (mimetype === 'text/markdown') {
		Promise.all([
			import('vue'),
			import('./components/EditorWrapper')
		]).then((imports) => {
			const Vue = imports[0].default
			Vue.prototype.t = window.t
			Vue.prototype.OCA = window.OCA
			const Editor = imports[1].default
			const vm = new Vue({
				render: h => h(Editor, {
					props: {
						active: true,
						shareToken: sharingToken
					}
				})
			})
			vm.$mount(document.getElementById('preview'))
		})
	}
})

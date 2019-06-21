import { documentReady } from './helpers'
import { newFileMenuPlugin } from './publicPlugins'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

documentReady(() => {
	const sharingToken = document.getElementById('sharingToken').value
	const dir = document.getElementById('dir').value
	const mimetype = document.getElementById('mimetype').value

	// Load regular viewer integration
	if (dir !== '') {
		const ViewerRoot = document.createElement('div')
		ViewerRoot.id = 'viewerpublic'
		document.body.appendChild(ViewerRoot)
		OC.Plugins.register('OCA.Files.NewFileMenu', newFileMenuPlugin)
		OCA.Files.fileActions.register(
			'text/markdown',
			'Edit with text',
			OC.PERMISSION_UPDATE | OC.PERMISSION_READ,
			OC.imagePath('core', 'actions/rename'),
			(filename) => {
				Promise.all([
					import('vue'),
					import('./components/PublicFilesEditor')
				]).then((imports) => {
					const path = window.FileList.getCurrentDirectory() + '/' + filename
					const Vue = imports[0].default
					Vue.prototype.t = window.t
					Vue.prototype.OCA = window.OCA
					const Editor = imports[1].default
					const vm = new Vue({
						render: h => h(Editor, {
							props: {
								active: true,
								shareToken: sharingToken,
								relativePath: path
							}
						})
					})
					vm.$mount(ViewerRoot)
				})
			},
			t('text', 'Edit')
		)
		OCA.Files.fileActions.setDefault('text/markdown', 'Edit with text')
	} else {
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
	}
})

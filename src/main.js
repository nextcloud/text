import FilesEditor from './components/FilesEditor'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

if (document.getElementById('maineditor')) {
	Promise.all([
		import(/* webpackChunkName: "editor" */'vue'),
		import(/* webpackChunkName: "editor" */'./components/EditorWrapper')
	]).then((imports) => {
		const Vue = imports[0].default
		Vue.prototype.t = window.t
		Vue.prototype.OCA = window.OCA
		const Editor = imports[1].default
		const vm = new Vue({
			render: h => h(Editor, {
				props: {
					fileId: OCP.InitialState.loadState('text', 'direct_file_id'),
					active: true,
					directToken: OCP.InitialState.loadState('text', 'direct_token'),
					mime: OCP.InitialState.loadState('text', 'direct_mime')
				}
			})
		})
		vm.$mount(document.getElementById('content'))
	})
}

OCA.Text = {
	Editor: FilesEditor
}

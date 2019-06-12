import Vue from 'vue'
import Editor from './components/EditorWrapper'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

Vue.prototype.t = t
Vue.prototype.OCA = OCA

if (document.getElementById('maineditor')) {
	new Vue({
		render: h => h(Editor, {
			props: {
				relativePath: '/welcome.md',
				active: true
			}
		})
	}).$mount('#maineditor')
}

OCA.Text = {
	Editor
}

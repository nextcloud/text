import Vue from 'vue'

import Editor from './components/Editor'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line

Vue.prototype.t = t
Vue.prototype.OCA = OCA

new Vue({
	render: h => h(Editor, {
		props: {
			relativePath: '/welcome.md',
			active: true
		}
	})

}).$mount('#maineditor')

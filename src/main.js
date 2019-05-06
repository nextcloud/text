import Vue from 'vue'

__webpack_nonce__ = btoa(OC.requestToken); // eslint-disable-line no-native-reassign

Vue.prototype.t = t
Vue.prototype.OCA = OCA

import Editor from './components/Editor'
new Vue({
	render: h => h(Editor, {
		props: {
			relativePath: '/welcome.md',
			active: true
		}
	}),

}).$mount('#maineditor')

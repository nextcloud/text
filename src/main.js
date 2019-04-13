import Vue from 'vue'

__webpack_nonce__ = btoa(OC.requestToken); // eslint-disable-line no-native-reassign

/*
import { initEditor } from './collab';
import axios from 'nextcloud-axios'

axios.get(OC.generateUrl('/apps/text/session/create'), {params: {file: '/example.md'}})
	.then((response) => {
		console.log(response.data);
		axios.get(OC.generateUrl('/apps/text/session/fetch',), {params:
				{documentId: response.data.document.id, sessionId: response.data.session.id, token: response.data.session.token}
		}).then((fileContent) => {
			let contentDom = document.querySelector("#editor-content");
			contentDom.innerHTML = fileContent.data;
			initEditor(null, 1, response.data, fileContent.data);
		});
	});
*/
Vue.prototype.t = t
Vue.prototype.OCA = OCA
import Editor from './components/Editor'
new Vue({
	render: h => h(Editor),
}).$mount('#maineditor')

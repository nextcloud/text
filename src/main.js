import store from './store/index.js'

__webpack_nonce__ = btoa(OC.requestToken) // eslint-disable-line
__webpack_public_path__ = OC.linkTo('text', 'js/') // eslint-disable-line

if (document.getElementById('app-content')) {
	Promise.all([
		import(/* webpackChunkName: "editor" */'vue'),
		import(/* webpackChunkName: "editor" */'./views/DirectEditing.vue'),
	]).then((imports) => {
		const Vue = imports[0].default
		Vue.prototype.t = window.t
		Vue.prototype.OCA = window.OCA
		const DirectEditing = imports[1].default
		const vm = new Vue({
			render: h => h(DirectEditing),
			store,
		})
		vm.$mount(document.getElementById('app-content'))
	})
}

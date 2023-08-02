import Vue from 'vue'

const NodeViewContent = Vue.extend({
	props: {
		as: {
			type: String,
			default: 'div',
		},
	},

	render(createElement) {
		return createElement(this.as, {
			attrs: {
				'data-node-view-content': '',
			},
		})
	},
})

export default NodeViewContent
